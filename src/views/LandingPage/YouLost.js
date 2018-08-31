import React from 'react';

const YouLost = () => {
  return (
    <div className='lost'>
      <h1>YOU LOST</h1>
      <a href="/">Try Again: (normal difficulty)</a>
      <a href="/easy">Too hard?: (easy difficulty)</a>
    </div>
  );
};

export default YouLost;
