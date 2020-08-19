import * as d3 from 'd3';
import chroma from 'chroma-js';

import React, {useEffect, useRef} from 'react';

import {nesColors as rawColors} from './nes-colors.js';

// import picSrc from './jan1.jpg';
import picSrc2 from './jan1.jpg';

const getPixels = raw => {
  const pixels = [];
  for (let i = 0; i < raw.length; i += 4) {
    const pixel = {
      r: raw[i],
      g: raw[i + 1],
      b: raw[i + 2],
      opacity: raw[i + 3],
    };
    pixels.push(pixel);
  }
  return pixels;
};

const showSvgPixels = (pixels, svgDom, dim) => {
  const gridSize = dim;
  const pixelSize = dim;
  const size = gridSize * pixelSize;

  const gridWidth = size;
  const gridHeight = size;

  const data = d3
    .range(gridSize)
    .map((d, i) => d3.range(gridSize).map((e, j) => pixels[i * gridSize + j]));

  const svg = d3
    .select(svgDom)
    .style('fill', 'white')
    .append('g')
    .attr('transform', `scale(${(1 / dim) * 10})`);

  const rows = svg
    .selectAll('.row')
    .data(data)
    .enter()
    .append('g')
    .classed('row', true);

  const items = rows
    .selectAll('rect')
    .data((d, i, j) => {
      const num = d3.entries(j)[i].key;
      return d.map(d => [d, parseInt(num)]);
    })
    .enter()
    .append('rect')
    .attr('cx', (d, i) => pixelSize * i)
    .attr('cy', d => pixelSize * d[1])
    .attr('x', (d, i) => pixelSize * i)
    .attr('y', d => pixelSize * d[1])
    .attr('width', pixelSize)
    // .attr('r', pixelSize/2)
    .attr('height', pixelSize)
    .style('fill', d => `rgba(${d[0].r},${d[0].g},${d[0].b})`); // ,${color.opacity})`)

  return svg.node();
};

const updateCanvas = (props, canvas) => {
  const {size, innerColor, backgroundColor, shadowColor, src = picSrc2} = props;
  // console.log(
  //   'innerColor',
  //   innerColor,
  //   'backgroundColor',
  //   backgroundColor,
  //   'shadowColor',
  //   shadowColor,
  // );
  const width = size;
  const height = size;

  canvas.width = width;
  canvas.height = height;
  const threshy = 0.5;
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.src = src;
  img.src = `${src}?${new Date().getTime()}`;
  img.setAttribute('crossOrigin', '');

  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size);
    const raw = ctx.getImageData(0, 0, size, size).data;
    const pixels = getPixels(raw);
    ctx.msImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    const clone = new ImageData(new Uint8ClampedArray(raw), width, height);

    const {data} = clone;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const three_thresh1 = 0.2;
      const three_thresh2 = 0.4;
      const three_thresh3 = 0.9;
      // https://stackoverflow.com/a/596241/8691291
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      const threshold1 = 255 * three_thresh1;
      const threshold2 = 255 * three_thresh2;
      const threshold3 = 255 * three_thresh3;
      let new_data = [255, 255, 255];
      if (luma < threshold1) {
        new_data = chroma(innerColor).rgb(); // inner color
      } else if (luma < threshold2) {
        new_data = chroma(shadowColor).rgb(); // shadow color
      } else if (luma < threshold3) {
        new_data = chroma(backgroundColor).rgb(); // background color
      }
      data[i] = new_data[0]; // red
      data[i + 1] = new_data[1]; // green
      data[i + 2] = new_data[2]; // blue
    }

    ctx.putImageData(clone, 0, 0);

    // processBatch(batches, imageData);
  };

  // turn off image aliasing

  return canvas;
};

export default function PixelPic(props) {
  const {size = 200, height = 240} = props;
  const canvasRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    updateCanvas(props, canvasRef.current, svgRef.current);
  }, []);

  return (
    <div className="relative" style={{width: size, height: size}}>
      <canvas
        className=""
        ref={canvasRef}
        width={size}
        height={size}
        style={{zIndex: 10}}
      />
    </div>
  );
}

PixelPic.defaultProps = {
  width: 480,
  height: 640,
  pixelSize: 3,
};

// WEBPACK FOOTER //
// ./src/components/AboutVis.jsx
// ./src/components/AboutVis.jsx
