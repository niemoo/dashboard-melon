import React from 'react';
import ControlManualCard from './ControlManualCard';
import CardPompaAir from './items/CardPompaAir';
import CardPompaTanaman from './items/CardPompaTanaman';
import CardPupuk from './items/CardPupuk';

const ManualCardGroup = () => {
  return (
    <>
      <div className="mt-20">
        <p className="text-sm font-semibold">MANUAL</p>
        <hr className="mt-1 mb-3 w-20" />

        <div className="md:flex justify-between gap-5 mt-5">
          <CardPupuk />
          <CardPompaAir />
          <CardPompaTanaman />
          <ControlManualCard title="Ph Up" />
          <ControlManualCard title="Ph Down" />
        </div>
      </div>
    </>
  );
};

export default ManualCardGroup;
