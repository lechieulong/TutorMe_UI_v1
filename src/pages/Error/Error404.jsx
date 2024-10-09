import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F2EEE8]">
      <div className="relative bg-white w-72 h-72 border-4 border-[#383A41] rounded-md mt-10 md:mt-24">
        {/* Band */}
        <div className="absolute w-[350px] h-[27px] border-4 border-[#383A41] rounded-md -left-4 top-12 flex flex-col">
          <div className="h-1/3 bg-[#EB6D6D]"></div>
          <div className="h-1/3 bg-white"></div>
          <div className="h-1/3 bg-[#5E7FDC]"></div>
        </div>
        {/* Eyes */}
        <div className="absolute top-32 w-32 flex justify-between mx-auto left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-4 border-[7px] border-[#383A41] border-t-0 rounded-t-[22px]"></div>
          <div className="w-8 h-4 border-[7px] border-[#383A41] border-t-0 rounded-t-[22px]"></div>
        </div>
        {/* Dimples */}
        <div className="absolute top-44 w-44 mx-auto flex justify-between left-1/2 transform -translate-x-1/2">
          <div className="w-2.5 h-2.5 bg-[#EB6D6D]/40 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-[#EB6D6D]/40 rounded-full"></div>
        </div>
        {/* Mouth */}
        <div className="absolute top-52 w-10 h-[5px] bg-[#383A41] rounded-md mx-auto left-1/2 transform -translate-x-1/2"></div>
      </div>

      <h1 className="font-extrabold text-[#383A41] text-3xl md:text-4xl text-center mt-5 md:mt-10">
        Oops! Something went wrong!
      </h1>
      <Link
        className="mt-10 md:mt-16 px-5 py-3 bg-[#5E7FDC] text-white text-center text-lg md:text-xl rounded-md cursor-pointer hover:bg-[#5E7FDC]/80 transition-all"
        to="/"
        type="button"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Error404;
