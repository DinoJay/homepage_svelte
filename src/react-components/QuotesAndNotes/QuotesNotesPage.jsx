import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import css from './QuotesAndNotes.scss';

const UnderConstruction = () => (
  <div
    className="fixed z-50 p-2 bg-red-400 border-4 border-black "
    style={{transform: 'rotate(-45deg) translate(-30%, 280%)'}}>
    <div className="text-2xl uppercase font-bold text-white">
      Under Construction
    </div>
  </div>
);

function resizeGridItem({grid, item, content}) {
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

const QuotesAndNotesPage = ({data}) => {
  const gridStyle = {
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    // grid-auto-flow: column
    gridAutoFlow: 'row',
    gridAutoRows: 10
  };

  const [rowSpans, setRowSpans] = useState(
    data.reduce((d, acc) => ({...acc, [d.id]: null}), {}),
  );
  const gridRef = React.createRef();
  const contentRefs = data.reduce(
    (acc, d) => ({...acc, [d.id]: React.createRef()}),
    {},
  );
  const itemRefs = data.reduce(
    (acc, d) => ({...acc, [d.id]: React.createRef()}),
    {},
  );
  // const itemRef = React.createRef();

  useEffect(() => {
    const newRowSpans = data.reduce(
      (acc, d) => ({
        ...acc,
        [d.id]: resizeGridItem({
          grid: gridRef.current,
          item: itemRefs[d.id].current,
          content: contentRefs[d.id].current
        })
      }),
      {},
    );
    setRowSpans(newRowSpans);
  }, [data.length]);

  return (
    <div className="relative h-full w-full overflow-y-auto">
      <UnderConstruction />
      <div ref={gridRef} className="m-2 " style={gridStyle}>
        {data.reverse().map(d => (
          <div
            ref={itemRefs[d.id]}
            style={
              rowSpans[d.id] !== null
                ? {
                  gridRow: `span ${rowSpans[d.id]}`
                }
                : {}
            }>
            <div
              ref={contentRefs[d.id]}
              className={clsx('font-mono border-2', css['content-box'])}>
              <h2 className="text-lg">{d.title}</h2>
              <div
                dangerouslySetInnerHTML={{__html: d.description}}
                style={{whiteSpace: 'pre-line'}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesAndNotesPage;
