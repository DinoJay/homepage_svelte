import * as d3 from 'd3';
import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
// import _ from 'lodash';
import PropTypes from 'prop-types';
import d3Radial from 'd3-radial';
import {AnnotationLabel} from 'react-annotation';

import {bboxCollide} from 'd3-bboxCollide';
import useMeasure from '../useMeasure';
import useDeepCompareMemoize from '../useDeepCompareMemoize';

// import d3sketchy from '../utils/d3.sketchy';

// import swoopyArrow from './utils/swoopyArrow';
// import data from './aboutData';

import {forceExtent} from '../utils/helper';

import cxx from './AboutVis.scss';
// import annoCx from './annotation.scss';

function outerRadiusPath(d, pad = 3) {
  // Total difference in x and y from source to target
  const diffX = d.target.x - d.source.x;
  const diffY = d.target.y - d.source.y;

  // Length of path from center of source node to center of target node
  const pathLength = Math.sqrt(diffX * diffX + diffY * diffY);

  // x and y distances from center to outside edge of target node
  const srcOffX = (diffX * (d.source.r + pad)) / pathLength;
  const srcOffY = (diffY * (d.source.r + pad)) / pathLength;
  const tgtOffX = (diffX * (d.target.r + pad)) / pathLength;
  const tgtOffY = (diffY * (d.target.r + pad)) / pathLength;
  return `M${d.source.x + srcOffX},${d.source.y + srcOffY}L${d.target.x -
    tgtOffX},${d.target.y - tgtOffY}`;
}

const computeLayout = props => {
  const {width, height, data, small, onTick} = props; // this.props;

  const nodeData = data.map(d => {
    d.width = d.r * 2;
    d.height = d.width;
    d.type = 'node';
    return d;
  });

  const links = [
    {source: nodeData[0], target: nodeData[1]},
    {source: nodeData[1], target: nodeData[2]},
    {source: nodeData[2], target: nodeData[0]},
  ];
  // { source: 2, target: 4 }]);

  const annoData = data
    .map(d => ({...d.annotation}))
    .map((d, i) => ({
      width: 200,
      height: 70,
      type: 'anno',
      data: {x: 0, y: 0},
      note: {
        label: d.text,
        title: d.name,
        align: 'middle',
        orientation: 'topBottom',
        wrap: small ? 140 : 200
      },
      connector: {type: 'elbow'},
      src: data[i],
      subject: {
        radius: nodeData[i].r
        // innerRadius: d.r,
        // outerRadius: d.r
      }
      // className: d.type
    }));

  // const bbox = [
  //   { from: { x: 0, y: 0 }, to: { x: 0, y: height } },
  //   { from: { x: 0, y: height }, to: { x: width, y: height } },
  //   { from: { x: width, y: height }, to: { x: width, y: 0 } },
  //   { from: { x: width, y: 0 }, to: { x: 0, y: 0 } }
  // ];

  const rad = Math.max(80, width / 5);
  // const radOffset = width / 6; const centerOffset = 20;
  // d3Radial
  //   .radial()
  //   .center([width / 2, height / 2 + centerOffset])
  //   .size([rad + radOffset, rad + radOffset])(annoData);

  d3Radial
    .radial()
    .center([width / 2, height / 2])
    .size([rad, rad])(nodeData);

  nodeData.forEach(d => {
    d.tx = d.x;
    d.ty = d.y;
    d.fx = d.x;
    d.fy = d.y;
  });

  annoData.forEach(d => {
    d.tx = d.src.tx - 5;
    d.ty = d.src.ty + (d.src.name === 'Personal Data' ? -50 : 50);
    d.fx = d.tx + (d.src.name === 'Visualization' ? (small ? 10 : 90) : 0); // width / 2;
    d.y = d.ty; // height / 2;
  });

  const padY = 40;
  const padX = 40;
  const getBBox = d => [
    [-d.width / 2 - padX, -d.height / 2 - padY],
    [d.width / 2 + padX / 2, d.height / 2 + padY / 2],
  ];
  const forceData = nodeData.concat(annoData);

  return (
    d3
      .forceSimulation(forceData)
      .alphaMin(0.6)
      .force('collide', bboxCollide(getBBox).strength(0.01))
      // .force(
      //   'extent',
      //   forceExtent()
      //     .extent([[0, 0], [width, height]])
      //     .bbox(d => [
      //       [-d.width / 2 - padX, -d.height / 2 - padY],
      //       [d.width / 2 + padX / 2, d.height / 2 + padY / 2],
      //     ]),
      //   // .strength(() => 0.7)
      // )
      // .force('charge', d3.forceManyBody(d => d.height))
      .force(
        'Y',
        d3
          .forceY(d => d.ty || 0)
          .strength(d => (d.type === 'node' ? 0.4 : 0.9)),
      )
      .force(
        'X',
        d3
          .forceX(d => d.tx || 0)
          .strength(d => (d.type === 'node' ? 0.4 : 0.9)),
      )
      .on('tick', () => {
        onTick({annoData, nodeData, links});
      })
  );
};

const AboutVis = props => {
  const {className, style, width: w} = props;
  const small = w < 500;
  const [{annoData = [], nodeData = [], links = []}, setState] = useState({});
  const [bind, {width, height}] = useMeasure();

  useEffect(() => {
    if (width && height) {
      const Force = computeLayout({
        ...props,
        width: small ? width:w/2,
        height,
        onTick: setState,
        small
      });
      return () => Force.on('tick', null);
    }
  }, [useDeepCompareMemoize({width, height, nodeData})]);

  console.log('width', width, 'height', height);
  return (
    <div
      {...bind}
      style={{...style}}
      className={`${className} overflow-visible`}>
      <svg className="overflow-visible mb-12" height="100%">
        <g>
          {nodeData.map(d => (
            <g transform={`translate(${d.x},${d.y})`}>
              <circle r={d.r} fill="none" stroke="grey" />
              <text
                className="font-bold text-svg text-lg"
                textAnchor="middle"
                dy=".20em">
                {d.name}
              </text>
            </g>
          ))}
          <g>
            {links.map(d => (
              <path fill="none" stroke="grey" d={outerRadiusPath(d, 4)} />
            ))}
          </g>
        </g>
        <g>
          {annoData.map((d, i) => (
            <AnnotationLabel {...d} nx={d.x} ny={d.y} x={d.src.x} y={d.src.y} />
          ))}
        </g>
      </svg>
    </div>
  );
};

AboutVis.defaultProps = {
  // width: 200,
  // height: 200,
  data: [
    {
      name: 'Personal Data',
      tgts: ['VIS', 'sm'],
      r: 30,
      annotation: {
        text:
          'we spent most of our time communicating, discovering and creating stuff on the web and leave traces '
      }
    },
    {
      name: 'Visualization',
      tgts: [],
      r: 50,
      annotation: {
        text:
          'I believe in the power of Visualization as a vehicle to establish pathways and new  learning opportunities'
      }
    },
    {
      name: 'Informal Learning',
      tgts: ['VIS', 'sm'],
      r: 35,
      annotation: {
        text:
          "it's impossible not to learn. Every single second we ponder with people, tools, memories to reflect and genereate ideas and perspectives"
      }
    }
  ]
};

export default AboutVis;

// WEBPACK FOOTER //
// ./src/components/AboutVis.jsx
