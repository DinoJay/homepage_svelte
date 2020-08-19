import React, {useState, useEffect} from 'react';
import FpsCtrl from './fpsCtrl';

export default function Loading(props) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const fp = new FpsCtrl(1, () => {
      setStep(st => (st + 1) % 3);
    });
    fp.start();

    return () => fp.pause();
  }, []);

  const arr = new Array(step).fill('a');
  return (
    <div {...props}>
      <h1 className="w-64 flex marker">
        <div>Loading</div>
        <span>
          {arr.map(() => (
            <span>.</span>
          ))}
        </span>
      </h1>
    </div>
  );
}
