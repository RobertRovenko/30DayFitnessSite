// Feature test for WebM (VP9) alpha.
//
// Safari decodes VP9 inside WebM but ignores the alpha side-channel, so an alpha
// clip plays there as an opaque black rectangle instead of a transparent one. No
// canPlayType() string can express that distinction - the codec string is
// identical in both cases - so the only trustworthy test is to decode a real
// alpha clip and look at the pixels.
//
// PROBE_SRC is an 8x8, 0.4s VP9 clip (773 bytes) whose left half is fully
// transparent and whose right half is fully opaque. Where WebM alpha is
// implemented, reading alpha back at x=1 yields 0; where it is silently dropped
// it yields 255. The verdict is memoised, so N videos on a page cost one decode
// rather than N.

const PROBE_SRC =
  "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAALVEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggE2TbuMU6uEHFO7a1OsggK/7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAeQAAAAAAABZUrmvbrgEAAAAAAABS14EBc8WIhlH9c6Mt1SWcgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QF9eEA4JSwgQi6gQiagQJTwIEBVbCEVbmBAVXugQHsAQAAAAAAAAIAABJUw2f+c3OfY8CAZ8iZRaOHRU5DT0RFUkSHjExhdmY2My4xLjEwMnNz2WPAi2PFiIZR/XOjLdUlZ8ikRaOHRU5DT0RFUkSHl0xhdmM2My4xLjEwMiBsaWJ2cHgtdnA5Z8ihRaOIRFVSQVRJT05Eh5MwMDowMDowMC40MDAwMDAwMDAAH0O2dUEA54EAoOKhrIEAAACCSYNCAABwAHYGOCQcGEIAACBAACSX///xvV3F7MXD5okO6KPaJToAdaGxpq/ugQGlqoJJg0IAAHAAdgY4JBwYQgAAIEAADj///4+Hbv//78BGf//uZhp///j8AKCxoZOBAGQAhgBAkpwoSUAAA3AAAEtAdaGWppTugQGlj4YAQJKcKElAAANwAABLQPuBnKCxoZOBAMgAhgBAkpwsSsAAA3AAAEtAdaGWppTugQGlj4YAQJKcLEnAAANwAABLQPuBnKCxoZOBASwAhgBAkpwsScAAA3AAAEtAdaGWppTugQGlj4YAQJKcLErAAANwAABLQPuBnKCxoZOBAMgAhgBAkpwsScAAA3AAAEtAdaGWppTugQGlj4YAQJKcLEnAAANwAABLQPuBnBxTu2uRu4+zgQC3iveBAfGCAbnwgQM=";

// Deliberately generous. Falling back to the stacked file is always *correct*,
// just heavier, so giving up late is the safe kind of wrong.
const PROBE_TIMEOUT_MS = 5000;

let probeResult = null;

const runProbe = () =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      video.removeAttribute("src");
      video.load(); // release the decoder so the probe cannot keep running
      resolve(value);
    };

    const timer = setTimeout(() => finish(false), PROBE_TIMEOUT_MS);

    video.onerror = () => finish(false);
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        finish(false);
        return;
      }

      ctx.drawImage(video, 0, 0);
      try {
        // x=1 sits inside the transparent half of the probe frame.
        const pixel = ctx.getImageData(1, 1, 1, 1).data;
        finish(pixel[3] < 128);
      } catch (err) {
        // A canvas we cannot read back proves nothing; assume no alpha.
        finish(false);
      }
    };

    video.src = PROBE_SRC;
    video.load();
  });

// Resolves true when the browser renders WebM alpha, false when it needs the
// stacked HEVC route. Memoised for the life of the page.
const supportsWebMAlpha = () => {
  if (!probeResult) {
    probeResult = runProbe();
  }
  return probeResult;
};

export default supportsWebMAlpha;