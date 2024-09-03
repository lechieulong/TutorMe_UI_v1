import PropTypes from "prop-types";

const SubjectListCard = ({ image, title }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg w-full sm:max-w-[140px] md:max-w-[180px] lg:max-w-[260px] shadow-md overflow-hidden p-4 transition-shadow duration-300 ease-in-out hover:shadow-2xl">
      <div className="flex flex-col items-center">
        <img
          src={image}
          alt="pic"
          className="w-full h-[100px] object-cover border border-gray-300 rounded p-2"
        />
        <p className="text-black text-center font-bold mt-2">{title}</p>
      </div>
    </div>
  );
};

SubjectListCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SubjectListCard;
