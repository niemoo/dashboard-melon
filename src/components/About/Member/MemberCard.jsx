const MemberCard = ({ image, nama, prodi }) => {
  return (
    <>
      <div className="bg-white p-5 rounded-md md:w-96 w-full flex">
        <img src={image} className="w-20 mr-7" />
        <div className="my-auto">
          <h1 className="font-medium text-lg">{nama}</h1>
          <p className="font-light text-sm text-gray-700">{prodi}</p>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
