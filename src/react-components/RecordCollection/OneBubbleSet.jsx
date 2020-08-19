import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import {
  BubbleSet,
  ShapeSimplifier,
  BSplineShapeGenerator,
  PointPath
} from './bubblesets';

const OneBubbleSet = (props) => {
  const {
    coords,
    zIndex,
    color = 'green',
    opacity = 0.5,
    altCoords = []
  } = props;
  const pad = 0;
  const bubbles = new BubbleSet();
  const list = bubbles.createOutline(
    BubbleSet.addPadding(coords, pad),
    BubbleSet.addPadding(altCoords, pad),
    null
  );
  const outline = new PointPath(list).transform([
    new ShapeSimplifier(0.0),
    new BSplineShapeGenerator(100),
    new ShapeSimplifier(0.0)
  ]);

  const points = outline.getPoints();
  const ps = points;

  return (
    <svg
      className="pointer-events-none absolute w-full overflow-visible "
      style={{zIndex}}>
      <path
        stroke="black"
        fill={color}
        opacity={opacity}
        d={d3.line().curve(d3.curveCardinalClosed)(ps)}
      />
    </svg>
  );
};
export default OneBubbleSet;
