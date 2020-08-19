import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import Loading from '../Loading';

// import * as d3 from 'd3';
import WorkInProgress from './WorkInProgressGalleryPage';

const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${process.env.flickr}&user_id=156337600@N04&page=1&per_page=500&tag_mode=all&text=work&tags=work&extras=description,date_upload,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o&format=json&nojsoncallback=1`;

const WorkInProgressGallery = props => {
  const [data, setData] = useState([]);
  useEffect(() => {
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
          .filter(p => p.tags.includes('work'));

        setData(newData);
      });
  }, []);

  return (
    <>
      <WorkInProgress {...props} data={data} />
      {data.length === 0 && <Loading className="text-2xl" />}
    </>
  );
};

export default WorkInProgressGallery;
