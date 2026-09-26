import React, { useEffect, useRef, useState } from "react";

import StackedAlphaVideo from "./StackedAlphaVideo";
import supportsWebMAlpha from "./webmAlphaSupport";

// Plays a transparent video everywhere, picking the cheapest working route.
//
// Each asset ships twice (see the encode script in scripts/):
//
//   <name>.webm        VP9 + alpha. Chrome, Firefox and Edge render it natively
//                      in a plain <video>, so that is the preferred route: no
//                      canvas, no per-frame texture upload.
//   <name>.hevc.mp4    The same frames with the alpha plane vstacked below the
//                      colour, for Safari. It has to be unpacked in WebGL, so
//                      StackedAlphaVideo does that.
//
// Which one we need is decided at runtime rather than by sniffing the user
// agent, because WebM alpha support is a moving target and a UA check goes stale
// silently. prefers-reduced-motion and background-tab pausing are handled
// identically on both routes.
//
// `fit` is a Tailwind object-fit utility applied to the video *and* its poster,
// so the two never disagree while handing over. It is a class string rather than
// a boolean so callers can pass responsive variants, e.g.
// "object-cover lg:object-contain".
//
// Native route: a plain <video>, which decodes VP9 with alpha all by itself.
const NativeAlphaVideo = ({
  src,
  poster,
  className = "",
  fit = "object-contain",
  onReady,
}) => {
  const videoRef = useRef(null);
  // A genuine fallback while the clip loads, but it has to be taken out of the
  // DOM once real frames are on screen. These clips are animated zoom shots -
  // frame 0 is a much tighter crop than the live frame - so a still left painted
  // underneath reappears through every pixel the video's alpha leaves empty and
  // reads as a frozen image sitting behind the motion. Removing the element is
  // the only reliable fix; stacking order alone does not hide it.
  const [showPoster, setShowPoster] = useState(true);
  // Ref, not a dependency: callers pass an inline arrow, and re-running this
  // effect would tear down and re-bind the listeners on every parent render.
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;

    const sync = () => {
      if (reduceMotion || document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay can still be refused (low power mode, data saver). The
          // poster underneath stays visible, so there is nothing to recover.
        });
      }
    };

    const onMotionChange = (event) => {
      reduceMotion = event.matches;
      sync();
    };

    let readyFired = false;
    const onPlaying = () => {
      if (readyFired) return;
      readyFired = true;
      // First frame is on screen, so the still has done its job.
      setShowPoster(false);
      if (onReadyRef.current) onReadyRef.current();
    };

    motionQuery.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", sync);
    video.addEventListener("canplay", sync);
    // "playing", not "canplay": the first frame is only really on screen once
    // playback has begun.
    video.addEventListener("playing", onPlaying);
    sync();

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("canplay", sync);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {poster && showPoster ? (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${fit}`}
        />
      ) : null}
      <video
        ref={videoRef}
        src={src}
        // Muted + playsInline are both required for autoplay on iOS/Safari.
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        // absolute so the video shares the poster's box while that is still
        // mounted; once the first frame paints the poster is unmounted and this
        // is the only layer left in the container.
        className={`absolute inset-0 h-full w-full ${fit}`}
      />
    </div>
  );
};

// `onReady` is optional and fires once per clip, after the first frame is
// genuinely visible. Callers that sequence clips use it to know when a
// crossfade can safely target this one. It deliberately does not fire while the
// poster is still showing on its own, before the capability probe has answered.
const AlphaVideo = ({
  name,
  poster,
  className = "",
  fit = "object-contain",
  onReady,
}) => {
  // null until the probe answers; showing the poster meanwhile beats a flash of
  // the wrong route.
  const [nativeAlpha, setNativeAlpha] = useState(null);
  const [stackedFailed, setStackedFailed] = useState(false);

  useEffect(() => {
    let active = true;
    supportsWebMAlpha().then((ok) => {
      if (active) setNativeAlpha(ok);
    });
    return () => {
      active = false;
    };
  }, []);

  const base = `${process.env.PUBLIC_URL}/assets/videos/optimized/${name}`;

  // Safari needs the stacked file, but HEVC decode is not universal either
  // (older Firefox, some Linux builds). If it will not play we still have the
  // WebM, which at worst renders opaque rather than not at all.
  if (nativeAlpha === false && !stackedFailed) {
    return (
      <StackedAlphaVideo
        src={`${base}.hevc.mp4`}
        poster={poster}
        className={className}
        fit={fit}
        onError={() => setStackedFailed(true)}
        onReady={onReady}
      />
    );
  }

  if (nativeAlpha === null) {
    return poster ? <img src={poster} alt="" className={className} /> : null;
  }

  return (
    <NativeAlphaVideo
      src={`${base}.webm`}
      poster={poster}
      className={className}
      fit={fit}
      onReady={onReady}
    />
  );
};

export default AlphaVideo;