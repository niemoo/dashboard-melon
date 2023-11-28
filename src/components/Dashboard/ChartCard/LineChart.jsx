import { React, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import mqtt from 'mqtt';
import DummyData from '../../../data/DummyData';

const LineChart = () => {
  const [ppmArray, setPPMArray] = useState([]);
  const uniqueTimes = new Set(); // Set to keep track of unique time values

  useEffect(() => {
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

    client.subscribe('sensor/ppm');

    client.on('connect', () => {
      // console.log('Connected to mqtt server');
    });

    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
      client.end();
    });

    const fetchData = () => {
      client.on('message', (topic, message) => {
        const parsedData = JSON.parse(message.toString());

        // Check if data with the same time already exists in uniqueTimes Set
        if (!uniqueTimes.has(parsedData.time)) {
          // If not, add the time to the Set and update ppmArray
          uniqueTimes.add(parsedData.time);

          // Adjust the time by adding 6 hours
          const now = new Date();
          const adjustedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

          // Add adjustedTime to parsedData
          const dataWithAdjustedTime = { ...parsedData, adjustedTime };

          setPPMArray((prevPPMArray) => [...prevPPMArray, dataWithAdjustedTime]);
        }
      });
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Clear the interval and close the MQTT connection on component unmount
    return () => {
      clearInterval(interval);
      client.end();
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  const adjustTime = (originalTime) => {
    const arrayWaktu = originalTime.split(':');
    let jam = parseInt(arrayWaktu[0]) + 7;

    if (jam >= 24) {
      jam -= 24;
    }

    arrayWaktu[0] = jam;
    const adjustedTime = arrayWaktu.join(':');
    return adjustedTime;
  };

  // const datas = {
  //   labels: DummyData.map((data) => `Pukul ${data.pukul}`),
  //   datasets: [
  //     {
  //       label: 'ppm',
  //       data: DummyData.map((data) => data.ppm),
  //       fill: false,
  //       backgroundColor: ['#9FBB73'],
  //       borderColor: 'black',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const datas = {
    labels: ppmArray.map((data) => `Pukul ${data.adjustedTime}`),
    datasets: [
      {
        label: 'ppm',
        data: ppmArray.map((data) => data.ppm_value),
        fill: false,
        backgroundColor: ['#9FBB73'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="w-full p-5 border border-black shadow-md bg-white rounded-md">
        <div className="mb-2">
          <p className="text-xs text-gray-600">OVERVIEW</p>
          <h1 className="text-2xl font-semibold">PPM</h1>
        </div>
        <Line
          height={100}
          data={datas}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
            scales: {
              y: {
                grid: {
                  drawBorder: false,
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  borderDash: [5, 5],
                },
                ticks: {
                  display: true,
                  padding: 10,
                  color: '#b2b9bf',
                  font: {
                    size: 10,
                    family: 'Poppins',
                    style: 'normal',
                    lineHeight: 1,
                  },
                },
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                  borderDash: [5, 5],
                },
                ticks: {
                  display: true,
                  color: '#b2b9bf',
                  padding: 10,
                  font: {
                    size: 10,
                    family: 'Poppins',
                    style: 'normal',
                    lineHeight: 5,
                  },
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default LineChart;
