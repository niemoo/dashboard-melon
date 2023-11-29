import { useState } from 'react';
import axios from 'axios';
import ControlAutoCard from '../ControlAutoCard';

const CardPupuk = () => {
  const [start_time, setStartTime] = useState();
  const [end_time, setEndTime] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmitPupuk = async () => {
    try {
      await axios.post('http://localhost:8080/controllers/pupuk/auto/range-time', { start_time: start_time, end_time: end_time });
    } catch (err) {
      console.error(`Error : ${err}`);
    }
  };
  return (
    <>
      <ControlAutoCard title="Pompa Pupuk" onChangeStartTime={handleChangeStartTime} onChangeEndTime={handleChangeEndTime} onClick={handleSubmitPupuk} disabled={isDisabled} />
    </>
  );
};

export default CardPupuk;
