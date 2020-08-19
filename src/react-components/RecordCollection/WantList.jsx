import React, {useState, useMemo, useEffect, useRef} from 'react';
// import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import {group} from 'd3-array';
import clsx from 'clsx';
import flatten from 'lodash.flatten';
import sortBy from 'lodash.sortby';
import cloneDeep from 'lodash.clonedeep';
import intersection from 'lodash.intersection';
import uniqBy from 'lodash.uniqby';
import {motion, AnimatePresence} from 'framer-motion';
import ReactDOM from 'react-dom';
import useMeasure from '../useMeasure';

import OneBubbleSet from './OneBubbleSet';

import VinylIcon from './styles/disc-vinyl-icon.png';

function composedPath(el) {
  const path = [];

  while (el) {
    path.push(el);

    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);

      return path;
    }

    el = el.parentElement;
  }
}

const isSubset = (t0, t1) => {
  const ret = intersection(t0, t1).length > 0;
  return ret;
};

const colorscheme = [
  d3.schemeTableau10[6],
  d3.schemeTableau10[1],
  d3.schemeTableau10[9],
  d3.schemeTableau10[0],
  ...d3.schemeTableau10.slice(2, 6)
];

const rectangular = (w, h, s, size) => {
  const ns = Math.ceil(s / 4);
  const incrW = w / ns;
  const incrH = h / ns;
  // console.log({w, h, s, incrH, incrW});

  const s0 = [...Array(ns).keys()].map((i) => ({x: (i + 0) * incrW, y: 0}));

  const s1 = [...Array(ns - 1).keys()].map((i) => ({
    x: w - size,
    y: (i + 1) * incrH
  }));

  const s2 = [...Array(ns).keys()].map((i) => ({x: (i + 0) * incrW, y: h}));

  const s3 = [...Array(ns + 1).keys()].map((i) => ({
    x: 0,
    // TODO: dirty hack missing one sometimes
    y: Math.min(h, (i + 1) * incrH)
  }));

  const allEls = [...s0, ...s1, ...s2, ...s3];
  // const res = []; // ;
  // while (res.length !== allEls.length) {
  //   if (s0.length > 0) res.push(s0.pop());
  //
  //   if (s1.length > 0) res.push(s1.reverse().pop());
  //
  //   if (s2.length > 0) res.push(s2.pop());
  //
  //   if (s3.length > 0) res.push(s3.pop());
  // }

  return (i) => allEls[i];
};

const Record = ({
  title,
  styles,
  onClose,
  onClick,
  img,
  width,
  height,
  highlight,
  uri,
  style,
  id,
  onMouseOver,
  onMouseOut,
  className,
  master_id,
  enabled,
  ...rest
}) => {
  const imgComp = (
    <div className="h-full w-full relative">
      {enabled && (
        <button
          onClick={onClose}
          type="button"
          className="bg-white px-1 absolute right-0 top-0 -mr-6 text-lg">
          ✕
        </button>
      )}
      <button
        className="h-full w-full overflow-hidden"
        type="button"
        onClick={() =>
          !enabled
            ? onClick()
            : window.open(`https://www.discogs.com/master/${master_id}`)
        }>
        <img
          src={img || VinylIcon}
          alt=""
          style={{
            transition: 'all 300ms',
            background: `url(${VinylIcon}) center center no-repeat`,
            objectFit: 'cover',
            height: '100%',
            width: '100%'
          }}
        />
      </button>
    </div>
  );

  return (
    <div
      title={title}
      className={clsx('shadow-xl overflow-visible')}
      className={`${className} `}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onTouchEnter={onMouseOver}
      onTouchStart={onMouseOver}
      onTouchLeave={onMouseOut}
      style={{
        ...style,
        // background: 'blue',
        // TODO
        transform: `scale(${enabled ? 1.1 : 1})`,
        transition: 'all 0.3s'
      }}>
      {imgComp}
    </div>
  );
};

const layoutRectangularNodes = ({
  data,
  size,
  width,
  height,
  selected,
  offset
}) => {
  let offsetW = Math.max(width / (selected ? 2 : 2.3), 350);
  let offsetH = Math.max(width / (selected ? 2 : 2.3), 350);
  let level = 0;
  const res = [];
  while (res.length < data.length) {
    const len = 2 * offsetW + 2 * offsetH;
    const num = Math.ceil(len / (size + 5));
    // const num = n - 2; // n % 2 === 0 ? n : n;

    const rect = rectangular(
      offsetW,
      offsetH,
      Math.min(num, data.length - res.length),
      size
    );

    const resTitles = res.map((d) => d.title);
    const layoutNodes = data
      .slice(res.length, res.length + num)
      .filter((d) => !resTitles.includes(d.title))
      .map((d, i) => ({
        ...d,
        level,
        sx: width / 2 - offsetW / 2 + rect(i).x,
        sy: height / 2 - offsetH / 2 + rect(i).y
      }));

    level++;

    offsetW += offset;
    offsetH += offset;
    res.push(...layoutNodes);
  }

  return res; // uniqBy(res, 'title');
};

const percent = (t, sum) => Math.max(3, (t.values.length * 100) / sum);

const TagList = (props) => {
  const {tags, genres, setGenres, id} = props;
  const sortedTags = sortBy(tags, (d) => d.values.length).reverse();

  const sum = d3.max(tags, (d) => d.values.length);
  // tags.reduce((acc, d) => acc + d.values.length, 0);
  return (
    <div id={id} className="overflow-y-auto h-full">
      {sortedTags.map((t, i) => (
        <div
          className="relative mb-1 p-2 "
          onClick={() => {
            setGenres(
              genres.includes(t.key)
                ? genres.filter((d) => d !== t.key)
                : [t.key]
            );
          }}>
          <div
            className="z-10 ml-1 relative text-lg"
            style={{marginLeft: percent(t, sum) < 30 && `${percent(t, sum)}%`}}>
            {t.key}
          </div>
          <div
            className="h-full shadow-md left-0 top-0 absolute bg-blue-300 opacity-50"
            style={{
              width: `${percent(t, sum)}%`,
              background: colorscheme[i % 10]
            }}
          />
        </div>
      ))}
    </div>
  );
};

const Spiral = (props) => {
  const {width, setGenres, genres, id, setId, height, pad, data, tags} = props;
  const [size, setSize] = useState(50);

  const selectedNode = id ? data.find((d) => d.id === id) : null;
  const fData = id ? data.filter((d) => d.id !== id) : data;

  const offset = 3 * size;
  const w = width / (id ? 1.5 : 1.2);
  const h = width / (id ? 1.5 : 1.2);
  const initLayoutNodes = useMemo(
    () =>
      layoutRectangularNodes({
        data,
        size: size + 20,
        width: w,
        height: h,
        offset
      }),
    []
  );

  const contRef = useRef();
  const zoom = useRef(
    d3
      .zoom()
      .extent([
        [0, 0],
        [width, height]
      ])
      .scaleExtent([1, 8])

      // .on('click', null)
      // .on('dblclick', null)
      .on('zoom', () => {
        const {x, y, k} = d3.event.transform;
        // console.log('zoom', d3.event.transform);
        const sel = d3.select(contRef.current);

        sel.style('transform', `translate(${x}px, ${y}px) scale(${k})`);
        // sel.attr('class', 'cursor-move');
      })
  );

  const tmpLayoutNodes = id
    ? layoutRectangularNodes({
      data: fData,
      size: size + 20,
      width: w,
      height: h,
      offset
    })
    : initLayoutNodes;

  const level0Nodes = tmpLayoutNodes.filter((d) => d.level === 0);

  const minX = d3.min(level0Nodes, (d) => d.sx);
  const minY = d3.min(level0Nodes, (d) => d.sy);

  const maxX = d3.max(level0Nodes, (d) => d.sx);
  const maxY = d3.max(level0Nodes, (d) => d.sy);

  const centerY = minY + (maxY - minY) / 2;
  const centerX = minX + (maxX - minX) / 2;
  const innerHeight = maxY - minY - size;
  const innerWidth = maxX - minX - size;

  const sizeRec = (d) => (id === d.id ? size + 40 : size);

  const tagListId = 'tagListId';
  zoom.current.filter((d) => {
    const {pageX, pageY} = d3.event;
    const path = composedPath(d3.event.target).map((d) => d.id);
    return path.every((d) => !d || !d.includes(tagListId));
  });

  const selectedRenderedNode = selectedNode && {
    ...selectedNode,
    sx: centerX,
    sy: centerY
  };

  const layoutNodes = id
    ? [...tmpLayoutNodes, selectedRenderedNode]
    : tmpLayoutNodes;

  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).call(zoom.current);
    zoom.current.translateTo(
      d3.select(ref.current).transition().duration(750),
      centerX,
      centerY
    );
  }, [id]);

  const tagNodes = id
    ? tags.map((t) => {
      const tNodes = t.values
        .map((d) => layoutNodes.find((n) => n.id === d.id))
        .map((d) => ({
          ...d,
          x: d.sx - sizeRec(d) / 2,
          y: d.sy - sizeRec(d) / 2,
          width: sizeRec(d),
          height: sizeRec(d)
        }));
      return {...t, layoutNodes: tNodes};
    })
    : [];

  console.log('fData', fData);
  console.log('tagNodes', tagNodes);

  return (
    <div
      className="flex flex-col flex-grow overflow-hidden w-full relative"
      style={{height, width}}
      ref={ref}>
      <div className="flex items-center z-10" style={{width: 100}}>
        <button
          type="button"
          className="text-4xl bg-white p-1 m-2"
          onClick={() => setSize(size - 5)}>
          -
        </button>
        <button
          type="button"
          className="text-4xl bg-white p-1 m-2"
          onClick={() => setSize(size + 5)}>
          +
        </button>
        <button
          type="button"
          className="text-4xl bg-white p-1 m-2"
          onClick={() =>
            zoom.current.translateTo(
              d3.select(ref.current).transition().duration(750),
              centerX,
              centerY
            )
          }>
          reset
        </button>
      </div>
      <div ref={contRef} style={{width, height}}>
        {selectedNode &&
          tagNodes
            .reverse()
            .map((d, i) => (
              <OneBubbleSet
                pad={10}
                zIndex={i}
                opacity={0.5}
                coords={d.layoutNodes}
                altCoords={tagNodes.filter(
                  (t) => !d.layoutNodes.map((e) => e.id).includes(t.id)
                )}
                color={colorscheme[i % 10]}
              />
            ))}
        {!id && (
          <div
            className="absolute p-2"
            style={{
              transform: 'translate(-50%,-50%)',
              top: centerY,
              left: centerX,
              height: innerHeight,
              width: innerWidth
            }}>
            <div
              id={tagListId}
              className="border-2 shadow-md p-1 border-black w-full h-full">
              <TagList
                {...props}
                tags={tags}
                genres={genres}
                data={data}
                setGenres={setGenres}
              />
            </div>
          </div>
        )}

        {layoutNodes.map((d, i) => (
          <motion.div
            positionTransition
            className={clsx('absolute', 'z-10')}
            animate={
              id === d.id && {
                transform: ['scale(1)', 'scale(1.1)', 'scale(1.2)', 'scale(1)']
              }
            }
            transition={
              {
                // loop: Infinity,
                // duration: 2,
              }
            }
            style={{
              left: d.sx - sizeRec(d) / 2,
              top: d.sy - sizeRec(d) / 2
            }}>
            <Record
              styles={d.styles}
              onClick={() => {
                setId(d.id);
              }}
              onClose={() => setId(null)}
              enabled={d.id === id}
              key={d.id}
              {...d}
              style={{
                width: size + (id === d.id ? 40 : 0),
                height: size + (id === d.id ? 40 : 0)
              }}
              onMouseOver={() => {}}
              onMouseOut={() => {}}
              img={
                d.thumb || (d.basic_information && d.basic_information.thumb)
              }
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

function setify(data) {
  const spreadData = data
    .map((d) => d.styles.map((t) => ({...d, key: t})))
    .flat();

  return [...group(spreadData, (d) => d.key)].map((d) => ({
    key: d[0],
    values: d[1]
  }));
}

const sortByTags = (data, tags) => {
  const ds = sortBy(tags, (d) => d.values.length)
    .reverse()
    .map((t) => data.filter((d) => (d.styles || []).includes(t.key)))
    .flat();
  return ds;
};

const WantList = (props) => {
  const {width, height, data} = props;
  const [id, setId] = useState(null);
  const [genres, setGenres] = useState([]);

  const ref = useRef();
  const selectedNode = data.find((d) => d.id === id);
  const selectedStyles = selectedNode ? selectedNode.styles || [] : genres;

  const fData = uniqBy(
    id !== null ? data.filter((d) => isSubset(selectedStyles, d.styles)) : data,
    'id'
  );

  const tags = sortBy(
    setify(fData).filter(
      (d) => !selectedStyles.length || selectedStyles.includes(d.key)
    ),
    (d) => d.values.length
  );

  const selectedTags = selectedStyles.map((idd) =>
    tags.find((t) => t.key === idd)
  );
  const sortedData = selectedStyles.length
    ? sortByTags(fData, selectedTags).reverse()
    : fData;

  return (
    <div className="flex relative" ref={ref}>
      <Spiral
        {...props}
        tags={tags}
        genres={genres}
        setGenres={setGenres}
        data={sortedData}
        id={id}
        contRef={ref}
        setId={setId}
      />

      {id && (
        <div className="absolute shadow-md right-0 md:top-0 p-2 bg-white">
          <TagList
            setGenres={setGenres}
            genres={genres}
            {...props}
            tags={tags}
            data={data}
          />
        </div>
      )}
    </div>
  );
};

export default WantList;
