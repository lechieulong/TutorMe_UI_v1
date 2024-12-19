import LiveStreamFrame from "../components/common/LiveStreamFrame";
import MainLayout from "../layout/MainLayout";
import LiveStreamList from "../components/common/LiveStreamList";
import {
  GetListIdIsLiveStream,
  getUrlParams,
  getStreamSession,
} from "../components/common/LiveStreamFrame";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetUserByID } from "../redux/users/UserSlice";
const LiveStream = () => {
  const [roomID, setRoomID] = useState(null);
  const [idolData, setIdolData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const Listid = await GetListIdIsLiveStream();
        const roomIdFromUrl = getUrlParams().get("roomID");
        if (roomIdFromUrl) {
          if (await getStreamSession(roomIdFromUrl)) {
            setRoomID(roomIdFromUrl);
          }
        } else if (Listid!=null) {
          setRoomID(Listid[0].RoomId);
        }    

      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchRoomData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (!roomID) return; // Dừng nếu roomID không tồn tại

      try {
        // Lấy thông tin streamSession và userInfo
        const streamSession = await getStreamSession(roomID);
        const userInfo = await dispatch(GetUserByID(roomID));

        // Tạo đối tượng chứa dữ liệu hợp nhất
        const data = {
          ...streamSession,
          description: streamSession.name,
          ...userInfo?.payload,
        };

        // Cập nhật IdolData với đối tượng
        setIdolData(data);
      } catch (error) {
        console.error("Error in fetchData", error);
      }
    }
    if (roomID) {
      fetchData();
    }
  }, [roomID]);

  return (
    <MainLayout>
      <div className="flex flex-col h-min mt-16">
        {/* Div cha chứa LiveStreamFrame và div chat */}
        <div className="flex justify-center items-center">
          {/* Div chứa LiveStreamFrame chiếm 80% chiều rộng */}
          <div className=" p-2  w-8/12">
            <LiveStreamFrame height="500px" width="1000px" />
          </div>
        </div>

        {/* Div chứa nội dung với ảnh và các IdolListCard */}
        <div className="p-4 bg-white shadow-md">
          <div className="flex items-center">
            <img
              src={idolData.imageURL}
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full mr-4"
            />
            <div>
              <h3 className="text-black text-xl font-semibold mt-8">
                {idolData.name}
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="text-black font-bold">Number</span> subscribes
              </p>
            </div>
          </div>
          <p className="text-black mt-1 mb-4">{idolData.description}</p>
          <hr className="border-t-2 border-gray-300 my-4 w-full" />

          <h2 className="text-black font-bold mb-4">Hot Livestreams</h2>
          <LiveStreamList />
        </div>
      </div>
    </MainLayout>
  );
};

export default LiveStream;
