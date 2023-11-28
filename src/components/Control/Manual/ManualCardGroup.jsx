import React from 'react';
import ControlManualCard from './ControlManualCard';

const ManualCardGroup = () => {
  return (
    <>
      <div className="mt-20">
        <p className="text-sm font-semibold">MANUAL</p>
        <hr className="mt-1 mb-3 w-20" />
        <div className="md:flex justify-between gap-5 mt-5">
          <ControlManualCard title="Pompa Pupuk" />
          <ControlManualCard title="Pompa Air" />
          <ControlManualCard title="Ph Up" />
          <ControlManualCard title="Ph Down" />
          <ControlManualCard title="Pompa Tanaman" />
        </div>
      </div>
    </>
  );
};

export default ManualCardGroup;
