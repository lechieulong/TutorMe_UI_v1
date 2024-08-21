import React from 'react';

function UserProfile() {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <nav aria-label="breadcrumb" className="bg-gray-200 rounded-md p-4 mb-6">
          <ol className="flex space-x-2">
            <li><a href="#" className="text-blue-500 hover:underline">Home</a></li>
            <li><span>/</span></li>
            <li><a href="#" className="text-blue-500 hover:underline">User</a></li>
            <li><span>/</span></li>
            <li className="text-gray-600">User Profile</li>
          </ol>
        </nav>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                className="rounded-full mx-auto mb-4" style={{ width: '150px' }} />
              <h5 className="text-xl font-semibold mb-2">John Smith</h5>
              <p className="text-gray-500">DotNet</p>
              <p className="text-gray-500 mb-4">1$/h</p>
              <div className="flex justify-center space-x-2">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Follow</button>
                <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg">Message</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg mt-6 p-4">
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <i className="fas fa-globe text-yellow-500"></i>
                  <span>Các kỹ năng của teacher</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fab fa-github text-gray-500"></i>
                  <span>Được bằng giỏi đh....</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fab fa-twitter text-blue-400"></i>
                  <span>Chứng chỉ....</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fab fa-instagram text-pink-500"></i>
                  <span>Chứng chỉ....</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fab fa-facebook-f text-blue-700"></i>
                  <span>Chứng chỉ....</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-1/4">
                    <p className="font-medium text-gray-700">Full Name</p>
                  </div>
                  <div className="w-3/4">
                    <p className="text-gray-600">Nguyễn Thị Sỹ</p>
                  </div>
                </div>
                <hr />
                <div className="flex">
                  <div className="w-1/4">
                    <p className="font-medium text-gray-700">Email</p>
                  </div>
                  <div className="w-3/4">
                    <p className="text-gray-600">example@example.com</p>
                  </div>
                </div>
                <hr />
                <div className="flex">
                  <div className="w-1/4">
                    <p className="font-medium text-gray-700">Phone</p>
                  </div>
                  <div className="w-3/4">
                    <p className="text-gray-600">(097) 234-5678</p>
                  </div>
                </div>
                <hr />
                <div className="flex">
                  <div className="w-1/4">
                    <p className="font-medium text-gray-700">Role</p>
                  </div>
                  <div className="w-3/4">
                    <p className="text-gray-600">Teacher</p>
                  </div>
                </div>
                <hr />
                <div className="flex">
                  <div className="w-1/4">
                    <p className="font-medium text-gray-700">Address</p>
                  </div>
                  <div className="w-3/4">
                    <p className="text-gray-600">VN</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-6">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <p className="text-sm font-medium text-blue-500 italic mb-3">assignment Project Status</p>
                  <p className="text-xs text-gray-600 mb-1">Web Design</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Website Markup</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">One Page</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Mobile Template</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Backend API</p>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <p className="text-sm font-medium text-blue-500 italic mb-3">assignment Project Status</p>
                  <p className="text-xs text-gray-600 mb-1">Web Design</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Website Markup</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">One Page</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Mobile Template</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Backend API</p>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;