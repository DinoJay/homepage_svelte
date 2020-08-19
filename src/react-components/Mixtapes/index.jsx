import React, {Suspense, useState, useEffect} from 'react';

import MixtapesPage from './MixtapesPage';
// import defaultData from '../RecordCollection/dummyData';

const url = 'https://api.mixcloud.com/deli-jay/cloudcasts/';

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url, {mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        const {data: resultData} = result;
        console.log('resultData', resultData);
        return Promise.all(
          resultData.map(d =>
            fetch(`https://api.mixcloud.com${d.key}`).then(response =>
              response.json(),
            ),
          ),
        );
      })
      .then(newData => setData(newData));
  }, []);

  return <MixtapesPage data={data.map(d => ({...d, id: d.key}))} />;
};
