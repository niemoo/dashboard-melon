import ControlManualCard from './ControlManualCard';
import CardPompaAir from './items/CardPompaAir';
import CardPompaTanaman from './items/CardPompaTanaman';
import CardPupuk from './items/CardPupuk';
import AlertContainer from './AlertContainer';

const ManualCardGroup = () => {
  return (
    <>
      <div className="mt-20">
        <p className="text-sm font-semibold">MANUAL</p>
        <hr className="mt-1 mb-3 w-20" />

        <div className="md:flex justify-center gap-20 mt-5">
          <CardPupuk />
          <CardPompaAir />
          <CardPompaTanaman />
          {/* <ControlManualCard title="Ph Up" />
          <ControlManualCard title="Ph Down" /> */}
        </div>
        {/* <div className="fixed bottom-0 right-0 p-4 w-fit">
          <AlertContainer />
        </div> */}
      </div>
    </>
  );
};

export default ManualCardGroup;
