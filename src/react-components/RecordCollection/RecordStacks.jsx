import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import clsx from 'clsx';
import flatten from 'lodash.flatten';
import cloneDeep from 'lodash.clonedeep';
import intersection from 'lodash.intersection';
import uniq from 'lodash.uniq';
import useMeasure from '../useMeasure';

import TagCloud, {Tag} from './TagCloud';

// import d3Sketchy from '../../lib/d3.sketchy';
// import SketchyCircle from './SketchyCircle';

import VinylIcon from './styles/disc-vinyl-icon.png';

const isSubset = (t0, t1) => {
  const ret = intersection(t0, t1).length > 0;
  return ret;
};

// import Modal from '../utils/Modal';
const Record = ({
  title,
  styles,
  img,
  width,
  height,
  highlight,
  uri,
  style,
  onMouseOver,
  onMouseOut,
  className,
  enabled,
  ...rest
}) => (
  <div
    className="shadow-xl overflow-visible"
    disabled={!enabled}
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
    <a href={uri} target="_blank">
      <img
        src={img}
        alt=""
        style={{
          transition: 'all 300ms',
          background: `url(${VinylIcon}) center center no-repeat`,
          objectFit: 'cover',
          height: '100%',
          width: '100%',
        }}
      />
    </a>
  </div>
);

function aggregateByTags(data) {
  const spreadData = flatten(
    data.map(d =>
      d.styles.map(t => {
        const copy = cloneDeep(d);
        copy.key = t;
        return copy;
      }),
    ),
  );
  return d3
    .nest()
    .key(d => d.key)
    .entries(spreadData);
}

const RecordStack = props => {
  const {
    stackConf,
    data,
    selectedIndex,
    className,
    onMouseOver,
    onMouseOut,
    recHeight,
    width,
    recSize
  } = props;

  const [index, setIndex] = useState(null);

  const w = Math.min((width - (recSize * 3) / 4) / data.length, recSize);

  return (
    <div
      className={clsx(
        'flex ',
        data.length < 4 && 'justify-center overflow-visible',
      )}>
      {data.map((ch, i) => (
        <div
          className="overflow-visible relative"
          style={{
            flex: `0 0 ${i === index ? recSize : w}px`,
            // transform: 'translateX(-200%)',

            height: recSize,
            zIndex: i + 10,
            transition: 'flex 400ms'
          }}>
          <Record
            className=" overflow-visible absolute"
            enabled={i === index}
            {...ch}
            key={ch.id}
            style={{
              width: recSize,
              height: recSize
            }}
            onMouseOver={() => {
              setIndex(i);
              onMouseOver(ch);
            }}
            onMouseOut={() => {
              setIndex(null);
              onMouseOver(ch);
            }}
            img={ch.thumb || ch.basic_information.thumb}
          />
        </div>
      ))}
    </div>
  );
};

const HookedColl = props => {
  const {width, height: h, pad, data, tags} = props;

  const small = width < 800;
  const height = small ? Math.max(h, 300) : h;

  const recSize = width > 800 && height > 500 ? 180 : 100;

  const [selectedId, setSelectedId] = useState(null);
  const [filterSet, setFilterSet] = useState([]);
  const relateTags = set =>
    uniq(
      data.reduce(
        (acc, d) => (isSubset(d.styles, set) ? [...acc, ...d.styles] : acc),
        [],
      ),
    );
  const relatedTags = relateTags(filterSet);

  const filterRecs = s =>
    data.filter(d => isSubset(s, d.styles) || s.length === 0);

  const filteredData = filterRecs(filterSet);

  const labelMap = tags
    .map(d => d.key)
    .reduce((acc, d) => {
      const plusNumRec =
        filterRecs([...filterSet, d]).length - filteredData.length;

      const label = (() => {
        if (filterSet.length === 0) return d;
        if (filterSet.includes(d)) return `${d} ${filterRecs([d]).length}`;
        if (relatedTags.includes(d)) return `${d} Δ${plusNumRec}`;
        return <div style={{textDecoration: 'line-through'}}>{d}</div>;
      })();

      return {
        ...acc,
        [d]: label,
      };
    }, {});

  const stackBorder = Math.ceil(filteredData.length / 2);
  const selectedRecord = data.find(d => d.id === selectedId) || null;
  const highlightedTags = selectedRecord ? selectedRecord.styles : [];
  const selectedRecIds = filteredData
    .filter(d => isSubset(d.styles, highlightedTags))
    .map(d => d.id);

  const selectedIndex = filteredData.findIndex(d => d.id === selectedId);

  const firstIndex =
    selectedIndex !== -1 && selectedIndex < stackBorder ? selectedIndex : null;

  const secIndex =
    selectedIndex !== -1 && selectedIndex >= stackBorder
      ? selectedIndex - stackBorder
      : null;

  const firstItems = filteredData.slice(0, stackBorder);
  const secItems = filteredData.slice(stackBorder);

  const cloudHeight = height - 2 * recSize;
  console.log('cloudHeight', cloudHeight);

  const stackConf = {
    centered: false,
    duration: 400,
    width,
    unit: 'px',
    height: recSize,
    slotSize: recSize
  };

  // const treemapData = makeTreemap({
  //   data: styles,
  //   width,
  //   height: cloudHeight,
  //   padX: 5,
  //   padY: 5,
  // });

  const onMouseOver = d => () => {
    if (firstItems.find(e => e.id === d.id)) {
      if (firstItems.length > 4) setSelectedId(d.id);
    }
    if (secItems.length > 4) setSelectedId(d.id);
  };

  const onMouseOut = () => {
    setSelectedId(null);
  };

  const imgFilterClass = chId =>
    selectedId !== chId ? 'sepia-img-filter' : 'sepia-img-filter-disabled';

  const highlight = chId =>
    selectedRecIds.includes(chId)
      ? 'sepia-img-filter'
      : 'sepia-img-filter-disabled';

  const sharedStackConf = {
    stackConf,
    selectedId,
    onMouseOver,
    onMouseOut,
    width,
  };

  const StackOne = (
    <RecordStack
      recSize={recSize}
      data={firstItems}
      selectedIndex={firstIndex}
      {...sharedStackConf}
    />
  );

  const StackTwo = (
    <RecordStack
      recSize={recSize}
      data={secItems}
      selectedIndex={secIndex}
      {...sharedStackConf}
    />
  );

  const stackDim = {height: recSize};

  const [bind, {height: tHeight}] = useMeasure();
  const smallDim = width < 500;

  const slicedTags = tags.slice(0, smallDim ? 20 : 100);

  return (
    <div className="flex flex-col flex-grow overflow-visible " style={{height}}>
      <div className="overflow-visible" style={stackDim}>
        {StackOne}
      </div>
      <TagCloud
        {...bind}
        className="my-1 sm:my-3 flex-grow"
        style={{
          position: 'relative',
          minHeight: small ? cloudHeight : tHeight
        }}
        data={
          !filterSet.length
            ? slicedTags
            : relatedTags.map(t => tags.find(d => d.key === t))
        }
        width={width}
        height={small ? cloudHeight : tHeight}
        padX={10}
        padY={10}
        onHover={d => console.log('yeah', d)}>
        {(d, i) => (
          <Tag
            highlighted={
              isSubset([d.key], highlightedTags) || isSubset(filterSet, [d.key])
            }
            visible={relatedTags.length === 0 || isSubset(relatedTags, [d.key])}
            onClick={() => {
              setFilterSet(
                filterSet.includes(d.key)
                  ? filterSet.filter(k => k !== d.key)
                  : filterSet.concat(d.key),
              );
            }}
            padding={5}
            onMouseEnter={() => {
              console.log('yeah');
            }}
            onMouseLeave={() => null}
            className={`border-${(i % 6) + 1}x`}
            {...d}
            text={labelMap[d.key]}
          />
        )}
      </TagCloud>
      <div className="overflow-visible" style={stackDim}>
        {StackTwo}
      </div>
    </div>
  );
};

const RecordCollectionWrapper = ({data, ...rest}) => {
  const tags = aggregateByTags(data).map(d => ({
    ...d,
    weight: d.values.length
  }));

  return <HookedColl {...rest} data={data} tags={tags} />;
};

export default RecordCollectionWrapper;
