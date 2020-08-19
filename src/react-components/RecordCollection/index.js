import React, {useState, useEffect} from 'react';
import uniqBy from 'lodash.uniqby';
import cloneDeep from 'lodash.clonedeep';
import * as d3 from 'd3';
import {group} from 'd3-array';
import Loading from '../Loading';

import wantListRawData from './wantlist.json';

// import prune from 'json-prune';
// import superagent from 'superagent';
// import $ from 'jquery';
// import prune from 'json-prune';

// import getData from './discogsData';

// import $ from 'jquery';
import RecordStacks from './RecordStacks';
import WantList from './WantList';
import DotDotDot from '../utils/DotDotDot';

const wantlistData = uniqBy(
  wantListRawData.map((d) => ({
    ...d,
    ...d.basic_information,
    styles: [...d.basic_information.styles, ...d.basic_information.genres]
  })),
  'title'
).slice(0, 200);

// import getData from './discogsData';
// import dummyData from './dummyData';
// import postcardStyle from '../styles/postcard.scss';

const url =
  'https://us-central1-homepage-9c225.cloudfunctions.net/fetchRecords';

const url1 =
  'https://us-central1-homepage-9c225.cloudfunctions.net/fetchWantList';

//    <RecordStacks {...props} pad={30} data={data.reverse().slice(0, 60)} />

const layoutCircle = ({data, radius, width, height, id}) => {
  let angle = 0;
  const step = (2 * Math.PI) / data.length;

  return data.map((c) => {
    const x = width / 2 + (c.id !== id ? radius * Math.cos(angle) : 0);
    const y = height / 2 + (c.id !== id ? radius * Math.sin(angle) : 0);
    angle += step;
    return {x, y, ...c};
  });
};

export default (props) => {
  // console.log(
  //   'd',
  //   group(wantlistData, (d) => d.title)
  // );
  // const [data, setData] = useState([]);
  // const [data1, setData1] = useState([]);
  const {height, width} = props;
  // useEffect(() => {
  //   fetch(url, {mode: 'cors'})
  //     .then((response) => response.json())
  //     .then((result) => {
  //       const formattedData = result
  //         .map((d) => ({
  //           ...d,
  //           milliseconds: Date.parse(d.dateAdded)
  //         }))
  //         .sort((a, b) => b.milliseconds - a.milliseconds);
  //       setData(formattedData);
  //     });
  //   fetch(url1, {mode: 'cors'})
  //     .then((response) => response.json())
  //     .then((ds) => {
  //       setData1(
  //         uniqBy(
  //           ds.map((d) => ({
  //             ...d,
  //             ...d.basic_information,
  //             styles: [
  //               ...d.basic_information.styles,
  //               ...d.basic_information.genres
  //             ]
  //           })),
  //           (d) => d.id,
  //         ).slice(0, 200)
  //       );
  //     });
  // }, []);
  //
  // return data1.length === 0 ? (
  //   <div
  //     className="h-full w-full flex flex-col justify-center items-center text-4xl uppercase"
  //     style={{height}}>
  //     <Loading />
  //   </div>
  // ) : (
  // );

  return (
    <WantList
      {...props}
      pad={30}
      data={wantlistData}
      width={width}
      height={height}
    />
  );
};
