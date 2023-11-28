import React from 'react';

import Sidebar from '../components/Sidebar';
import Control from './sidePage/Control';

const Controlling = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Control />
      </div>
    </>
  );
};

export default Controlling;
