import React from "react";

const ExamCard = ({ title, attempts, duration, level }) => (
  <div className="bg-white shadow-md rounded-lg p-4 m-4 w-80">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-500 mb-2">+ {attempts} lượt làm bài</p>
        <p className="text-gray-500">Thời gian: {duration} phút</p>
      </div>
      <div className="bg-blue-500 text-white rounded-full px-2 py-1">
        {level}
      </div>
    </div>
    <button className="mt-4 flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
      <i className="fas fa-arrow-right"></i> Vào thi ngay
    </button>
  </div>
);

const TestList = () => (
  <div className="flex flex-wrap justify-center items-center bg-gray-100 min-h-screen">
    <ExamCard title="Đề thi thử số 3" attempts="4229" duration="145" level="N3" />
    <ExamCard title="Đề thi thử số 2" attempts="2201" duration="145" level="N3" />
    <ExamCard title="Đề thi thử số 1" attempts="2851" duration="145" level="N3" />
  </div>
);

export default TestList;