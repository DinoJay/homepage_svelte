import React, {useState, useEffect} from 'react';
import sortBy from 'lodash.sortby';
import clsx from 'clsx';
import X from 'react-feather/dist/icons/x';

import {Flipper, Flipped} from 'react-flip-toolkit';

function resizeGridItem({grid, item}) {
  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'),
  );
  // console.log('rowHeight', rowHeight);
  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-row-gap'),
  );
  // console.log('item scrollHeight', item.scrollHeight);
  const rowSpan = Math.ceil(
    (item.scrollHeight + rowGap) / (rowHeight + rowGap),
  );
  // console.log('clientrect', content.getBoundingClientRect().height);
  // console.log('rowSpan', rowSpan);
  return rowSpan;
  // item.style.gridRowEnd = `span ${rowSpan}`;
}
// allItems = document.getElementsByClassName("item");
// for(x=0;x<allItems.length;x++){
//    imagesLoaded( allItems[x], resizeInstance);
// }

const MixDetail = ({
  selected,
  index,
  pictures,
  id,
  description,
  name,
  onClose
}) => (
  <div className={clsx(selected && 'flex', 'w-full flex-grow cursor-pointer')}>
    <div className="relative flex-grow flex flex-col">
      <div
        className="absolute w-full flex flex-col"
        style={{height: selected ? 500 : 200}}>
        <div className="m-2 z-10">
          {selected ? (
            <h2 className="p-1 ">
              <span className="bg-white p-1">{name}</span>
            </h2>
          ) : (
            <h3 className="bg-white">{name}</h3>
          )}
        </div>
      </div>
      {!selected && (
        <img
          alt="img mixtape"
          className="flex-grow"
          src={pictures.medium}
          style={{width: '100%', height: 200, objectFit: 'cover'}}
        />
      )}
      <div className={`${!selected ? 'hidden' : null} flex-grow relative`}>
        <img
          alt="img mixtape"
          className="absolute h-full"
          src={pictures.large}
          style={{width: '100%', objectFit: 'cover'}}
        />
        {selected && (
          <button
            onClick={onClose}
            type="button"
            className="bg-white p-1 m-1 absolute right-0 bottom-0 border-2 border-black">
            <X />
          </button>
        )}
      </div>
      {selected && (
        <div className="mt-1 z-20">
          <iframe
            title="mixcloud"
            width="100%"
            height="60"
            src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${id}`}
            frameBorder="0"
          />
        </div>
      )}
    </div>
    {!selected && (
      <div
        className={`m-1 overflow-hidden ${selected ? 'p-2 text-lg' : null}`}
        style={{
          flex: '0 1 150px',
          // maxHeight: 150,
          texgtOverflow: 'ellipsis'
        }}>
        <div lineNum={20}>{description}</div>
      </div>
    )}
  </div>
);

export default function MixtapesPage({data}) {
  const [id, setId] = useState(null);
  const [scrollPos, setScrollPos] = useState(null);
  const gridStyle = {
    display: 'grid',
    gridGap: 40,
    gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
    gridAutoFlow: 'row dense',
    gridAutoRows: id === null ? 10 : null,
    gridTemplateRows: id !== null ? '1fr' : null,
    height: scrollPos > 0 && id === null ? scrollPos : null
  };

  const [rowSpans, setRowSpans] = useState(
    data.reduce((d, acc) => ({...acc, [d.id]: null}), {}),
  );
  const gridRef = React.useRef();
  const scrollRef = React.useRef();
  const contentRefs = data.reduce(
    (acc, d) => ({...acc, [d.id]: React.createRef()}),
    {},
  );
  const itemRefs = data.reduce(
    (acc, d) => ({...acc, [d.id]: React.createRef()}),
    {},
  );

  const filteredData =
    id !== null ? data.filter(d => d.id === id) : sortBy(data, d => d.id);

  // console.log('data', data);
  // useEffect(() => {
  //   wrapGrid(gridRef.current, {
  //     // easing: 'backOut',
  //     stagger: 10,
  //     duration: 300,
  //   });
  // }, []);

  // const itemRef = React.createRef();

  useEffect(() => {
    const newRowSpans = filteredData.reduce(
      (acc, d) => ({
        ...acc,
        [d.id]: resizeGridItem({
          grid: gridRef.current,
          item: itemRefs[d.id].current
        }),
      }),
      {},
    );
    setRowSpans(newRowSpans);
  }, [data.length]);

  useEffect(() => {
    gridRef.current.scrollTop = scrollRef.current;
  });

  return (
    <Flipper flipKey={id} className="h-full w-full">
      <div
        ref={gridRef}
        className="m-2 h-full overflow-y-auto"
        style={gridStyle}>
        {filteredData.reverse().map((d, i) => (
          <Flipped flipId={d.id}>
            <div
              key={d.id}
              onClick={() => {
                d.id !== id && setId(d.id);
                const tmpScrollTop = gridRef.current.scrollTop;
                if (id === null) scrollRef.current = tmpScrollTop;
              }}
              className={clsx(
                'p-5 flex overflow-hidden border-4 border-black ',
              )}
              ref={itemRefs[d.id]}
              style={{
                borderRadius: i % 2 ? 10 : 0,
                // boxShadow: '4px 4px lightgrey',
                boxShadow: '6px 6px #404040',
                gridRow:
                  id === null && rowSpans[d.id] && `span ${rowSpans[d.id]}`
              }}>
              <MixDetail
                {...d}
                selected={d.id === id}
                index={i}
                onClose={() => setId(null)}
              />
            </div>
          </Flipped>
        ))}
      </div>
    </Flipper>
  );
}
