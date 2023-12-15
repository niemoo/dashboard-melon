import { React, useState, useEffect } from 'react';
import { Alert } from '@material-tailwind/react';
import axios from 'axios';

const AlertContainer = () => {
  const [open1, setOpen1] = useState(true);
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

  return (
    <>
      <Alert
        open={open1}
        onClose={() => setOpen1(false)}
        // Your other Alert props
        className=""
      >
        Pompa sedang menyala sampai
      </Alert>
    </>
  );
};

export default AlertContainer;
