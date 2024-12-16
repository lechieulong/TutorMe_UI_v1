import React, { useEffect, useState } from "react";
import { getLives,EndLive } from "../../components/ADMIN/Lives";
import {FaRegEyeSlash, FaFileExport, FaPlus,  } from "react-icons/fa";
import { handleExport } from "../../components/ADMIN/CSV";

const LivesPage = () => {
  const [lives, setLives] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  const fetchProducts = async () => {
    const result = await getLives(page, pageSize, searchQuery);
    setLives(result.lives);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lives</h2>
        <div className="flex items-center">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mr-2"
            />
            <button
            onClick={() => handleExport(lives)} 
              type="button"
              className="border border-gray-300 rounded-lg p-2 flex items-center"
            >
              <FaFileExport className="mr-2" /> Export
            </button>
          </form>
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">RoomId</th>
            <th className="py-2">Status</th>
            <th className="py-2">StartTime</th>
            <th className="py-2">Type</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lives.length > 0 ? (
            lives.map((live) => (
              <tr key={live.id} className="border-b">
                <td className="py-2">{live.name}</td>
                <td className="py-2">{live.liveStreamId}</td>
                <td className="py-2">{live.status==1?"Live":"End Live"}</td>
                <td className="py-2">
                  {new Date(live.startTime).toLocaleString()}
                </td>  
                <td className="py-2">{live.type==0?"Public":"Private"}</td>     
                <td className="py-2 flex space-x-2">
                  <button
                    onClick={() => EndLive(live.liveStreamId)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg flex items-center"
                  >
                    <FaRegEyeSlash className="mr-1" /> Stop Live
                  </button>
                </td>     
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 text-center">
                No Lives found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 border rounded ${
            page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 border rounded ${
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default LivesPage;
