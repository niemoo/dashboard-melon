import React from 'react';
import LogoTechnoPark from '../../assets/ugtechnopark.png';
import LogoKampusMerdeka from '../../assets/kampusmerdeka.png';
import LogoUG from '../../assets/ug.png';
import LogoKartanagari from '../../assets/kartanagari.png';
import MemberCard from './Member/MemberCard';
import wildan from '../../assets/wildan.png';
import izzan from '../../assets/izzan.png';
import wine from '../../assets/wine.png';
import alif from '../../assets/alif.png';

const AboutCard = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center gap-10 w-1/2">
          <MemberCard image={wildan} nama="Mochammad Wildan Alghifari" prodi="Informatika 2020" />
          <MemberCard image={izzan} nama="Izzan Abdul Aziz" prodi="Informatika 2021" />
          <MemberCard image={wine} nama="Wine Nadira Maulana" prodi="Informatika 2021" />
          <MemberCard image={alif} nama="Alif Dzaky Fatia" prodi="Informatika 2021" />
        </div>
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
