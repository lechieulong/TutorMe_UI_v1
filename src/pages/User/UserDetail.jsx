import React from 'react';
import Sidebar from './components/Sidebar';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';

const UserDetail = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 bg-gray-100">
                <Sidebar className=""/>
                <main className="flex-1 p-6">
                    <div className="w-full max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col">
                        <div className="flex flex-col lg:flex-row items-start">
                            <div className="lg:w-1/4 flex flex-col items-center mb-6 lg:mb-0 lg:mr-6">
                                <img
                                    src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/428608379_1107729527084945_699601624333735778_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyVNuzP4Hc8Dbdt9fO1j7gqcEP5iSFCnKpwQ_mJIUKckbEXT7w3bFwY3fwedmZXiSmhLJmd69z1YqhZFIY0buO&_nc_ohc=t5-ILYynI4sQ7kNvgEVAn1R&_nc_ht=scontent.fsgn2-8.fna&oh=00_AYAdUovwGr0lybglbgHvhpqXWkxTQjvmgOKiciPetgkOqQ&oe=66C7DBB0"
                                    alt="Profile"
                                    className="w-36 h-36 rounded-full object-cover border-4 border-white mb-4"
                                    loading="lazy"
                                />
                                <Link to="/profileedit" className="mt-2 bg-white text-black border border-black rounded-lg px-3 py-1 hover:bg-gray-100">
                                    Edit Profile
                                </Link>
                                
                            </div>
                            <div className="lg:w-2/4 flex flex-col">
                                <div className="bg-black text-white p-4 rounded-t-lg flex flex-col lg:flex-row items-start">
                                    <div className="flex-1 lg:ml-6">
                                        <h5 className="text-2xl font-bold">Nguyen Van Sy</h5>
                                        <p className="text-lg">Student</p>
                                        <p className="text-gray-600 text-sm">@email</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-100 text-black rounded-b-lg flex-grow">
                                    <div className="mb-5">
                                        <p className="text-lg font-semibold mb-2">About</p>
                                        <div className="p-4 bg-gray-200 rounded-lg">
                                            <p className="italic mb-2">Web Developer</p>
                                            <p className="italic mb-2">Lives in Quang Binh</p>
                                            <p className="italic">Programmer</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-lg font-semibold">Recent Courses</p>
                                        <button className="text-sm text-gray-500 hover:underline">
                                            Show All
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                            alt="Recent course 1"
                                            className="w-full rounded-lg"
                                            loading="lazy"
                                        />
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                            alt="Recent course 2"
                                            className="w-full rounded-lg"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Uncomment below if Logout is needed */}
                {/* <Logout /> */}
            </div>
        </div>
    );
};

export default UserDetail;
