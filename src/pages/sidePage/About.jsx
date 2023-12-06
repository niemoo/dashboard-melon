import React from 'react';
import AboutCard from '../../components/About/AboutCard';

const Setting = () => {
  return (
    <>
      <div className="h-screen p-10 md:ml-48 w-full bg-gradient-to-b from-green-300 to-white">
        <p className="font-semibold">About</p>
        <hr className="mb-4 w-20" />
        <AboutCard />
      </div>
    </>
  );
};

export default Setting;
