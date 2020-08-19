import React, {useEffect} from 'react';

import webkitLineClamp from 'webkit-line-clamp';

const Description = ({children, className, style, lineNum = null}) => {
  const refDescr = React.createRef();
  useEffect(() => {
    webkitLineClamp(refDescr.current, lineNum);
  });

  return (
    <div
      dangerouslySetInnerHTML={{__html: children}}
      ref={refDescr}
      className={`${className} font-mono`}
      style={style}
    />
  );
};

export default Description;
