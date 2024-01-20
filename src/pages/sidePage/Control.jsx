import React from 'react';
import { useState } from 'react';
import AutoCardGroup from '../../components/Control/Auto/AutoCardGroup';
import ManualCardGroup from '../../components/Control/Manual/ManualCardGroup';
import SetPPM from '../../components/Control/SetPPM/SetPPM';

const Control = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-screen p-10 md:ml-48 w-full bg-gradient-to-b from-green-300 to-white">
        <p className="font-semibold">Control</p>
        <hr className="mb-4 w-20" />
        <div className="flex justify-center">
          <SetPPM />
        </div>
        <AutoCardGroup />
        <ManualCardGroup />
      </div>
    </>
  );
};

export default Control;
