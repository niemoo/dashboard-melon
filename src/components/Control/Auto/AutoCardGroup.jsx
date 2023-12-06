import { React, useState } from 'react';
import ControlAutoCard from './ControlAutoCard';
import CardPompaAir from './items/CardPompaAir';
import CardPompaTanaman from './items/CardPompaTanaman';
import CardPupuk from './items/CardPupuk';

const AutoCardGroup = () => {
  return (
    <>
      <div className="mt-20">
        <p className="text-sm font-semibold">OTOMATIS</p>
        <hr className="mt-1 mb-3 w-20" />
        <div className="md:flex flex-wrap justify-center gap-20 mt-5">
          <CardPupuk />
          <CardPompaAir />
          <CardPompaTanaman />
          <ControlAutoCard title="Ph Up " />
          <ControlAutoCard title="Ph Down" />
        </div>
      </div>
    </>
  );
};

export default AutoCardGroup;
