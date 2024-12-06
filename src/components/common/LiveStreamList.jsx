// components/common/LiveStreamList.js
import React, { useState, useEffect } from "react";
import IdolListCard from "./IdolListCard"; // Sử dụng IdolListCard để hiển thị thông tin livestream
import { GetListIdIsLiveStream, getStreamSession } from "./LiveStreamFrame";
import { GetUserByID } from "../../redux/users/UserSlice";
import { useDispatch } from "react-redux";

const LiveStreamList = () => {
  const [idolData, setIdolData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Lưu trữ từ khóa tìm kiếm
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // Lấy danh sách liveId đang live
      const liveIds = await GetListIdIsLiveStream();
      // Lấy thông tin streamSession và user cho từng liveId
      if (liveIds != null) {
        const data = await Promise.all(
          liveIds.map(async (liveid) => {
            const streamSession = await getStreamSession(liveid);
            const userInfo = await dispatch(GetUserByID(liveid));
            return { ...streamSession, description: streamSession.name, ...userInfo.payload };
          })
        );
        setIdolData(data);
      }
    }

    fetchData();
  }, [dispatch]);

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

      {/* Hiển thị danh sách idol */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {filteredIdols.map((idol, index) => (
          <IdolListCard
            key={index}
            id={idol.id}
            image={idol.imageURL}
            title={idol.name}
            description={idol.description}
            profileImage={idol.imageURL}
          />
        ))}
      </div>
    </div>
  );
};

export default LiveStreamList;
