import React, {useState, useEffect, } from 'react';

import QuotesAndNotesPage from './QuotesNotesPage';
// import defaultData from '../RecordCollection/dummyData';

const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${process.env.flickr}&user_id=156337600%40N04&page=1&per_page=500&extras=description,date_upload,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o&format=json&nojsoncallback=1`;

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log('aso');
    fetch(url, {mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        const {photos} = result;
        const {photo} = photos;
        const newData = photo
          .map(p => {
            const tags = p.tags.split(' ');
            return {...p, tags, description: p.description._content};
          })
          .filter(p => p.tags.includes('note') || p.tags.includes('quote'))
          .slice(0, 40);

        setData(newData);
      });
  });

  return (
      <QuotesAndNotesPage data={data} />
  );
};
