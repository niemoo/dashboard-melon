import { React, useState, useEffect } from 'react';
import mqtt from 'mqtt';
import axios from 'axios';
import SetCard from './SetCard';

const SetCardGroup = () => {
  const [isLoadingTanam, setIsLoadingTanam] = useState(false);
  const [isLoadingPanen, setIsLoadingPanen] = useState(false);
  const [tanam, setTanam] = useState();
  const [panen, setPanen] = useState();
  let client;

  const initialConnectionOptions = {
    protocol: 'wss',
    host: 'b579eab42dbe4d60a49f09a4f513b74d.s1.eu.hivemq.cloud',
    clientId: 'test',
    port: 8884,
    username: 'bisaa',
    password: 'Yabisadong11',
  };

  useEffect(() => {
    // Connect to MQTT on component mount
    client = mqtt.connect(initialConnectionOptions);

    // Handle connection events
    client.on('connect', () => {
      console.log('MQTT connected');
    });

    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
      client.end();
    });

    return () => {
      // Disconnect from MQTT on component unmount
      if (client) {
        client.end();
      }
    };
  }, []);

  const mqttPublish = () => {
    const client = mqtt.connect(initialConnectionOptions);
    client.on('connect', () => {
      client.publish('tds/sensor/ppm-value', 650, { qos: 0 }, (error) => {
        if (error) {
          console.log('Publish error: ', error);
        }
        client.end();
      });
    });
  };

  const handleTanamChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    // Check if the input value is greater than or equal to 0
    if (inputValue >= 0) {
      setTanam(inputValue);
    }
  };

  const handlePanenChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    // Check if the input value is greater than or equal to 0
    if (inputValue >= 0) {
      setPanen(inputValue);
    }
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
      }, 3000);
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
      }, 3000);
    }
  };

  return (
    <>
      <div className="md:flex justify-between md:mt-0 mt-5 md:space-x-5 w-full">
        <SetCard titleCard="Sedang Ditanam" titleTombol="SUBMIT" onChange={handleTanamChange} onClick={handleSubmitTanam} disabled={isLoadingTanam} />
        <SetCard titleCard="Telah Dipanen" titleTombol="SUBMIT" onChange={handlePanenChange} onClick={handleSubmitPanen} disabled={isLoadingPanen} />
        <SetCard titleCard="Proses Semai" titleTombol="SUBMIT" />
      </div>
    </>
  );
};

export default SetCardGroup;
