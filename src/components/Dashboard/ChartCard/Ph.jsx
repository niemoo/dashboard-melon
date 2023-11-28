import React from 'react';

const Ph = ({ phValue }) => {
  return (
    <div className="md:w-2/5 p-5 border bg-white border-black rounded-md shadow-md">
      <p className="text-xs text-gray-600"></p>
      <p className="text-2xl font-semibold ">Ph</p>
      <p className="text-4xl mt-20 font-semibold text-center">{phValue}</p>
    </div>
  );
};

export default Ph;
