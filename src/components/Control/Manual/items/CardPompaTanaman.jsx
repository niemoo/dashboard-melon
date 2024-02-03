import axios from 'axios';
import { React, useState, useEffect } from 'react';
import ControlManualCard from '../ControlManualCard';

const CardPompaTanaman = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [airKeluarRecord, setAirKeluarRecord] = useState();
  const [endTime, setEndTime] = useState();

  const getAirKeluar = async () => {
    try {
      const resAirKeluar = await axios.get('http://localhost:8080/cek_pupuk');
      const airKeluarArray = resAirKeluar.data;

      if (airKeluarArray && airKeluarArray.length > 0) {
        const lastRecord = airKeluarArray[airKeluarArray.length - 1];
        setAirKeluarRecord(lastRecord);
      }
    } catch (err) {
      console.error('Error fetching pupuk data:', err);
    }
  };

  const checkTime = () => {
    if (airKeluarRecord) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const formattedRealTime = parseInt(formattedTime.replace(':', '')) || 0;
      const formattedStartTime = parseInt(airKeluarRecord?.start_time?.replace(':', '')) || 0;
      const formattedEndTime = parseInt(airKeluarRecord?.end_time?.replace(':', '')) || 0;

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
      await getAirKeluar();
      checkTime();
    };

    fetchData(); // Initial call
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array for useEffect

  return (
    <>
      <ControlManualCard title="Pompa Tanaman" disabled={isDisabled} url="http://localhost:8080/controllers/air-keluar/manual/state" path_subscribe="controller/air-keluar-tanaman" />
    </>
  );
};

export default CardPompaTanaman;
