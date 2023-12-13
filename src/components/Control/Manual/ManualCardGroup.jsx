import { React, useState } from 'react';
import ControlManualCard from './ControlManualCard';
import CardPompaAir from './items/CardPompaAir';
import CardPompaTanaman from './items/CardPompaTanaman';
import CardPupuk from './items/CardPupuk';
import { Alert } from '@material-tailwind/react';

const ManualCardGroup = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="mt-20">
        <p className="text-sm font-semibold">MANUAL</p>
        <hr className="mt-1 mb-3 w-20" />

        <div className="md:flex justify-between gap-5 mt-5">
          <CardPupuk />
          <CardPompaAir />
          <CardPompaTanaman />
          <ControlManualCard title="Ph Up" />
          <ControlManualCard title="Ph Down" />
        </div>
        <div className="fixed bottom-0 right-0 p-4 w-fit">
          <Alert
            open={open}
            onClose={() => setOpen(false)}
            // Your other Alert props
            className=""
          >
            Pompa sedang menyala
          </Alert>
        </div>
      </div>
    </>
  );
};

export default ManualCardGroup;
