import React, { useState, useEffect } from "react";
import img from "../../../assets/images/pull-shark.png";
import { Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getTestAnalysisAttempt,
  getAttemptTests,
} from "../../../redux/testExam/TestSlice";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(
  BarElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend
);

const ContributionAttempt = () => {
  const [contributeTaketest, setContributeTaketest] = useState([]);
  const [radarChart, setRadarChart] = useState([]);

  const [yearsOfTakeTest, setYearsOfTakeTest] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [loading, setLoading] = useState(true);

  const [contributions, setContributions] = useState(Array(366).fill(0)); // Default to leap year (366 days)
  const [monthlyData, setMonthlyData] = useState(Array(12).fill(0));

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Function to check if a year is a leap year
  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  // Calculate number of days in the selected year (leap year or regular year)
  const daysInYear = isLeapYear(selectedYear) ? 366 : 365;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weeks = Array(7).fill(1); // Placeholder for weekday labels

  // Fetch test analysis data and available years on component mount
  useEffect(() => {
    if (!user?.id) return; // Prevent fetching if user ID is undefined
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const contributeResponseData = await dispatch(
          getTestAnalysisAttempt(user?.id)
        );
        const contributeResponse = contributeResponseData.payload;

        const yearsResponseData = await dispatch(getAttemptTests(user?.id));
        const yearsResponse = yearsResponseData.payload;
        // Check and handle response data
        setRadarChart([
          {
            skillType: 0,
            count: 9,
            averageScore: 9.0,
          },
          {
            skillType: 1,
            count: 3,
            averageScore: 6.0,
          },
          {
            skillType: 2,
            count: 3,
            averageScore: 6.5,
          },
          {
            skillType: 3,
            count: 3,
            averageScore: 6.5,
          },
          {
            skillType: 3,
            count: 3,
            averageScore: 6.5,
          },
          {
            skillType: 3,
            count: 3,
            averageScore: 6.5,
          },
        ]);
        setContributeTaketest(contributeResponse.dateAnalysis);
        setRadarChart(contributeResponse.skillAnalysis);
        if (Array.isArray(yearsResponse)) {
          setYearsOfTakeTest(yearsResponse);
          if (yearsResponse.length > 0) {
            setSelectedYear(yearsResponse[0].year);
          }
        } else {
          console.error(
            "Unexpected response for yearsOfTakeTest",
            yearsResponse
          );
          setYearsOfTakeTest([]);
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();

    // Fake data for radar chart (skill scores)
  }, [dispatch, user?.id]);

  // Update contribution and monthly data whenever selected year or contributions change
  useEffect(() => {
    const updatedContributions = Array(daysInYear).fill(0);
    const monthlyCounts = Array(12).fill(0);

    contributeTaketest.forEach((test) => {
      const testDateFormat = test.testDate.split("T")[0];
      const testDate = new Date(testDateFormat);
      if (testDate.getFullYear() === selectedYear) {
        // Calculate the day of the year
        const startOfYear = new Date(testDate.getFullYear(), 0, 0);
        const dayOfYear = Math.floor(
          (testDate - startOfYear) / (1000 * 60 * 60 * 24)
        );

        if (dayOfYear < updatedContributions.length) {
          updatedContributions[dayOfYear] = test.attemptNumber;
        }
        const monthIndex = testDate.getMonth();
        monthlyCounts[monthIndex] += test.attemptNumber;
      }
    });

    setContributions(updatedContributions);
    setMonthlyData(monthlyCounts);
  }, [selectedYear, contributeTaketest]);

  // Function to get background color based on value
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
        return "bg-gray-200";
    }
  };

  // Bar Chart Data
  const barChartData = {
    labels: months,
    datasets: [
      {
        label: `Attempts in ${selectedYear}`,
        data: monthlyData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Radar Chart Data
  const radarChartData = {
    labels: radarChart.map((item) => {
      switch (item.skillType) {
        case 0:
          return "Reading";
        case 1:
          return "Listening";
        case 2:
          return "Writing";
        case 3:
          return "Speaking";
        default:
          return "Unknown"; // If there's an unknown skillType
      }
    }), // Convert skillType to readable label
    datasets: [
      {
        label: "Score",
        data: radarChart.map((item) => item.averageScore), // Assuming radarChart contains 'score' data
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  // Loading state while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="p-3 w-full">
      <div className="flex justify-between mb-10">
        <div className="flex flex-col  w-4/12  items-center justify-around">
          <h3 className="font-semibold">Achievements</h3>
          <div className="w-40">
            <img
              src={img}
              alt="Shark Image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Radar Chart */}
        <div className="bg-white w-6/12 flex items-center border border-gray-300 justify-center h-[350px] shadow-lg p-5">
          <Radar data={radarChartData} options={chartOptions} />
        </div>
      </div>

      <div className="flex gap-10">
        {/* Grid of Days */}
        <div>
          <div className="flex items-center justify-around ml-10 text-sm text-gray-600 mb-2">
            {months.map((month, index) => (
              <span key={index} className="w-8 text-center">
                {month.slice(0, 3)}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              {weeks.map((_, index) => (
                <span key={index} className="text-[10px] h-4 w-4 text-gray-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              ))}
            </div>

            <div className="flex gap-1">
              {Array(Math.ceil(daysInYear / 7))
                .fill(0)
                .map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array(7)
                      .fill(0)
                      .map((_, dayIndex) => {
                        const index = weekIndex * 7 + dayIndex + 1;
                        if (index >= daysInYear) return null;
                        const value = contributions[index];
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

        {/* Year Selection */}
        <div className="flex flex-col mt-6 gap-2 items-center">
          {yearsOfTakeTest && yearsOfTakeTest.length > 0 ? (
            yearsOfTakeTest.map((yearData) => (
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
            ))
          ) : (
            <div className="text-gray-500">No data available for years.</div>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white  shadow-lg p-5">
        <Bar data={barChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ContributionAttempt;
