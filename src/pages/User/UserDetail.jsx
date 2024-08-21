import React from 'react';
import Sidebar from './components/Sidebar';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Logout from './components/Logout';

const UserDetail = () => {
    return (
        <div className="relative">
            <Header />
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 p-6 flex flex-col">
                    <div className="w-full max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg flex-grow">
                        <div className="flex flex-col lg:flex-row items-start">
                            <div className="lg:w-1/4 flex flex-col items-center mb-6 lg:mb-0 lg:mr-6">
                                <img
                                    src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/428608379_1107729527084945_699601624333735778_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyVNuzP4Hc8Dbdt9fO1j7gqcEP5iSFCnKpwQ_mJIUKckbEXT7w3bFwY3fwedmZXiSmhLJmd69z1YqhZFIY0buO&_nc_ohc=t5-ILYynI4sQ7kNvgEVAn1R&_nc_ht=scontent.fsgn2-8.fna&oh=00_AYAdUovwGr0lybglbgHvhpqXWkxTQjvmgOKiciPetgkOqQ&oe=66C7DBB0"
                                    alt="Profile"
                                    className="w-36 h-36 rounded-full object-cover border-4 border-white mb-4"
                                />
                                <Link to="/profileedit" className="mt-2 bg-white text-black border border-black rounded-lg px-3 py-1 hover:bg-gray-100">Edit Profile</Link>
                            </div>
                            <div className="lg:w-3/4 flex flex-col">
                                <div className="bg-black text-white p-4 rounded-t-lg flex flex-col lg:flex-row items-start">
                                    <div className="flex-1 lg:ml-6">
                                        <h5 className="text-2xl font-bold">Nguyen Van Sy</h5>
                                        <p className="text-lg">Quang Binh</p>
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
                                        <p className="text-sm text-gray-500 hover:underline cursor-pointer">Show All</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                            alt="Recent photo 1"
                                            className="w-full rounded-lg"
                                        />
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                            alt="Recent photo 2"
                                            className="w-full rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Logout />
            </div>
        </div>
    );
};

export default UserDetail;
