import React from 'react';
import LogoTechnoPark from '../../assets/ugtechnopark.png';
import LogoKampusMerdeka from '../../assets/kampusmerdeka.png';
import LogoUG from '../../assets/ug.png';
import LogoKartanagari from '../../assets/kartanagari.png';

const AboutCard = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-center gap-20 mt-64">
          <div className="pt-5">
            <img src={LogoKampusMerdeka} className="w-40" />
          </div>
          <div className="pt-5">
            <img src={LogoKartanagari} className="w-40" />
          </div>
          <div className="pt-8">
            <img src={LogoTechnoPark} className="w-40" />
          </div>
          <div>
            <img src={LogoUG} className="w-32" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCard;
