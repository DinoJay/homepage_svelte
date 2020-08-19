import React, {useState, useEffect} from 'react';
import clsx from 'clsx';

// import {wrapGrid} from 'animate-css-grid';

import {Flipper, Flipped} from 'react-flip-toolkit';

import Description from 'Src/components/utils/Description';
import Card3D from '../utils/Card3D';
import penSrc from './pen.svg';

// import $ from 'jquery';
// import chroma from 'chroma-js';

// import { bboxCollide } from 'd3-bboxCollide';

const WorkItem = ({selected, onClick, index, ...d}) => {
  const [extended, setExtended] = useState(false);

  const ref = React.useRef();
  useEffect(() => {
    if (selected)
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          // block: 'end',
          // inline: 'nearest'
        });
      }, 200);
  }, [selected]);
  console.log('d description', d.description);

  return (
    <Flipped flipId={d.id}>
      <div
        ref={ref}
        key={d.id}
        className={`cursor-pointer border-black border-2 border-${index %
          3}x bg-white p-2 flex flex-col
            overflow-hidden ${selected ? 'animate' : null}`}
        style={{
          gridRow: selected ? 'span 6 ' : 'span 2',
          gridColumn: selected ? 'span 2 ' : 'span 1',
          boxShadow: '0 0.5rem 0.5rem rgba(0,0,0,0.3)',
          background: 'white',
        }}>
        <div className={clsx('h-full scale-1 ', !selected && 'hover:scale-2')}>
          <div
            onClick={e => {
              e.stopPropagation();
              onClick && onClick();
            }}
            className="h-full w-full flex flex-col">
            <img
              className="flex-grow flex-shrink"
              src={selected ? d.url_o : d.url_s}
              style={{
                minHeight: 0,
                transition: 'filter 0.3s',
                objectFit: selected ? 'contain' : 'cover',
                // width: '10rem',
                // height: '10rem'
              }}
            />
            <div
              className={clsx('p-2 overflow-y-auto', !selected && 'hidden')}
              style={{minHeight: '12rem'}}>
              <div
                className="text-lg "
                dangerouslySetInnerHTML={{__html: d.description}}
              />
            </div>
          </div>
        </div>
      </div>
    </Flipped>
  );
};

function ScreenshotDiary(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {width, height, data, addFile, addImgUrl} = props;
  const [id, setId] = useState(null);

  const filteredData = id !== null ? data.filter(d => d.id === id) : data;
  const oneSelected = filteredData.length === 1;

  const gridRef = React.createRef();

  // useEffect(() => {
  //   wrapGrid(gridRef.current, {
  //     // easing: 'backOut',
  //     stagger: 10,
  //     duration: 400
  //   });
  // }, []);

  // useEffect(
  //   () => {
  //     forceAnim();
  //   },
  //   [id],
  // );

  // const rowSpan = 1;
  return (
    <Flipper flipKey={id} className="h-full overflow-y-auto">
      <div
        className="w-full h-full overflow-y-auto pb-3"
        style={{
          display: 'grid',
          justifyContent: 'center',
          // alignItems: 'center',
          gridTemplateColumns: `repeat(auto-fit, minmax(10rem, 1fr))`,
          // gridTemplateRows: 'minmax(1fr, 20rem)',
          gridAutoRows: '5rem',
          gridGap: '16px',
          // gridAutoFlow: 'dense',
        }}>
        {data.map((d, i) => (
          <WorkItem
            {...d}
            selected={d.id === id}
            index={i}
            onClick={() => (d.id !== id ? setId(d.id) : setId(null))}
            selected={d.id === id}
          />
        ))}
        {!oneSelected && (
          <div key="pen" className="p-1">
            <img src={penSrc} style={{}} />
          </div>
        )}
      </div>
    </Flipper>
  );
}

ScreenshotDiary.defaultProps = {
  width: 550,
  height: 330,
  center: [290, 200]
};

export default ScreenshotDiary;
