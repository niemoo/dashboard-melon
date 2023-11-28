import { React, useState } from 'react';
import axios from 'axios';
import SetCard from './SetCard';

const SetCardGroup = () => {
  const [isLoadingTanam, setIsLoadingTanam] = useState(false);
  const [isLoadingPanen, setIsLoadingPanen] = useState(false);
  const [tanam, setTanam] = useState();
  const [panen, setPanen] = useState();

  const handleTanamChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    // Check if the input value is greater than or equal to 0
    if (inputValue >= 0) {
      setTanam(inputValue);
    }
    // You might also provide some feedback to the user if the input is not valid.
  };

  const handlePanenChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    // Check if the input value is greater than or equal to 0
    if (inputValue >= 0) {
      setPanen(inputValue);
    }
    // You might also provide some feedback to the user if the input is not valid.
  };

  const handleSubmitTanam = async () => {
    try {
      const resTanam = await axios.post('http://localhost:8080/users/input/planted', { planted: tanam });
      console.log(resTanam);
    } catch (err) {
      console.error(`Error : ${err}`);
    } finally {
      // Set isLoading back to false after the request is complete
      setIsLoadingTanam(true);

      // Disable the button for 5 seconds
      setTimeout(() => {
        setIsLoadingTanam(false);
      }, 3000); // 5000 milliseconds = 5 seconds
    }
  };

  const handleSubmitPanen = async () => {
    try {
      const resPanen = await axios.post('http://localhost:8080/users/input/harvested', { harvested: panen });
      console.log(resPanen);
    } catch (err) {
      console.error(`Error : ${err}`);
    } finally {
      // Set isLoading back to false after the request is complete
      setIsLoadingPanen(true);

      // Disable the button for 5 seconds
      setTimeout(() => {
        setIsLoadingPanen(false);
      }, 3000); // 5000 milliseconds = 5 seconds
    }
  };

  return (
    <>
      <div className="md:flex justify-between md:mt-0 mt-5 md:space-x-5 w-full">
        <SetCard titleCard="Set PPM Harian" titleTombol="SUBMIT" onChange={null} onClick={null} disabled={isLoadingTanam} />
        <SetCard titleCard="Sedang Ditanam" titleTombol="SUBMIT" onChange={handleTanamChange} onClick={handleSubmitTanam} disabled={isLoadingTanam} />
        <SetCard titleCard="Telah Dipanen" titleTombol="SUBMIT" onChange={handlePanenChange} onClick={handleSubmitPanen} disabled={isLoadingPanen} />
        <SetCard titleCard="Proses Semai" titleTombol="SUBMIT" />
      </div>
    </>
  );
};

export default SetCardGroup;
