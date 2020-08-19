function collisionCheck(base_rect, new_rect) {
  const padding = 0.2;
  if (
    base_rect.x < new_rect.x - padding + new_rect.w + padding * 2 &&
    base_rect.x + base_rect.w > new_rect.x - padding &&
    base_rect.y < new_rect.y - padding + new_rect.h + padding * 2 &&
    base_rect.h + base_rect.y > new_rect.y - padding
  ) {
    return true;
  }
  return false;
}

const picHanging = (pictures, dim, callback) => {
  const state = {pictures: []};
  function findNext() {
    const dist = 0.01;
    let angle = 0;
    let counter = 0;
    // TODO get real bounds
    const max = 100000;
    while (counter < max) {
      // Spiral code from https://stackoverflow.com/questions/6824391/drawing-a-spiral-on-an-html-canvas-using-javascript
      const incr = angle ? 1 / (dist + dist * angle) / 2 : dist;
      const x = (dist + dist * angle) * Math.cos(angle) + dim[0] / 40;
      const y = (dist + dist * angle) * Math.sin(angle) + dim[1] / 40;
      const temp_w = Math.random() * 10 + 7;
      const temp_h = Math.random() * 10 + 7;
      const temp_rect = {
        x: x - temp_w / 2,
        y: y - temp_h / 2,
        w: temp_w,
        h: temp_h,
      };
      const checks = [];
      for (const pict of state.pictures) {
        const check = collisionCheck(pict, temp_rect);
        checks.push(!check);
      }
      if (checks.every(val => val === true)) {
        state.pictures.push(temp_rect);
        break;
      }
      counter += 1;
      angle += incr;
    }
  }
  const number_of_pictures = 40;
  for (let i = 0; i < pictures.length; i++) {
    findNext();
  }
  const m = 20;
  const pix = state.pictures.map((d, i) => ({
    ...pictures[i],
    x: d.x * m,
    y: d.y * m,
    xy: [d.x * m, d.y * m],
    height: d.h * m,
    width: d.w * m,
    h: d.h * m,
  }));
  callback(pix);
  // return pix;
};

export default picHanging;
