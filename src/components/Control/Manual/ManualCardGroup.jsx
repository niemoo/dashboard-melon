import axios from 'axios';
import { React, useState, useEffect } from 'react';
import ControlManualCard from './ControlManualCard';

const ManualCardGroup = () => {
  const [isPupuk, setIsPupuk] = useState(false);
  const [lastPupukRecord, setLastPupukRecord] = useState(null);

  useEffect(() => {
    const getPupuk = async () => {
      try {
        const resPupuk = await axios.get('http://localhost:8080/cek_pupuk');
        // Assuming resPupuk.data is an array
        const pupukArray = resPupuk.data;

        if (pupukArray.length > 0) {
          // Get the last element of the array
          const lastRecord = pupukArray[pupukArray.length - 1];
          setLastPupukRecord(lastRecord);
        }
      } catch (err) {
        // Handle errors if needed
        console.error('Error fetching pupuk data:', err);
      }
    };

    // Call the async function
    getPupuk();
  }, []);

  return (
    <>
      <div className="mt-20">
        <p className="text-sm font-semibold">MANUAL</p>
        <hr className="mt-1 mb-3 w-20" />
        {lastPupukRecord && <p>{JSON.stringify(lastPupukRecord)}</p>}
        <div className="md:flex justify-between gap-5 mt-5">
          <ControlManualCard title="Pompa Pupuk" disabled={isPupuk} />
          <ControlManualCard title="Pompa Air" />
          <ControlManualCard title="Ph Up" />
          <ControlManualCard title="Ph Down" />
          <ControlManualCard title="Pompa Tanaman" />
        </div>
      </div>
    </>
  );
};

export default ManualCardGroup;
