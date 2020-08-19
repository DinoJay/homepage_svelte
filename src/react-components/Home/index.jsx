// import * as d3 from 'd3-jetpack/build/d3v4+jetpack';
import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import {timeFormat, timeParse, timeYear, timeMonth, timeDay} from 'd3';
import clsx from 'clsx';
import AboutVis from './AboutVis';
import style from '../styles/postcard.scss';
import cx from './home.scss';

import beerIcon from './pics/beer-icon.png';
import coffeeIcon from './pics/take-away.svg';
import jsLogo from './pics/js_logo.svg';
import reactLogo from './pics/react_logo.svg';
import d3Logo from './pics/d3_logo.svg';
import vinylIcon from './pics/music.svg';
import headphonesIcon from './pics/headphones.svg';
import astroIcon from './pics/astro.png';

import PixelPic from './PixelPic';

const ft = '%d/%m/%Y';
const formatTime = timeFormat(ft);
const parseTime = timeParse(ft);
const birthdate = parseTime('26/04/1988');
const todayDate = new Date();
const thisYearBdate = parseTime(`26/04/${new Date().getFullYear()}`);
const BelgiumArrivalDate = parseTime('22/09/2013');

const SocialMedia = () => (
  <ul className={style.socialMedia}>
    <li>
      <a target="_blank" href="mailto:jmaushag@gmail.com">
        Email
      </a>
    </li>
    <li>
      <a target="_blank" href="https://www.facebook.com/dinosaurjay?">
        Facebook
      </a>
    </li>
    <li>
      <a target="_blank" href="https://twitter.com/DMshgn">
        Twitter
      </a>
    </li>
  </ul>
);

class Tooltip extends Component {
  // static propTypes = {
  //   children: PropTypes.node,
  //   style: PropTypes.object,
  // };

  state = {textWidth: 0, textHeight: 0};

  render() {
    const {children, width, className, height, style} = this.props;
    const {textWidth, textHeight} = this.state;

    return (
      <div
        style={{
          fontFamily: 'kongtext',
          fontStyle: 'italic',
          ...style
        }}
        className={`${cx.balloon} ${className} ${cx['from-right']} `}>
        Alright...
      </div>
    );
  }
}

const SomethingAboutMe = ({className}) => (
  <div className={className}>
    <h3 className="text-lg">Something about me</h3>
    <p className="text-sm xl:text-base">
      <span className="line-through">PhD student</span>, orginally from Germany,
      ({timeYear.count(birthdate, todayDate)} years{' and '}
      me
      {timeMonth.count(thisYearBdate, todayDate) - 1} months old) for{' '}
      {timeYear.count(BelgiumArrivalDate, todayDate)} years now. Getting my head
      around research, programming and languages. Drinking cappucino in the
      morning, jogging and doing Diss-co music in the evening. As part of my day
      job I work on data visualization and educational games!
    </p>
  </div>
);

const MyTable = ({className}) => (
  <table className={`${className} text-sm lg:text-base`}>
    <tr>
      <th className="text-base w-1/2">
        <div>
          <div>__Day__ </div>
          <span role="img" aria-label="emoji" className={cx.emoji}>
            🌇
          </span>
        </div>
      </th>
      <th>
        <div>
          <div>**Night**</div>{' '}
          <span role="img" aria-label="emoji" className={cx.emoji}>
            🌃
          </span>
        </div>
      </th>
    </tr>
    <tr>
      <td>
        <div>
          <div>Gazing at </div>
          <div role="img" aria-label="emoji" className={cx.emoji}>
            💻
          </div>
        </div>
      </td>
      <td>
        <div>
          <span role="img" aria-label="emoji" className={cx.emoji}>
            🏃
          </span>{' '}
          <span>in park</span>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          <span className="mr-1">Visualizing data </span>
          <span role="img" aria-label="emoji" className={cx.emoji}>
            📊
          </span>
        </div>{' '}
      </td>
      <td>
        <div>
          <img
            className="mr-1"
            alt="headphones"
            style={{width: '33px', height: '33px'}}
            src={headphonesIcon}
          />{' '}
          <img
            className="mr-1"
            alt="mixing"
            style={{width: '33px', height: '33px'}}
            src={vinylIcon}
          />
          <div className="pl-1 pr-1">music</div>
          <span role="img" aria-label="emoji" className={cx.emoji}>
            😎
          </span>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          lost in hyperspace
          <img
            style={{width: '33px', height: '33px'}}
            alt="astro"
            src={astroIcon}
          />
        </div>
      </td>
      <td>scratching my head about real life </td>
    </tr>
    <tr>
      <td>
        <div className="">
          <span>fiddling with </span>
          <img
            alt="js"
            src={jsLogo}
            style={{
              width: '22px',
              height: '22px',
              verticalAlign: 'top'
            }}
          />
          <img
            alt="react"
            src={reactLogo}
            style={{
              width: '22px',
              height: '22px',
              verticalAlign: 'top'
            }}
          />
          <span>and</span>
          <img
            src={d3Logo}
            alt="d3"
            style={{
              width: '22px',
              height: '22px',
              verticalAlign: 'top'
            }}
          />
        </div>
      </td>
      <td>learning French and Dutch, forgetting German</td>
    </tr>
    <tr>
      <td>
        <div>
          <img
            style={{width: '33px', height: '33px'}}
            alt="coffee"
            src={coffeeIcon}
          />{' '}
          <span>Bonjour</span>
        </div>
      </td>
      <td>
        <div>
          <img
            style={{width: '33px', height: '33px'}}
            alt="beer"
            src={beerIcon}
          />{' '}
          <span>Prost!</span>
        </div>
      </td>
    </tr>
  </table>
);
const Home = props => {
  const {width, height, picDim} = props;
  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden p-3">
      <div className={`block ${cx.header}`}>
        <div className={`${cx.branding} font-mono lg:p-8 `}>
          <div className="lg:flex mb-12 sm:mb-0 flex-col justify-center items-center">
            <div
              style={{right: 0}}
              className={clsx(
                cx.portrait,
                `flex md:pr-8 justify-end items-center md:items-start block lg:absolute lg:mt-0 mb-6 lg:mb-0`,
              )}>
              <Tooltip
                className="lg:-mt-1 mr-2"
                style={{transform: 'translateY(0px)'}}
              />
              <div className={cx.polaroid}>
                <PixelPic
                  width={110}
                  height={130}
                  pixelSize={picDim.pixelSize}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="mb-2 text-lg ">Vrije Universiteit Brussel</h2>
              <h1 className="mb-2 text-4xl p-1 border-black border-b-4 border-t-4 flex-no-grow">
                Jan Maushagen
              </h1>
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex flex-wrap  lg:flex-no-wrap flex-grow ">
        <div
          className="flex flex-col justify-between sm:w-full md:w-full"
          style={{flex: '0 0 50%'}}>
          <SomethingAboutMe className="text-base mb-5 /4 pr-4 md:w-full md:pr-0" />
          <MyTable className={`mb-auto ${cx.myTable}`} />
        </div>
        <div className="">
          <h3 className="mt-3 text-lg sm:mt-0">Interests</h3>
          <AboutVis className="" width={width} style={{height: 509}} />
        </div>
      </div>
    </div>
  );
};
export default Home;
