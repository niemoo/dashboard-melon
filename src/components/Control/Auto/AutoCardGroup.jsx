import { React, useState } from 'react';
import ControlAutoCard from './ControlAutoCard';

const AutoCardGroup = () => {
  const [start_time, setStartTime] = useState();
  const [end_time, setEndTime] = useState();

  const handleChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <>
      <div className="mt-20">
        <p className="text-sm font-semibold">OTOMATIS</p>
        <hr className="mt-1 mb-3 w-20" />
        {`${start_time}, ${end_time}`}
        <div className="md:flex justify-between gap-5 mt-5">
          <ControlAutoCard title="Pompa Pupuk" onChangeStartTime={handleChangeStartTime} onChangeEndTime={handleChangeEndTime} />
          <ControlAutoCard title="Pompa Air" />
          <ControlAutoCard title="Pompa Tanaman" />
          <ControlAutoCard title="Ph Up " />
          <ControlAutoCard title="Ph Down" />
        </div>
      </div>
    </>
  );
};

export default AutoCardGroup;
