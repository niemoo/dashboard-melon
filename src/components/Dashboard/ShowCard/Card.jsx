import React from 'react';

const Card = ({ title, total, icon, bgColor = 'bg-white', border = 'border-black', textColorTitle = 'text-gray-600', textColor = 'text-black' }) => {
  return (
    <>
      <div className={`flex justify-between p-3 mb-5 border border-black rounded-md md:w-1/5 shadow-md ${bgColor}`}>
        <div className="">
          <p className={`text-xs font-medium ${textColorTitle}`}>{title}</p>
          <p className={`text-md font-semibold mt-1 ${textColor}`}>{total}</p>
        </div>
        <div className={`my-auto py-1 px-2 border ${border} rounded-full`}>{icon}</div>
      </div>
    </>
  );
};

export default Card;
