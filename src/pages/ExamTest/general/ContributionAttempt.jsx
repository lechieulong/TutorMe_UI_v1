import React, { useState, useEffect } from "react";
import img from "../../../assets/images/pull-shark.png";

const ContributionAttempt = () => {
  const contributeTaketest = [
    { id: 1, testDate: "2024-11-23", attempNumber: 2 },
    { id: 2, testDate: "2024-11-21", attempNumber: 9 },
  ];

  const yearsOfTakeTest = [
    {
      id: 1,
      year: 2023,
      totalAttempt: 12, // Total attempts in 2023
    },
    {
      id: 2,
      year: 2024,
      totalAttempt: 18, // Total attempts in 2024
    },
    {
      id: 3,
      year: 2025,
      totalAttempt: 25, // Total attempts in 2025
    },
  ];

  const [selectedYear, setSelectedYear] = useState(2024);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const daysInYear = isLeapYear(selectedYear) ? 366 : 365; // Adjust based on leap year

  const [contributions, setContributions] = useState(Array(daysInYear).fill(0)); // Dynamically adjust to 365 or 366 days

  const months = [
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];

  const weeks = Array(7).fill(1);

  useEffect(() => {
    const updatedContributions = Array(daysInYear).fill(0); // Reset contributions for the new year

    contributeTaketest.forEach((test) => {
      const testDate = new Date(test.testDate);

      if (testDate.getFullYear() === selectedYear) {
        const startOfYear = new Date(testDate.getFullYear(), 0, 0);
        const dayOfYear = Math.floor(
          (testDate - startOfYear) / (1000 * 60 * 60 * 24)
        );

        if (dayOfYear < updatedContributions.length) {
          updatedContributions[dayOfYear] = test.attempNumber;
        }
      }
    });

    setContributions(updatedContributions); // Update the state with new contributions data
  }, [selectedYear]); // Recalculate contributions when selectedYear changes

  const getColor = (value) => {
    if (value > 4) {
      return "bg-green-700";
    }
    switch (value) {
      case 1:
        return "bg-green-100";
      case 2:
        return "bg-green-300";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-green-700";
      default:
        return "bg-gray-200"; // Default color for no contribution
    }
  };

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold mb-6">Attempt to take test</h1>

      <div className="flex gap-10">
        <div className="text-center ">
          <h3 className="font-semibold ">Achievements</h3>
          <div className="w-40">
            <img src={img} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-around ml-10 text-sm text-gray-600 mb-2">
            {/* Display months */}
            {months.map((month, index) => (
              <span key={index} className="w-8 text-center">
                {month}
              </span>
            ))}
          </div>

          {/* Main Grid */}
          <div className="flex gap-4">
            {/* Display weekday names */}
            <div className="flex flex-col items-center gap-1">
              {weeks.map((_, index) => (
                <span key={index} className="text-[10px] h-4 w-4 text-gray-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              ))}
            </div>

            {/* Render calendar days */}
            <div className="flex gap-1">
              {Array(
                Math.ceil(daysInYear / 7)
              ) /* Dynamically adjust based on days in year */
                .fill(0)
                .map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array(7) /* 7 days per week */
                      .fill(0)
                      .map((_, dayIndex) => {
                        const index = weekIndex * 7 + dayIndex + 1; // Get index for contribution block
                        if (index >= daysInYear) return null; // Avoid rendering invalid days
                        const value = contributions[index]; // Get the attempt value from contributions
                        return (
                          <div
                            key={dayIndex}
                            className={`w-4 h-4 rounded-sm ${getColor(value)}`}
                          />
                        );
                      })}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6 gap-2 items-center">
          {/* Render buttons dynamically based on yearsOfTakeTest data */}
          {yearsOfTakeTest.map((yearData) => (
            <button
              key={yearData.id}
              onClick={() => setSelectedYear(yearData.year)}
              className={`px-5 py-1 rounded ${
                yearData.year === selectedYear
                  ? "bg-green-500 text-white"
                  : "text-gray-600"
              }`}
            >
              {yearData.year}
            </button>
          ))}
        </div>
      </div>

      {/* <div className="flex gap-2 items-center mt-2">
        <p>Less</p>
        <div className="flex gap-1">
          {[1, 2, 4, 5].map((i) => {
            // Determine the background color based on the value of i
            let bgColor;
            if (i === 1) {
              bgColor = "bg-green-100"; // Lighter green
            } else if (i === 2) {
              bgColor = "bg-green-300"; // Medium green
            } else if (i === 4) {
              bgColor = "bg-green-500"; // Darker green
            } else if (i === 5) {
              bgColor = "bg-green-700"; // Even darker green
            }

            return (
              <div className="flex" key={i}>
                <div className={`w-4 h-4 rounded-sm ${bgColor}`} />
              </div>
            );
          })}
        </div>
        <p>More</p>
      </div> */}
    </div>
  );
};

export default ContributionAttempt;
