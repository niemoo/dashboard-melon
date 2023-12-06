import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faWater, faLemon, faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import mqtt from 'mqtt';
import Card from '../../components/Dashboard/ShowCard/Card';
import LineChart from '../../components/Dashboard/ChartCard/LineChart';
import Ph from '../../components/Dashboard/ChartCard/Ph';
import SetCardGroup from '../../components/Dashboard/SetCard/SetCardGroup';

const Dashboard = () => {
  const [tanam, setTanam] = useState();
  const [panen, setPanen] = useState();
  const [waterLevel, setWaterLevel] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      // Use an async function for the axios request
      const fetchData = async () => {
        try {
          const resTanam = await axios.get('http://localhost:8080/users/input/planted');
          const resPanen = await axios.get('http://localhost:8080/users/input/harvested');
          setTanam(resTanam.data[0].planted);
          setPanen(resPanen.data[0].harvested);
        } catch (err) {
          console.error(err);
        }
      };

      const initialConnectionOptions = {
        protocol: 'wss',
        host: 'b579eab42dbe4d60a49f09a4f513b74d.s1.eu.hivemq.cloud',
        clientId: 'test',
        port: 8884,
        username: 'bisaa',
        password: 'Yabisadong11',
      };

      const connect = (url, options) => {
        const client = mqtt.connect(url, options);
        client.subscribe('sensor/water-level'); // subscribe mqtt server

        // Handle connection events
        client.on('connect', () => {
          // setMqttConnected(true); // MQTT connected
        });

        client.on('error', (err) => {
          console.error('MQTT connection error:', err);
          // setMqttConnected(false); // MQTT not connected
          client.end();
        });

        client.on('message', (topic, message) => {
          // called each time a message is received
          const parsedData = JSON.parse(message.toString());
          setWaterLevel(parsedData.water_level);
          // console.log('Received message:', topic, parsedData);
        });
      };

      // Jalankan koneksi sekali menggunakan initialConnectionOptions
      connect(`${initialConnectionOptions.protocol}://${initialConnectionOptions.host}:${initialConnectionOptions.port}/mqtt`, {
        clientId: initialConnectionOptions.clientId,
        username: initialConnectionOptions.username,
        password: initialConnectionOptions.password,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
      });
      fetchData(); // Call the async function
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [waterLevel]);

  return (
    <>
      <div className="h-screen overflow-auto p-10 md:ml-48 bg-gradient-to-b from-green-300 to-white w-full">
        <p className="font-semibold">Dashboard</p>
        <hr className="mb-5 w-24" />
        <div className="md:flex flex-wrap md:justify-between mt-10">
          <Card title="Sedang Ditanam" total={tanam} icon={<FontAwesomeIcon icon={faSeedling} style={{ color: '#18c32c' }} />} />
          <Card title="Telah Dipanen" total={panen} icon={<FontAwesomeIcon icon={faLemon} style={{ color: '#18c32c' }} />} />
          <Card
            title="Water Level"
            total={waterLevel == '0' ? 'Tidak Aman' : 'Aman'}
            icon={<FontAwesomeIcon icon={faWater} style={{ color: waterLevel === '0' ? '#ffffff' : '#1e3e76' }} />}
            bgColor={waterLevel == '0' ? 'bg-red-500' : 'bg-white'}
            textColorTitle={waterLevel == '0' ? 'text-white' : 'text-gray-600'}
            textColor={waterLevel == '0' ? 'text-white' : 'text-black'}
            border={waterLevel == '0' ? 'border-white' : 'border-black'}
          />
          <Card title="Proses Semai" total="50" icon={<FontAwesomeIcon icon={faHandHoldingDroplet} style={{ color: '#18c32c' }} />} />
        </div>
        <LineChart />
        <div className="md:flex mt-5 md:space-x-5">
          {/* <Ph phValue="7" /> */}
          <SetCardGroup />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
