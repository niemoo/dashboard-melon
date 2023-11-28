import React from 'react';
import Tombol from '../../Tombol';

const SetCard = ({ titleCard, titleTombol, onChange, onClick, disabled }) => {
  return (
    <div className="p-5 border bg-white border-black rounded-md md:w-1/5 h-full shadow-md flex flex-col justify-between">
      <div className="text-center">
        <p className="text-sm font-medium">{titleCard}</p>
        <hr className="mt-1 mb-3 mx-auto w-32" />
      </div>
      <div className="flex justify-between">
        {/* Input component with the onChange event handler */}
        <input type="number" className="text-center border w-full border-black rounded-md p-2" onChange={onChange} min="0" />
      </div>
      {/* Tombol component with the onClick event handler */}
      <Tombol title={titleTombol} onClick={onClick} disabled={disabled} />
    </div>
  );
};

export default SetCard;
