import React from 'react';
import AutoCardGroup from '../../components/Control/Auto/AutoCardGroup';
import ManualCardGroup from '../../components/Control/Manual/ManualCardGroup';

const Control = () => {
  return (
    <>
      <div className="h-screen p-10 md:ml-64 w-full bg-gradient-to-b from-green-300 to-white">
        <p className="font-semibold">Control</p>
        <hr className="mb-4 w-20" />
        <AutoCardGroup />
        <ManualCardGroup />
      </div>
    </>
  );
};

export default Control;