import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const ControlManualCard = ({ title, disabled, url }) => {
  const [isChecked, setIsChecked] = useState(false);

  // Fungsi untuk menangani perubahan nilai checkbox
  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);

    // If the checkbox is checked, send a post request with the number 1 to the database
    if (isChecked == false) {
      try {
        const res = await axios.post(url, { state: 1 });
        // Handle the successful response if needed
      } catch (error) {
        // Handle the error if needed
        console.error('Error sending data to the server', error);
      }
    } else {
      try {
        const res = await axios.post(url, { state: 0 });
        // Handle the successful response if needed
      } catch (error) {
        // Handle the error if needed
        console.error('Error sending data to the server', error);
      }
    }
  };

  return (
    <div className={`flex justify-center items-center p-3 mb-5 border border-black rounded-md w-1/5 shadow-md bg-white`}>
      <div className="text-center">
        <p className="text-sm font-medium">{title}</p>
        <hr className="mt-1 mb-3 mx-auto w-16" />
        <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'pointer-events-none' : ''}`}>
          <input type="checkbox" disabled={disabled} checked={isChecked} className="sr-only peer" onChange={handleCheckboxChange} />
          <div
            className={`w-11 h-6 bg-red-500 ${
              disabled ? 'opacity-50' : ''
            } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500`}
          ></div>
        </label>
      </div>
    </div>
  );
};

export default ControlManualCard;
