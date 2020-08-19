import React, {useState, useEffect} from 'react';
import {Flipper, Flipped} from 'react-flip-toolkit';
import clsx from 'clsx';
// import Card3d from '../utils/Card3D';
import imgSrc from '../jan2.jpg';

const STUDENT = 'student';
const OFFTOPIC = 'off-topic';
const ACADEMIC = 'academic';

const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${process.env.flickr}&user_id=156337600@N04&page=1&per_page=500&tag_mode=all&text=work&tags=project&extras=description,date_upload,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o&format=json&nojsoncallback=1`;

const FlipCont = props => {
  const {selectedId, id, setId, description, title, url_m} = props;

  const tags = props.tags.filter(d => d !== 'project');

  const ref = React.useRef();
  const selected = selectedId === id;
  const getSpan = () => {
    if (selectedId === null) return {col: 'span 2', row: 'span 2'};

    if (selected) return {col: '1 / span 4', row: '1 / span 4'};
    return {col: 'span 1', row: 'span 2'};
  };

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

  return (
    <Flipped flipId={id}>
      <div
        ref={ref}
        onClick={() => (!selected ? setId(id) : setId(null))}
        className={clsx(
          'rounded',
          'my-2 sm:my-0 border-2 hover:border-black flex flex-col p-2  w-full shadow-md ',
          !selected && 'cursor-pointer',
        )}
        style={{
          gridColumn: getSpan().col,
          gridRow: getSpan().row
        }}>
        <h2 className={clsx(id && 'truncate')}>{title}</h2>
        <div
          className={clsx(
            'flex-grow overflow-hidden',
            !selected && 'flex flex-col ',
          )}>
          <img
            alt={title}
            src={url_m}
            style={{objectFit: selectedId === id ? 'contain' : 'cover'}}
            className={clsx(
              'rounded',
              !selected && 'flex-grow scale-1 hover:scale-2',
              selected && 'float-left mr-4 h-32 sm:h-64',
            )}
          />
          {selected && (
            <p
              className="p-1 m-2 "
              dangerouslySetInnerHTML={{__html: description}}
            />
          )}
        </div>
        <div className="flex mt-2 truncate">
          {tags.map(d => (
            <div className="uppercase m-1 font-bold bg-black text-white rounded px-1 pt-1 pb-1">
              {d}
            </div>
          ))}
        </div>
      </div>
    </Flipped>
  );
};

export default function MyProjects(props) {
  const [id, setId] = useState(null);
  const {height, width} = props;

  const [projectData, setProjectData] = useState([]);

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
          .filter(p => p.tags.includes('project'));
        setProjectData(newData);
      });
  }, []);

  return (
      <Flipper flipKey={id} className="flex flex-col flex-grow overflow-y-auto">
        <div
          className="flex-grow overflow-visible w-full"
          style={{
            width,
            display: width > 500 ? 'grid' : null,
            gridGap: width > 500 ? 15 : null,
            gridTemplateColumns: `repeat(auto-fit, minmax(${140}px, 1fr))`,
            gridTemplateRows: 'repeat(auto-fill, minmax(100px,1fr))',
            justifyItems: 'center',
          }}>
          {projectData.map(d => (
            <FlipCont {...d} selectedId={id} setId={setId} />
          ))}
        </div>
      </Flipper>
  );
}
