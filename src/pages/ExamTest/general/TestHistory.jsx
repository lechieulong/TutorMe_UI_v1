import React from "react";

const TestHistory = () => {
  const testHistoryData = [
    {
      id: 1,
      date: "2024-10-01",
      scores: {
        listening: 7.5,
        reading: 8.0,
        writing: 6.5,
        speaking: 7.0,
      },
      overallBand: 7.3,
    },
    {
      id: 2,
      date: "2024-11-15",
      scores: {
        listening: 8.0,
        reading: 7.5,
        writing: 6.0,
        speaking: 7.5,
      },
      overallBand: 7.3,
    },
    {
      id: 3,
      date: "2024-11-20",
      scores: {
        listening: 7.0,
        reading: 8.5,
        writing: 7.0,
        speaking: 6.5,
      },
      overallBand: 7.3,
    },
  ];

  return (
    <div className="  p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="card card-bordered bg-base-100 shadow-xl">
          <header className="card-header bg-accentGreen text-white py-4 px-6 rounded-t-lg">
            <h1 className="text-2xl font-bold">IELTS Test History</h1>
            <p className="text-sm">Your past test scores at a glance</p>
          </header>
          <div className="card-body overflow-x-auto">
            <table className="table w-full table-zebra text-left">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="px-4 py-3">Test Date</th>
                  <th className="px-4 py-3">Listening</th>
                  <th className="px-4 py-3">Reading</th>
                  <th className="px-4 py-3">Writing</th>
                  <th className="px-4 py-3">Speaking</th>
                  <th className="px-4 py-3">Overall Band</th>
                </tr>
              </thead>
              <tbody>
                {testHistoryData.map((test, index) => (
                  <tr
                    key={test.id}
                    className={`${
                      index % 2 === 0 ? "bg-green-50" : "bg-white"
                    } hover:bg-green-100`}
                  >
                    <td className="px-4 py-3">{test.date}</td>
                    <td className="px-4 py-3">{test.scores.listening}</td>
                    <td className="px-4 py-3">{test.scores.reading}</td>
                    <td className="px-4 py-3">{test.scores.writing}</td>
                    <td className="px-4 py-3">{test.scores.speaking}</td>
                    <td className="px-4 py-3 font-bold">
                      {test.overallBand.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="bg-gray-50 py-4 px-6 text-sm text-gray-500 rounded-b-lg">
            Total Tests: {testHistoryData.length}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TestHistory;
