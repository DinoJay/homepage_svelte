import React, {Suspense, useEffect, useState} from 'react';
import clsx from 'clsx';
import PixelPic from './PixelPic';
import Loading from './Loading';

import picSrc2 from './jan2.jpg';

const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${process.env.flickr}&user_id=156337600@N04&page=1&per_page=500&tag_mode=all&text=work&tags=jan&extras=description,date_upload,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o&format=json&nojsoncallback=1`;

const colors = [
  ['fee0d2', 'fc9272', 'de2d26'],
  ['f0f0f0', 'bdbdbd', '636363'],
  ['ece7f2', 'a6bddb', '2b8cbe'],
  ['fff7bc', 'fec44f', 'd95f0e'],
  ['fde0dd', 'fa9fb5', 'c51b8a'],
  ['f7fcb9', 'addd8e', '31a354'],
  ['f5f5f5', 'd8b365', '5ab4ac'],
  ['ece7f2', 'a6bddb', '2b8cbe'],
  ['e0ecf4', '9ebcda', '8856a7'],
];

export default function Jan() {
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
            // const description = p.description._content;
            // console.log('description', p.description);
            return {...p, tags, description: p.description._content};
          })
          .filter(p => p.tags.includes('jan'));

        setData(newData);
      });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex overflow-y-auto flex-wrap justify-center items-center h-full">
        {data.length === 0 && <Loading className="text-2xl" />}
        {data.map((d, i) => (
          <div
            className={clsx(
              'm-1 overflow-hidden border-2 border-white shadow-md',
              i % 3 && 'rounded-full',
            )}>
            <PixelPic
              src={d.url_m}
              size={200}
              backgroundColor={colors[i % colors.length][0]}
              shadowColor={colors[i % colors.length][1]}
              innerColor={colors[i % colors.length][2]}
            />
          </div>
        ))}
      </div>
    </Suspense>
  );
}
