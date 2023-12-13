import React from 'react';
import { useState } from 'react';
import AutoCardGroup from '../../components/Control/Auto/AutoCardGroup';
import ManualCardGroup from '../../components/Control/Manual/ManualCardGroup';

const Control = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-screen p-10 md:ml-48 w-full bg-gradient-to-b from-green-300 to-white">
        <p className="font-semibold">Control</p>
        <hr className="mb-4 w-20" />
        <AutoCardGroup />
        <ManualCardGroup />
      </div>
    </>
  );
};

export default Control;
