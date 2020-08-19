import uniq from 'lodash/uniq';
import * as d3 from 'd3';
import labella from 'labella';
import {AxisBottom} from '@vx/axis';
import {AnnotationLabel} from 'react-annotation';

import React, {useState, Component} from 'react';
import clsx from 'clsx';
//
import {useSpring, useTransition, animated as a} from 'react-spring';
import cxx from './index.scss';

import rawData from './cvData';

const parseTime = d3.timeParse('%d/%m/%Y');
const data = [...rawData].map(d => ({
  ...d,
  id: d.title,
  startDate: parseTime(d.startDate),
  endDate: parseTime(d.endDate),
}));

const line = d3
  .line()
  .x(d => d.x)
  .y(d => d.y);

const keys = uniq(data.map(d => d.type));

const normalOpacity = 0.3;
const fullOpacity = 0.8;
const lowOpacity = 0.1;

// const delay = 300;
// const peakLength = 1;

function layoutLabels(data, width, bboxes, id, smallScreen) {
  const pad = 12;
  if (!data.length) return;
  const nodes = data.map(
    d => new labella.Node(d.tx, bboxes[d.id].width + pad, d.data),
  );

  // TODO: does not work yet
  const minNodeIndex = nodes.reduce(
    (acc, d) => (data.find(e => e.id === acc).tx > d.tx ? d.id : acc),
    data[0].id,
  );
  const maxNodeIndex = nodes.reduce(
    (acc, d) => (data.find(e => e.id === acc).tx < d.tx ? d.id : acc),
    data[0].id,
  );

  const force = new labella.Force({
    minPos: bboxes[minNodeIndex].width / 2,
    maxPos: width - bboxes[maxNodeIndex].width / 2,
    // algorithm: id ? null : 'overlap',
    lineSpacing: !smallScreen && 300,
    stubWidth: 40,
    nodeSpacing: 50,
    density: 1,
  });

  force.nodes(nodes).compute();
  // renderer.layout(nodes);

  nodes.forEach((n, i) => {
    data[i].x = n.currentPos;
  });

  return data;
}

function Dimensions({data, colorScale, width, focusId}) {
  const opacity = d => {
    if (!focusId || d.data.includes(focusId)) return fullOpacity;
    return lowOpacity;
  };
  const opacityStyle = d => ({
    opacity: opacity(d),
    transition: 'opacity 0.3s',
  });

  const dims = Object.keys(data)
    .map(key => ({
      type: key,
      y: data[key].y,
      up: data[key].up,
      data: data[key].data,
    }))
    .map(d => (
      <g className="dim" transform={`translate(0, ${d.y})`}>
        <text
          dy={d.up ? -7 : 20}
          fill={colorScale(d.type)}
          alignmentBaseline={d.up ? null : 'hanging'}
          style={opacityStyle(d)}>
          {d.type}
        </text>
        <line
          x1={0}
          y1={0}
          x2={width}
          y2={0}
          stroke={colorScale(d.type)}
          style={opacityStyle(d)}
        />
      </g>
    ));
  return <g>{dims}</g>;
}

const computeLabelNodes = props => {
  const {data, id, dimensions, gap, width} = props;

  const smallScreen = width < 500;
  const inputData = data.map(d => ({
    data: {...d, x: 0, y: 0},
    note: {
      label: id === d.id ? d.detail : d.description,
      title: d.title,
      align: d.align || 'middle',
      orientation: id ? 'leftRight' : d.orientation || 'topBottom',
      wrap: id === d.id ? 260 : 150
    },
    // className: cxx.note,
    // style: { opacity: 0 },
    connector: {type: 'elbow'},
    subject: {
      // radius: 20
      // innerRadius: d.r,
      // outerRadius: d.r
    },
    ...d
  }));

  const bboxes = inputData.reduce((acc, d) => {
    acc[d.id] = {width: d.data.width, height: 90};
    return acc;
  }, {});

  const personalAnno = inputData.filter(d => d.data.type === 'personal');
  const eduAnno = inputData.filter(d => d.data.type === 'education');
  const geoAnno = inputData.filter(d => d.data.type === 'geography');
  const workAnno = inputData.filter(d => d.data.type === 'work');

  const moveUp = (dimension, pad = 25) => d => {
    d.y = dimension.y0 + gap / 2 + pad;
    return d;
  };

  const moveDown = (dimension, pad = 33) => d => {
    d.y = dimension.y1 - gap / 2 - pad;
    return d;
  };

  const personalNodesDown = layoutLabels(
    personalAnno.slice(-1).map(moveDown(dimensions.personal)),
    width,
    bboxes,
    id,
    smallScreen,
  );

  const personalNodesUp = layoutLabels(
    personalAnno.slice(0, -1).map(moveUp(dimensions.personal)),
    width,
    bboxes,
    id,
    smallScreen,
  );

  const eduNodesUp = layoutLabels(
    eduAnno.map(moveUp(dimensions.education)),
    width,
    bboxes,
    id,
    smallScreen,
  );

  const eduNodesDown = layoutLabels(
    eduAnno.slice(-2).map(moveDown(dimensions.education, -1)),
    width,
    bboxes,
    id,
    smallScreen,
  );

  // layoutLabels(
  //   workAnno.slice(-2).map(moveUp(dimensions.work)),
  //   width,
  //   bboxes
  // );

  const workNodesDown = layoutLabels(
    workAnno
      // .slice(0, -2)
      .map(moveDown(dimensions.work))
      .concat(geoAnno.slice(0, 1).map(moveDown(dimensions.work, -30))),
    width,
    bboxes,
    id,
    smallScreen,
  );

  const geoNodesDown = layoutLabels(
    geoAnno.map(moveDown(dimensions.geography)),
    width,
    bboxes,
    id,
    smallScreen,
  );

  const nodes = [
    ...(workNodesDown || []),
    ...(personalNodesDown || []),
    ...(personalNodesUp || []),
    ...(eduNodesDown || []),
    ...(eduNodesUp || []),
    ...(geoNodesDown || []),
  ];

  // console.log('bboxes', bboxes, 'nodes', nodes);
  return {bboxes, nodes};
};

const Labella = props => {
  const {mouseHandler, height, width, id, focusId, data, onClick} = props;
  const {nodes} = computeLabelNodes(props);

  const opacityPath = id => {
    if (!focusId) return normalOpacity;
    if (id === focusId) return fullOpacity;
    return lowOpacity;
  };

  const enableClass = id => {
    if (id === props.id) return cxx.noteFocused;
    if (!focusId) return cxx.note;
    if (focusId === id) return cxx.note;
    return cxx.noteDisabled;
  };

  const transitions = useTransition(nodes, item => item.id, {
    from: item => ({
      nxy: [item.x, item.y],
      xy: [item.tx, height / 2],
      opacity: 0,
    }),
    enter: item => ({
      nxy: [item.x, item.y],
      xy: [item.tx, item.ty],
      opacity: opacityPath(item),
    }),
    update: item => ({
      xy: [item.tx, item.ty],
      nxy: [item.x, item.y],
      opacity: opacityPath(item.id),
    }),
    leave: item => ({
      xy: [-400, 0],
      nxy: [item.x, item.y],
      opacity: 0,
    }),
    // config: {mass: 5, tension: 500, friction: 100},
    trail: 5,
  }).filter(d => d.item);

  // console.log('transitions', transitions, 'nodes', nodes);
  const posDY = it => {
    if (!id) return it.y - it.ty;

    // if (it.y > height / 2)
    return it.y - it.ty + it.offsetY || 30;

    // return it.y - it.ty + (it.offsetY / width || 100);
  };
  const posDX = it => {
    if (!id) return it.x - it.tx;

    return it.x - it.tx + (it.offsetX || 40);
  };

  return (
    <g>
      {transitions.map(({item, props: {xy, nxy, opacity}}, i) => (
        <a.g transform={xy.interpolate((x, y) => `translate(${x},${y})`)}>
          <AnnotationLabel
            {...item}
            className={enableClass(item.id)}
            dx={posDX(item)}
            dy={posDY(item)}
            x={0}
            y={0}
            events={{
              // onMouseEnter: () => mouseHandler(item.id),
              // onMouseLeave: () => mouseHandler(null),
              onClick: () => onClick(item.id)
            }}
          />
        </a.g>
      ))}
    </g>
  );
};

function TimeSegments({
  data,
  width,
  smallScreen,
  height,
  colorScale,
  mouseHandler,
  focusId,
  onClick,
  id,
}) {
  const capX = x => (x > width ? width : x);

  const opacityPath = idx => {
    if (id === idx) return 0.8;
    if (!focusId) return normalOpacity;
    if (idx === focusId) return fullOpacity;
    return lowOpacity;
  };
  const opacityCircle = id => {
    if (!focusId || id === focusId) return fullOpacity;
    return lowOpacity;
  };
  const offX = 15;
  const lineFn = d =>
    d3.line()([
      [d.x, d.y],
      [d.x + offX, height / 2],
      [capX(d.x + d.shapeWidth) + offX, height / 2],
      [d.x, d.y],
    ]);

  const leaveLineFn = d =>
    d3.line()([
      [d.x, height / 2],
      [d.x + offX, height / 2],
      [capX(d.x + d.shapeWidth) + offX, height / 2],
      [d.x + offX, height / 2],
    ]);

  const transitions = useTransition(data, item => `${item.id}path`, {
    from: item => ({
      d: leaveLineFn(item),
      xy: [width / 2, height / 2],
      opacity: 0,
      radius: 0,
    }),
    enter: item => ({
      d: lineFn(item),
      xy: [item.x, item.y],
      opacity: opacityPath(item),
      radius: 6,
    }),
    update: item => ({
      d: lineFn(item),
      xy: [item.x, item.y],
      opacity: opacityPath(item.id),
      radius: 6,
    }),
    leave: item => ({
      d: leaveLineFn(item),
      xy: [width / 2, height / 2],
      opacity: 0,
      radius: 0,
    }),
    // config: {mass: 5, tension: 500, friction: 100},
    trail: 5,
  });

  return (
    <g>
      {transitions.map(({item, props: {d, xy, opacity, radius}}, key) => (
        <g className="cursor-pointer" key={key}>
          <a.path
            onMouseEnter={() => !smallScreen && mouseHandler(item.id)}
            onMouseLeave={() => !smallScreen && mouseHandler(null)}
            onClick={() => onClick(item.id)}
            d={d}
            style={{
              mixBlendMode: 'multiply',
              fill: colorScale(item.type), // '#404040',
              opacity,
              // transition: 'opacity .5s',
              strokeWidth: 2,
              stroke: '#404040',
            }}
            stroke={colorScale(item.type)}
          />
          <a.g transform={xy.interpolate((x, y) => `translate(${x},${y})`)}>
            <a.circle
              onMouseEnter={() => !smallScreen && mouseHandler(item.id)}
              onMouseLeave={() => !smallScreen && mouseHandler(null)}
              onClick={() => onClick(item.id)}
              style={{
                opacity,
                stroke: 'black',
                strokeWidth: 2,
              }}
              r={radius}
              fill={colorScale(item.type)}
              transform={`translate(${0}, ${0})`}
            />
          </a.g>
        </g>
      ))}
    </g>
  );
}

const defaultStartDateStr = '01/01/1999';
const defaultEndDateStr = '01/01/2022';
const smallDefaultStartDateStr = '01/01/2014';
const smallDefaultEndDateStr = '01/01/2022';

const defaultStartDate = parseTime(defaultStartDateStr);
const defaultEndDate = new Date(defaultEndDateStr);

const smallDefaultStartDate = parseTime(smallDefaultStartDateStr);
const smallDefaultEndDate = new Date(smallDefaultEndDateStr);

const initialize = props => {
  const {width, startDate, endDate, filterId, height, data = []} = props;

  // console.log('data', data);
  const inputData = data.filter(
    d =>
      (!startDate || d.startDate >= startDate) &&
      (!endDate || d.endDate <= endDate),
  );

  const arrowHeight = 14;
  const gap = height / 6;
  const timeScale = d3
    .scaleTime()
    .domain([startDate || defaultStartDate, endDate || defaultEndDate])
    .range([0, width])
    .clamp(true)
    .nice();

  const personal = {
    y0: 0,
    y1: height / 2 - gap,
    y: height / 2 - gap * 2,
    up: true,
    data: inputData.filter(d => d.type === 'personal').map(d => d.id)
  };
  const education = {
    y0: height / 2 - gap * 2,
    y: height / 2 - gap,
    y1: height / 2 - gap / 2,
    up: true,
    data: inputData.filter(d => d.type === 'education').map(d => d.id)
  };
  const geography = {
    y0: height / 2 + 2 * gap,
    y: height / 2 + 2 * gap,
    y1: height,
    up: false,
    data: inputData.filter(d => d.type === 'geography').map(d => d.id)
  };
  const work = {
    y0: height / 2,
    y: height / 2 + gap,
    y1: height / 2 + 2 * gap,
    up: false,
    data: inputData.filter(d => d.type === 'work').map(d => d.id)
  };

  const dimensions = {work, education, personal, geography};
  const timePoints = inputData
    // .map(d => cloneDeep(d))
    .map(d => {
      d.startDate = d.startDate;
      d.endDate = d.endDate;
      d.shapeWidth = timeScale(d.endDate) - timeScale(d.startDate);
      d.shapeHeight = arrowHeight;
      d.x = timeScale(d.startDate);
      d.y = dimensions[d.type].y;
      d.up = dimensions[d.type].up;

      d.timeline = true;
      return {...d};
    });

  console.log('width', width);
  const annoData = inputData
    .filter(
      (d, i) =>
        d.id === filterId ||
        (!filterId && (i % 2 || (filterId && width > 500))),
    )
    .map((d, i) => {
      const src = timePoints.find(e => e.id === d.id);
      return {
        id: `${i}id`,
        tx: src.x,
        ty: src.y,
        src,
        ...d,
        // data: { ...d, x: 0, y: 0 }
        // note: {
        //   label: d.description,
        //   title: d.title,
        //   align: 'middle',
        //   orientation: 'topBottom',
        //   wrap: 150
        // },
        // connector: { type: 'elbow' },
        subject: {
          radius: 8,
          //   // innerRadius: d.r,
          //   // outerRadius: d.r
        },

        // className: d.type
      };
    });

  return {
    annoData,
    timeScale,
    timePoints,
    dimensions,
    startDate,
    endDate,
    focusId: null,
  };
};

const Timeline = props => {
  const {width, height: h} = props;
  const smallScreen = width < 500;

  const height = h;
  const [focusId, setFocusId] = useState(null);
  const [filterId, setFilterId] = useState(null);
  const [date, setDate] = useState({
    start: smallScreen ? smallDefaultStartDate : defaultStartDate,
    end: smallScreen ? smallDefaultEndDate : defaultEndDate,
  });

  const selectedEl = data.find(d => d.id === filterId) || null;
  const {
    dimensions,
    timePoints,
    timeScale,
    annoData
    // startDate,
    // endDate,
  } = initialize({
    ...props,
    height,
    data,
    startDate: selectedEl ? selectedEl.startDate : date.start,
    selectedEl,
    filterId,
    endDate: selectedEl ? selectedEl.endDate : date.end,
    // !startDate && d.startDate,
    // !endDate && d.endDate,
  });
  // console.log('d', bboxes);

  const gap = height / 6;
  // compute labels dimension

  const colorScale = d3
    .scaleOrdinal()
    .domain(keys)
    .range(['#20bf6b', 'orange', 'tomato', 'rgba(0,159,227,0.7)']);

  const timeAxisHeight = 4;
  const onClick = id => setFilterId(filterId === id ? null : id);

  const pSetDate = (start, end) =>
    setDate({
      start: parseTime(start),
      end: parseTime(end)
    });

  const isSelected = (start, end) =>
    +date.startDate === +parseTime(start) && +date.endDate === +parseTime(end);

  return (
    <div
      style={{height}}
      className="sm:m-0 overflow-visible overflow-x-visible ">
      {smallScreen && selectedEl && (
        <div
          className="absolute text-sm p-1 border-2 border-black bg-white z-20"
          style={{
            boxShadow: '3px 3px #404040',
            width: width - 50,
          }}>
          {selectedEl.detail}
        </div>
      )}
      <div className="h-full relative">
        <svg className="mt-8 sm:mt-0 " width={width} className="h-full">
          <TimeSegments
            smallScreen={smallScreen}
            onClick={onClick}
            width={width}
            height={height}
            colorScale={colorScale}
            data={timePoints}
            focusId={focusId}
            id={filterId}
            mouseHandler={id => setFocusId(id)}
          />
          <Dimensions
            data={dimensions}
            width={width}
            colorScale={colorScale}
            id={filterId}
            focusId={focusId}
          />
          <AxisBottom
            numTicks={5}
            hideZero
            scale={timeScale}
            top={height / 2 - timeAxisHeight / 2 + 2}
            stroke="#1b1a1e"
            tickTextFill="#1b1a1e"
            tickTextFontSize={14}
          />
          {!smallScreen && (
            <Labella
              width={width}
              height={height / 2}
              id={filterId}
              onClick={onClick}
              mouseHandler={id => setFocusId(id)}
              data={annoData}
              gap={gap}
              focusId={focusId}
              dimensions={dimensions}
            />
          )}
        </svg>
        <div
          className={clsx(
            ' absolute bottom-0 right-0 sm:left-0 flex mb-3',
            filterId ? 'opacity-0' : 'opacity-1',
          )}
          style={{transition: 'opacity 400ms'}}>
          <button
            onClick={() => pSetDate(defaultStartDateStr, defaultEndDateStr)}
            type="button"
            className={clsx(
              'flex italic p-1 border-2 mr-2',
              isSelected(defaultStartDateStr, defaultEndDateStr) && 'bg-black',
            )}>
            <div>1999</div>- <div>Now</div>
          </button>
          {!smallScreen && (
            <button
              onClick={() => pSetDate('01/01/2002', '01/01/2014')}
              type="button"
              className="flex italic p-1 border-2 mr-2">
              <div>2002</div>- <div>2014</div>
            </button>
          )}
          <button
            onClick={() => pSetDate('01/01/2014', '01/01/2020')}
            type="button"
            className="flex italic p-1 p-1 border-2 mr-2">
            <div>2014</div>- <div>2020</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
