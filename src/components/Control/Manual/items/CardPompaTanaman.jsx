import axios from 'axios';
import { React, useState, useEffect } from 'react';
import ControlManualCard from '../ControlManualCard';

const CardPompaTanaman = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [airKeluar, setAirKeluarRecord] = useState();
  const [endTime, setEndTime] = useState();

  const getAirKeluar = async () => {
    try {
      const resAirKeluar = await axios.get('http://localhost:8080/cek_pupuk');
      const airKeluarArray = resAirKeluar.data;

      if (airKeluarArray.length > 0) {
        const lastRecord = airKeluarArray[airKeluarArray.length - 1];
        setAirKeluarRecord(lastRecord);
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
      await getAirKeluar();
      checkTime();
    };

    // const initialConnectionOptions = {
    //   protocol: 'wss',
    //   host: 'b579eab42dbe4d60a49f09a4f513b74d.s1.eu.hivemq.cloud',
    //   clientId: 'test',
    //   port: 8884,
    //   username: 'bisaa',
    //   password: 'Yabisadong11',
    // };

    // const client = mqtt.connect(`${initialConnectionOptions.protocol}://${initialConnectionOptions.host}:${initialConnectionOptions.port}/mqtt`, {
    //   clientId: initialConnectionOptions.clientId,
    //   username: initialConnectionOptions.username,
    //   password: initialConnectionOptions.password,
    //   clean: true,
    //   reconnectPeriod: 1000,
    //   connectTimeout: 30 * 1000,
    // });

    // // Uncomment the following lines to publish data
    // const payload = 'Your payload data';
    // const qos = 0; // Quality of Service

    // client.publish('sensor/ppm', payload, { qos }, (error) => {
    //   if (error) {
    //     console.log('Publish error: ', error);
    //   }
    // });

    // client.on('connect', () => {
    //   // console.log('Connected to mqtt server');
    // });

    // client.on('error', (err) => {
    //   console.error('MQTT connection error:', err);
    //   client.end();
    // });

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  });
  return (
    <>
      <ControlManualCard title="Pompa Tanaman" disabled={isDisabled} url="http://localhost:8080/controllers/air-keluar/manual/state" />
    </>
  );
};

export default CardPompaTanaman;
