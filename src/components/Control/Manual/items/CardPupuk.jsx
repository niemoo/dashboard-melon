import axios from 'axios';
import { React, useState, useEffect } from 'react';
import ControlManualCard from '../ControlManualCard';
import mqtt from 'mqtt';

const CardPupuk = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [lastPupukRecord, setLastPupukRecord] = useState();
  const [endTime, setEndTime] = useState();

  const getPupuk = async () => {
    try {
      const resPupuk = await axios.get('http://localhost:8080/cek_pupuk');
      const pupukArray = resPupuk.data;

      if (pupukArray.length > 0) {
        const lastRecord = pupukArray[pupukArray.length - 1];
        setLastPupukRecord(lastRecord);
      }
    } catch (err) {
      console.error('Error fetching pupuk data:', err);
    }
  };

  const checkTime = () => {
    if (lastPupukRecord) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Convert formatted time to integer
      const formattedRealTime = parseInt(formattedTime.replace(':', ''));
      const formattedStartTime = parseInt(lastPupukRecord?.start_time.replace(':', ''));
      const formattedEndTime = parseInt(lastPupukRecord?.end_time.replace(':', ''));

      setEndTime(formattedEndTime);

      if (formattedStartTime <= formattedRealTime && formattedRealTime < endTime) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPupuk();
      checkTime();
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  });
  return (
    <>
      <ControlManualCard title="Pompa Pupuk" disabled={isDisabled} url="http://localhost:8080/controllers/pupuk/manual/state" path_subscribe="controller/pupuk" />
    </>
  );
};

export default CardPupuk;
