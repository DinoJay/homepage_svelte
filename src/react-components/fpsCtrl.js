export default function FpsCtrl(fps, callback) {
  const delay = 1000 / fps;
  // calc. time per frame

  let time = null;
  // start time

  let frame = -1;
  // frame count

  let tref; // rAF time reference
  this.isPlaying = false;

  // set frame-rate
  this.frameRate = function(newfps) {
    if (!arguments.length) return fps;
    fps = newfps;
    delay = 1000 / fps;
    frame = -1;
    time = null;
  };

  // enable starting/pausing of the object
  this.start = function() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      tref = requestAnimationFrame(loop);
    }
  };

  this.pause = function() {
    if (this.isPlaying) {
      cancelAnimationFrame(tref);
      this.isPlaying = false;
      time = null;
      frame = -1;
    }
  };

  function loop(timestamp) {
    if (time === null) time = timestamp; // init start time
    const seg = Math.floor((timestamp - time) / delay); // calc frame no.
    if (seg > frame) {
      // moved to next frame?
      frame = seg; // update
      callback({
        // callback function
        time: timestamp,
        frame
      });
    }
    tref = requestAnimationFrame(loop);
  }
}
