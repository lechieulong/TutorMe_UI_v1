import React from "react";

const MyCourses = () => {
  const courses = [
    {
      title: "E-Learning and Digital Cultures",
      date: "Feb 4, 2020 - Feb 22, 2020",
      rating: 8.7,
      status: "completed",
    },
    {
      title: "Machine Learning: Regression",
      date: "Feb 8, 2020 - Feb 18, 2020",
      rating: 8.6,
      status: "in progress",
    },
    {
      title: "Principles of Computing (Part 1)",
      status: "completed",
    },
    {
      title: "Design Principles: an Introduction",
      date: "Feb 8, 2020 - Feb 18, 2020",
      status: "in progress",
    },
    {
      title: "Machine Learning Foundations",
      status: "upcoming",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Courses Section */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-6">My Courses</h1>
          <div className="flex space-x-4 border-b mb-6">
            <button className="py-2 px-4 font-semibold text-blue-600 border-b-2 border-blue-600">
              All Courses
            </button>
            <button className="py-2 px-4 text-gray-600 hover:text-blue-600">
              Current
            </button>
            <button className="py-2 px-4 text-gray-600 hover:text-blue-600">
              Archived
            </button>
            <button className="py-2 px-4 text-gray-600 hover:text-blue-600">
              Upcoming
            </button>
            <button className="py-2 px-4 text-gray-600 hover:text-blue-600">
              Watchlist
            </button>
          </div>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="p-4 border rounded-lg shadow">
                <div className="flex items-center">
                  <div className="w-24 h-30 rounded-full">
                    <img
                      src="https://cdn.pixabay.com/photo/2021/10/31/04/42/leaves-6756137__340.jpg"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{course.title}</h2>
                    {course.date && (
                      <p className="text-gray-600">{course.date}</p>
                    )}
                  </div>
                  {course.rating && (
                    <div className="ml-auto text-yellow-500 font-semibold">
                      🔥 {course.rating}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {course.status === "in progress" && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded ml-auto">
                      View Course
                    </button>
                  )}
                  {course.status === "completed" && (
                    <button className="bg-green-600 text-white px-6 py-2 rounded ml-auto">
                      Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <img
                className="w-16 h-16 rounded-full"
                src="https://via.placeholder.com/150"
                alt="profile"
              />
              <div>
                <h3 className="text-xl font-semibold">Yosef Dowling</h3>
                <p className="text-gray-600">Software Engineer</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Courses Completed</span>
                <span className="font-semibold">16</span>
              </div>
              <div className="flex justify-between">
                <span>Certificates Earned</span>
                <span className="font-semibold">14</span>
              </div>
              <div className="flex justify-between">
                <span>Courses In Progress</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span>Forum Discussions</span>
                <span className="font-semibold">26</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
