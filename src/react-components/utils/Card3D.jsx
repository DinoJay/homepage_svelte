import React, {useState, useEffect} from 'react';

import {useTransition, useSpring, animated as a, config} from 'react-spring';

const calc = (x, y) => [
  (y - window.innerHeight / 2) / 70,
  (x - window.innerWidth / 2) / 70,
  1.1
];
const trans = (x, y, s) =>
  `perspective(300px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function Card3D(pr) {
  const {children, disabled, config={}} = pr;
  const [props, set] = useSpring(() => ({
    xys: [0, 1, 1],
    config: {mass: 5, tension: 350, friction: 40, ...config}
  }));

  return (
    <a.div
      className="card shadow-md"
      {...pr}
      onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
      onMouseLeave={() => set({xys: [0, 0, 1]})}
      style={{
        transform: !disabled && props.xys.interpolate(trans),
        ...pr.style
      }}>
      {children}
    </a.div>
  );
}
