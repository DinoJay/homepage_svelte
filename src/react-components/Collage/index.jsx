import React, {Suspense, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';

import Collage from './Collage';

import imgData from './collagePics';

const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${process.env.flickr}&user_id=156337600%40N04&page=1&per_page=500&extras=description,date_upload,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o&format=json&nojsoncallback=1`;

function CollageContainer(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url, {mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        const {photos} = result;
        const {photo} = photos;
        const newData = photo
          .filter(p => {
            const tags = p.tags.split(' ');
            return {...p, tags};
          })
          .filter(p => p.tags.includes('collage'))
          .slice(0, 40);

        setData(newData);
      })
      .catch(err => console.log('err', err));
  }, []);

  return (
    <>
      <Collage {...props} data={data} />
      {data.length === 0 && <Loading className="text-xl" />}
    </>
  );
}

export default CollageContainer;
