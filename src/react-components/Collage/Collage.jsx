import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import GridIcon from 'react-feather/dist/icons/grid';
import StopCircle from 'react-feather/dist/icons/stop-circle';
import clsx from 'clsx';

import {useTransition, useSpring, animated as a, config} from 'react-spring';
import sortBy from 'lodash.sortby';
import useMeasure from '../useMeasure';
import useMedia from '../useMedia';
import picHanging from './pictureHanging';

import cxx from './styles/collage.scss';

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const textShadow = (rYP, rXP) =>
  `${+rYP / 10}px ${rXP / 40}px tomato, ${rYP / 10}px ${rXP /
    20}px gold, ${rXP / 30}px ${rYP / 12}px rgba(0,159,227,.7)`;

function Collage(props) {
  const {data} = props;
  const [id, setId] = useState(null);
  const [hungPix, setHungPix] = useState([]);

  const colNumber = 9;
  const rowNumber = 5;
  const titleColSpan = 5;
  const titleRowSpan = 1;

  const [mode, setMode] = useState('grid');
  const cols = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [7, 7, 7],
    2,
  );
  const columns = cols;
  const [bind, {width, height}] = useMeasure();

  const textSnips = ['BR', 'US', 'SE', 'LS'];
  const titleArray = textSnips.map((d, i) => ({
    text: d,
    isTitle: true,
    id: d,
    padding: 10,
    width: width / columns,
    height: 160
  }));

  const filteredData = data.map((d, i) => ({
    ...d,
    width: width / (i % 2 === 0 ? 5 : 5),
    height: height / (i % 2 === 0 ? 3 : 5)
  }));

  const padding = 10;
  // .concat(titleArray);

  filteredData.splice(Math.ceil(10), 0, ...titleArray);
  // const oneSelected = filteredData.length === 1;

  const heights = new Array(columns).fill(0); // Each column gets a height starting with zero

  const masonry = (d, i) => {
    const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const row = (heights[column] += d.height) - d.height;
    const col = (width / columns) * column;

    const xy = [col, row, 0]; // X = container width / number of columns * column index, Y = it's just the height of the current column
    return {
      ...d,
      xy,
      width: width / columns - padding,
      height: d.height - padding,
    };
  };

  const gridItems = filteredData.map(masonry);

  // useEffect(() => {
  //   // () =>
  //   setTimeout(() => {
  //     picHanging(gridItems, [width, height], res => {
  //       setHungPix(res);
  //     });
  //   }, 2000);
  // }, [data.length]);

  const transitions = useTransition(
    mode === 'masonry' ? hungPix : gridItems,
    item => item.id,
    {
      from: ({xy, width, height}) => ({
        xy: [props.width / 2, props.height + 100, 0],
        width,
        height,
        opacity: 0
      }),
      enter: ({xy, width, height}) => ({xy, width, height, opacity: 1}),
      update: (a, i) => ({
        opacity: 1,
        xy: a.id === id ? [0, bind.ref.current.scrollTop || 0, 1000] : a.xy,
        width: a.id === id ? width : a.width,
        height: a.id === id ? height : a.height,
        // zIndex: a.id === id || oldId === id ? 1000 : -2
      }),
      leave: {
        // xy: [-1000, -1000, -1000],
        height: 0,
        width: 0,
        opacity: 0,
        // zIndex:
      },
      config: {
        // mass: 50,
        // tension: 1000,
        // friction: 200
      },
      // trail: 40
    },
  );

  return (
    <div className="flex flex-col relative flex-grow" style={{height}}>
      <div
        className="flex-grow relative overflow-y-auto"
        {...bind}
        style={{
          transformStyle: 'preserve-3d',
          perspectiveOrigin: 'top',
          height
        }}>
        {transitions
          .sort(d => (d.item.id === id ? 100 : -10))
          .map(
            ({
              item,
              props: {xy, height, width, opacity, zIndex, ...rest},
              key
            }) => (
              <a.div
                onClick={() => setId(id ? null : item.id)}
                className={clsx(
                  item.id !== id && 'shadow',
                  'absolute flex flex-col justify-center items-center',
                )}
                key={key}
                style={{
                  height,
                  width,
                  // zIndex,
                  // perspectiveOrigin: 'top',
                  transform: xy.interpolate(
                    (x, y, z) => `translate(${x}px,${y}px)`,
                  ),
                }}>
                {item.isTitle && (
                  <div
                    style={{
                      textShadow: textShadow(200, 200),
                      fontSize: '5.5rem'
                    }}
                    className="marker">
                    {item.text}
                  </div>
                )}
                {!item.isTitle && (
                  <a.div
                    className="overflow-hidden"
                    style={{
                      backgroundImage: `url(${
                        id === item.id ? item.url_m : item.url_m
                      })`,
                      backgroundSize: id === item.id ? 'contain' : 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      opacity,
                      width,
                      height,
                    }}
                  />
                )}
              </a.div>
            ),
          )}
      </div>
    </div>
  );
}

Collage.defaultProps = {
  width: 550,
  height: 330,
  center: [290, 200]
};

Collage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Collage;
