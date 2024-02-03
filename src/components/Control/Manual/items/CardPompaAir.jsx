import axios from 'axios';
import { React, useState, useEffect } from 'react';
import ControlManualCard from '../ControlManualCard';

const CardPompaAir = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [airMasukRecord, setAirMasukRecord] = useState();
  const [endTime, setEndTime] = useState();

  const getPupuk = async () => {
    try {
      const resPupuk = await axios.get('http://localhost:8080/cek_air_masuk');
      const pupukArray = resPupuk.data;

      if (pupukArray.length > 0) {
        const lastRecord = pupukArray[pupukArray.length - 1];
        setAirMasukRecord(lastRecord);
      }
    } catch (err) {
      console.error('Error fetching air masuk data:', err);
    }
  };

  const checkTime = () => {
    if (airMasukRecord) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Convert formatted time to integer
      const formattedRealTime = parseInt(formattedTime.replace(':', ''));
      const formattedStartTime = parseInt(airMasukRecord?.start_time.replace(':', ''));
      const formattedEndTime = parseInt(airMasukRecord?.end_time.replace(':', ''));

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
      <ControlManualCard title="Pompa Air" disabled={isDisabled} url="http://localhost:8080/controllers/air-masuk/manual/state" path_subscribe="controller/air-masuk-tandon" />
    </>
  );
};

export default CardPompaAir;
