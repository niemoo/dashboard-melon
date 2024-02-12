import { Button } from '@material-tailwind/react';
import axios from 'axios';
import mqtt from 'mqtt';
import { useState, useEffect } from 'react';

const SetPPM = () => {
  const [value, setValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState(value[0]);

  const initialConnectionOptions = {
    protocol: 'wss',
    host: 'b579eab42dbe4d60a49f09a4f513b74d.s1.eu.hivemq.cloud',
    clientId: 'test',
    port: 8884,
    username: 'bisaa',
    password: 'Yabisadong11',
  };

  const client = mqtt.connect(`${initialConnectionOptions.protocol}://${initialConnectionOptions.host}:${initialConnectionOptions.port}/mqtt`, {
    clientId: initialConnectionOptions.clientId,
    username: initialConnectionOptions.username,
    password: initialConnectionOptions.password,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jadwal');
        setValue(response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    client.on('connect', () => {
      console.log('Connect for PPM');
    });

    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
      client.end();
    });

    console.log(selectedValue);
    fetchData();
  }, []);

  const handleOnCLick = async () => {
    try {
      client.publish('tds/sensor/ppm-value/set-ppm', `${selectedValue}`, { qos: 1 }, (error) => {
        if (error) {
          console.log('Publish error: ', error);
        } else {
          console.log('Publish PPM success');
        }
      });

      // Handle the successful response if needed
    } catch (error) {
      // Handle the error if needed
      console.error('Error sending data to the server', error);
    }
  };

  return (
    <div className="flex flex-col gap-5 border border-black rounded-md p-5 bg-white w-fit">
      <select className="p-2 rounded-md border border-gray-500">
        <option>Melon</option>
      </select>
      <div className="flex gap-5 items-center">
        <label>PPM Hari ke - </label>
        <select className="p-2 rounded-md border border-gray-500" onChange={(e) => setSelectedValue(e.target.value)}>
          {value.map((data) => (
            <option key={data.id_tanggal}>{`${data.id_tanggal} - ${data.PPM}`}</option>
          ))}
        </select>
      </div>
      <Button className="bg-green-500 hover:bg-green-700" onClick={handleOnCLick}>
        Submit
      </Button>
    </div>
  );
};

export default SetPPM;
