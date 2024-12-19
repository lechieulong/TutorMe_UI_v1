// components/common/LiveStreamList.js
import React, { useState, useEffect } from "react";
import IdolListCard from "./IdolListCard"; // Sử dụng IdolListCard để hiển thị thông tin livestream
import { GetListIdIsLiveStream, getStreamSession } from "./LiveStreamFrame";
import { GetUserByID } from "../../redux/users/UserSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const LiveStreamList = () => {
  const [idolData, setIdolData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Lưu trữ từ khóa tìm kiếm
  const dispatch = useDispatch();
  const [visibleIndex, setVisibleIndex] = useState(0);
  const visibleCount = 6; 

  useEffect(() => {
    async function fetchData() {
      // Lấy danh sách liveId đang live
      const lives = await GetListIdIsLiveStream();
      // Lấy thông tin streamSession và user cho từng liveId
      if (lives != null) {
        const data = await Promise.all(
          lives.map(async (live) => {
            const streamSession = await getStreamSession(live.RoomId);
            const userInfo = await dispatch(GetUserByID(live.RoomId));
            return { ...streamSession, description: streamSession.name, ...userInfo.payload,usercount:live.UserCount };
          })
        );
        setIdolData(data);
      }
    }

    fetchData();
  }, [dispatch]);

  const handleNext = () => {
    setVisibleIndex(Math.min(visibleIndex + visibleCount, filteredIdols.length - visibleCount));
  };

  const handlePrev = () => {
    setVisibleIndex(Math.max(visibleIndex - visibleCount, 0));
  };


  // Lọc dữ liệu idolData dựa trên từ khóa tìm kiếm
  const filteredIdols = idolData.filter((idol) => {
    return (
      idol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idol.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4">
      {/* Tạo ô tìm kiếm */}
      <div className="search-container p-5">
        <input
          type="text"
          placeholder="Search by Name or Description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
          <div className="mt-4 relative overflow-hidden">
            <div
              className={`flex transition-transform duration-300`}
            >
              {filteredIdols.slice(visibleIndex, visibleIndex + visibleCount).map(idol => (
              <IdolListCard
                key={idol.id}
                id={idol.id}
                image={idol.imageURL}
                title={idol.name}
                description={idol.description}
                profileImage={idol.imageURL}
                type={idol.type}
                usercount={idol.usercount}
              />
              ))}
            </div>
  
            {/* Buttons điều hướng nằm giữa, phủ lên danh sách gift */}
            <button
              onClick={handlePrev}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg ${visibleIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={visibleIndex === 0}
            >
            <FontAwesomeIcon icon={faChevronLeft} />
              
            </button>
            <button
              onClick={handleNext}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg ${visibleIndex + visibleCount >= filteredIdols.length ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={visibleIndex + visibleCount >= filteredIdols.length}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
    </div>
  );
};

export default LiveStreamList;
