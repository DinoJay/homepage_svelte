import React from 'react';
import {hierarchy, scaleLinear, extent, treemap, treemapResquarify} from 'd3';
import clsx from 'clsx';
import treemapSpiral from './treemapSpiral';

// import tsnejs from 'tsne';
// import ReactDom from 'react-dom';
// import sketchy from '../utils/d3.sketchy';

import cxx from './TagCloud.scss';

// const setChildrenToInheritFontSize = el => {
//   el.style.fontSize = 'inherit';
//   console.log('children', el.children);
//   _.each(el.children, child => {
//     setChildrenToInheritFontSize(child);
//   });
// };
function autoSizeText(container, attempts = 200, width, height) {
  const resizeText = el => {
    attempts--;
    if (el.clientWidth > width || el.clientHeight > height) {
      let elNewFontSize;
      if (
        el.style.fontSize === '' ||
        el.style.fontSize === 'inherit' ||
        el.style.fontSize === 'NaN'
      ) {
        elNewFontSize = '200px'; // largest font to start with
      } else {
        elNewFontSize = `${parseInt(el.style.fontSize.slice(0, -2), 10) - 1}px`;
      }
      el.style.fontSize = elNewFontSize;

      // this function can crash the app, so we need to limit it
      if (attempts <= 0) {
        return;
      }
      resizeText(el);
    }
  };
  // setChildrenToInheritFontSize(container);
  resizeText(container);
}

export const Tag = props => {
  const {
    left,
    top,
    width,
    height,
    color,
    fill,
    data,
    onMouseEnter,
    onMouseLeave,
    padding = 0,
    selected,
    style,
    className,
    textStyle,
    onClick,
    highlighted,
    visible,
    count,
    text,
  } = props;

  const nodeRef = React.useRef();
  React.useEffect(() => {
    console.log('autoSizeText');
    autoSizeText(nodeRef.current, 200, width - padding, height - padding);
  }, [width, height]);

  return (
    <div
      className={`${
        cxx.tag
      } cursor-pointer border-4 rounded flex flex-col items-center justify-center ${
        highlighted ? 'bg-black' : 'bg-white'
      }`}
      style={{
        left,
        top,
        width,
        height,
        transition: 'all 400ms',
        opacity: visible ? 1 : 0.4,
        ...style,
        // wordBreak: 'break-all'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onMouseEnter}
      onTouchEnd={onMouseLeave}
      onClick={visible ? onClick : d => d}>
      <div
        className={`${highlighted ? 'text-white' : 'text-gray-700'} marker `}
        ref={nodeRef}
        style={{
          fontSize: 29,
          // width,
          // height,
          // display: 'inline-block',
          whiteSpace: 'nowrap',
        }}>
        {text}
      </div>
    </div>
  );
};

function makeTreemap({data, width, height, padX, padY}) {
  const ratio = 4;
  const sorted = data.sort((a, b) => a.weight - b.weight);
  const myTreeMap = treemap()
    .size([width / ratio - 2, height])
    .paddingInner(0);
  // .round(true)
  // .tile(treemapSpiral);

  const size = scaleLinear()
    .domain(extent(data, d => d.weight))
    .range([30, 100]);

  const first = {name: 'root', children: sorted};
  const root = hierarchy(first).sum(d => size(d.weight));
  myTreeMap(root);
  if (!root.children) return [];
  root.children.forEach(d => {
    d.left = padX / 2 + Math.round(d.x0 * ratio);
    d.top = padY / 2 + Math.round(d.y0);

    d.width = Math.round(d.x1 * ratio) - Math.round(d.x0 * ratio) - padX / 2;
    d.height = Math.round(d.y1) - Math.round(d.y0) - padY / 2;
  });

  return root.children;
}

export default React.forwardRef((props, ref) => {
  const {className, height, style, children} = props;

  if (height <= 0) return <div {...props} ref={ref} />;

  const treemapData = makeTreemap(props);
  return (
    <div ref={ref} className={clsx(className, 'relative')} style={{...style}}>
      {treemapData.map((d, i) => children({...d, ...d.data}, i))}
    </div>
  );
});
