import React, { useEffect, useRef, useState } from "react";

// Plays a video that carries its own transparency.
//
// The source .movs are ProRes 4444 with a real alpha plane, but no browser plays
// alpha video natively in a way that covers Safari: H.264 has no alpha, and while
// Chrome/Firefox render VP9 WebM alpha, Safari does not. So the encoded files
// come in two shapes:
//
//   *.webm        VP9 + yuva420p. Real alpha, but Safari shows it opaque.
//   *.hevc.mp4    HEVC with the alpha plane vstacked underneath the colour.
//
// This component draws the *stacked* file, so it works in every browser from one
// source: we sample the top half of the frame for colour and the bottom half for
// alpha, and composite them in a WebGL shader. That is why the stacked file can
// never be handed to a plain <video autoplay> tag - the browser would show the
// colour with the alpha strip visibly glued underneath it. The canvas is the only
// correct way to display it, which is the whole reason this component exists.

const VERTEX_SHADER = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  // Y is inverted deliberately. Clip space puts +1 at the *top* of the canvas,
  // but a video's first row is uploaded to v=0, so the naive aPos*0.5+0.5 draws
  // the top of the frame along the bottom of the screen and the clip plays
  // upside down. Verified against ffmpeg: this is what makes the output match
  // the encoded colour half pixel for pixel.
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uFullRange;

void main() {
  // The encoded frame is 2x tall: colour on top, alpha underneath.
  vec4 color = texture2D(uTexture, vec2(vUv.x, vUv.y * 0.5));
  float alpha = texture2D(uTexture, vec2(vUv.x, 0.5 + vUv.y * 0.5)).r;

  // ffmpeg writes 8-bit H.264/HEVC as limited ("TV") range, 16-235. Browsers
  // expand that back to 0-255 for us, which would lift a fully transparent
  // pixel to ~6% and a fully opaque one to ~92%, so undo it here.
  if (uFullRange < 0.5) {
    alpha = (alpha - 0.0625) / 0.8588;
  }
  alpha = clamp(alpha, 0.0, 1.0);

  gl_FragColor = vec4(color.rgb, alpha);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return shader;
}

const StackedAlphaVideo = ({
  src,
  poster,
  className = "",
  // Tailwind object-fit utility shared with the native route; see AlphaVideo.js.
  fit = "object-contain",
  // Alpha-stacked files are encoded 8-bit limited range; see the shader.
  fullRange = false,
  // Fired when the browser cannot decode the file at all, so a caller can fall
  // back to another source instead of leaving a poster up for good.
  onError,
  // Fired once, after the first frame has actually been composited. A caller
  // sequencing several clips needs to know when there are real pixels to fade
  // to, which "canplay" on its own does not guarantee.
  onReady,
}) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  // Dropped as soon as the canvas has a real frame. The clips are animated zoom
  // shots, so a still left underneath reappears through the transparency the
  // shader composites and looks like a frozen image behind the motion.
  const [showPoster, setShowPoster] = useState(true);
  // Held in a ref so that an inline onError arrow cannot re-run this effect and
  // tear down a perfectly good GL context on every parent render.
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);
  // Same ref treatment, so an inline arrow prop cannot re-run the GL effect.
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return undefined;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
      }) || canvas.getContext("experimental-webgl");

    // No WebGL (or context lost): fall back to the poster rather than showing
    // a blank rectangle.
    if (!gl) {
      setFailed(true);
      return undefined;
    }

    let program;
    try {
      program = gl.createProgram();
      gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
      gl.attachShader(
        program,
        compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
      );
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
      }
    } catch (err) {
      console.error("StackedAlphaVideo:", err);
      setFailed(true);
      return undefined;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]), // full-screen triangle
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Colour data is *not* premultiplied - the alpha strip is separate - so keep
    // the browser from premultiplying on upload.
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);
    gl.uniform1f(gl.getUniformLocation(program, "uFullRange"), fullRange ? 1 : 0);
    gl.clearColor(0, 0, 0, 0);

    let frame = 0;
    let readyFired = false;
    const draw = () => {
      if (video.readyState >= 2) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // The first frame that has data is the moment something is genuinely on
        // screen, which is exactly what a crossfade needs to wait for.
        if (!readyFired) {
          readyFired = true;
          // The canvas has real pixels now, so the still has done its job.
          setShowPoster(false);
          if (onReadyRef.current) onReadyRef.current();
        }
      }
      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      video.play().catch(() => {
        // Autoplay can still be refused (low power mode, data saver). The poster
        // underneath stays visible, so there is nothing to recover here.
      });
    };
    const onLoaded = () => {
      // Only the *height* is halved. A stacked frame is full width - the shader
      // spends the bottom half of the picture on alpha instead of on more image,
      // so halving the width too would squash the clip. 1920x2160 -> 1920x1080.
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight / 2;
    };

    const onVideoError = () => {
      setFailed(true);
      if (onErrorRef.current) onErrorRef.current();
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("canplay", start);
    video.addEventListener("error", onVideoError);

    // Respect the OS setting: draw one frame, then leave the loop alone.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;
    const applyMotion = () => {
      if (reduceMotion) {
        video.pause();
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        draw();
      } else if (!frame) {
        start();
        frame = requestAnimationFrame(draw);
      }
    };
    const onMotionChange = (event) => {
      reduceMotion = event.matches;
      applyMotion();
    };
    motionQuery.addEventListener("change", onMotionChange);

    // An offscreen tab does not need 60fps of video decoding.
    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (!reduceMotion) {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    applyMotion();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("canplay", start);
      video.removeEventListener("error", onVideoError);
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [src, fullRange]);

  if (failed) {
    return poster ? <img src={poster} alt="" className={className} /> : null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Covers the canvas while it loads, and stays put if the clip never plays.
          Unmounted once the first frame has actually been composited - see the
          note on showPoster above. */}
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
        className="absolute inset-0 h-full w-full opacity-0"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        // object-contain costs nothing while the buffer and the box share the
        // 16:9 aspect, and stops a differently-shaped source being stretched.
        className={`relative h-full w-full ${fit}`}
      />
    </div>
  );
};

export default StackedAlphaVideo;

