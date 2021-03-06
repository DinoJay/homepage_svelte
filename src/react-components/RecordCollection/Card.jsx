import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import cx from './Card.scss';
import VinylIcon from './styles/disc-vinyl-icon.png';

// import Modal from '../utils/Modal';
const CardMini = ({title, tags, img, width, height, highlight, uri, ...rest}) => (
  <div
    {...rest}
    className={cx.cardMini2+' shadow-md'}
    style={{
      zIndex: 2,
      background: `url(${VinylIcon}) center center no-repeat`,
      boxShadow:
        '0 5px 2px rgba(0, 0, 0, 0.3), inset 0 0 5px rgba(0, 0, 0, 0.3)'
    }}>
    <a target="_blank" href={uri}>
      <img src={img} alt="" width="100%" height="100%" />
    </a>
  </div>
);

CardMini.propTypes = {
  // key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
  // color: PropTypes.string.isRequired
};

CardMini.defaultProps = {
  key: 'asa',
  img: '',
  height: 220,
  title: 'TEST CARD TITLE',
  img:
    'http://glintdemoz.com/timelylife/assets/attached_files/190_2016_06_11_12_24_44_testtest.jpg',
  color: 'blue'
};

export {CardMini};
