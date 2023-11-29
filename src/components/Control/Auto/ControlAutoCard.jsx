import { React } from 'react';
import Tombol from '../../Tombol';

const ControlAutoCard = ({ title, onChangeStartTime, onChangeEndTime, onClick, disabled }) => {
  return (
    <>
      <div className={`flex justify-center p-3 mb-5 border border-black rounded-md md:w-1/5 shadow-md bg-white`}>
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-sm font-medium">{title}</p>
            <hr className="mt-1 mb-3 mx-auto w-16" />
          </div>
          <div className="px-2 py-1 border border-gray-500 rounded-xl bg-green-500">
            <div className="flex items-center gap-10 justify-between">
              <p className="ml-0 text-white font-medium">start time</p>
              <input type="time" className="w-fit my-1 rounded-md p-1 border border-black" onChange={onChangeStartTime} />
            </div>
            <div className="flex items-center gap-10 justify-between">
              <p className="ml-0 text-white">end time</p>
              <input type="time" className="w-fit my-1 rounded-md p-1 border border-black" onChange={onChangeEndTime} />
            </div>
          </div>
          <Tombol title="SET" className="mt-3 w-24" onClick={onClick} disabled={disabled} />
        </div>
      </div>
    </>
  );
};
{
  /* <input type="number" className="w-16 my-1 rounded-md p-1 text-center border border-black" min="0" onChange={handleMenitChange} />
<p className="py-auto">:</p>
<input type="number" className="w-16 my-1 rounded-md p-1 text-center border border-black" min="0" onChange={handleDetikChange} /> */
}

export default ControlAutoCard;
