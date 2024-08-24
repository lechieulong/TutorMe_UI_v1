import Header from "../components/common/Header";
import LiveStreamFrame from "../components/common/LiveStreamFrame";
import { useState, useEffect, useRef } from "react";
import IdolListCard from "../components/common/IdolListCard";
import idols from "../data/idols";
const LiveStream = () => {
  const [frameSize, setFrameSize] = useState({ width: "100%", height: "auto" });
  const [chatWidth, setChatWidth] = useState("0"); // Thêm trạng thái cho chiều rộng khung chat
  const chatRef = useRef(null); // Tham chiếu đến khung chat
  const frameRef = useRef(null); // Tham chiếu đến LiveStreamFrame

  useEffect(() => {
    const updateSize = () => {
      const frameElement = document.querySelector(".live-stream-container");
      if (frameElement) {
        const frameWidth = frameElement.offsetWidth;
        const viewportWidth = window.innerWidth;
        const remainingWidth = viewportWidth - frameWidth;
        const chatWidth = remainingWidth * 0.85; // Chiếm 85% của phần còn lại
        setChatWidth(`${chatWidth}px`);
      }

      const height = (frameRef.current?.offsetWidth * 8.5) / 16; // Tính chiều cao dựa trên tỷ lệ 16:9
      setFrameSize({
        width: frameRef.current?.offsetWidth || "800px",
        height: `${height}px`,
      });
    };

    const updateChatPosition = () => {
      if (chatRef.current && frameRef.current) {
        // Cập nhật vị trí top của khung chat để căn chỉnh với top của LiveStreamFrame
        chatRef.current.style.top = `${
          frameRef.current.getBoundingClientRect().top
        }px`;
      }
    };

    updateSize();
    updateChatPosition(); // Cập nhật vị trí khung chat ngay khi load trang

    window.addEventListener("resize", () => {
      updateSize();
      updateChatPosition(); // Cập nhật vị trí khi resize
    });

    return () =>
      window.removeEventListener("resize", () => {
        updateSize();
        updateChatPosition();
      }); // Cleanup listener
  }, []);

  return (
    <div>
      <Header />
      <div className="flex h-screen mx-auto px-4 py-8">
        <div className="flex flex-1 flex-row relative">
          <div
            className="relative w-4/5 live-stream-container"
            style={{ height: frameSize.height }}
            ref={frameRef}
          >
            <LiveStreamFrame
              width={frameSize.width}
              height={frameSize.height}
            />

            <div
              className="bg-white text-white mt-4"
              style={{
                width: frameSize.width,
              }}
            >
              <div className="p-4 flex items-center">
                <img
                  src="../src/assets/images/ava.png"
                  alt="Profile"
                  className="w-20 h-20 object-cover rounded-full mr-4"
                />
                <div>
                  <h3 className="text-black text-xl font-semibold mt-8">
                    Chanel name
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <span className="text-black font-bold">Number</span>{" "}
                    subcribes
                  </p>
                </div>
              </div>
              <div className="pl-4 flex items-center">
                <p className="text-black mt-1 mb-4">
                  Đây là content mỗi khi live
                </p>
              </div>
              <hr className="border-t-2 border-gray-300 my-4 w-full" />
              <div className="pl-4 flex items-center">
                <p className="text-black mt-1 mb-4">Giới thiệu</p>
              </div>
            </div>
            <div
              className="bg-white text-white mt-4"
              style={{
                width: frameSize.width,
              }}
            >
              <div className="p-4 items-center">
                <h2 className="text-black font-bold mb-4 ml-6">Livestreams</h2>
                <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {idols.map((idol, index) => (
                    <IdolListCard
                      key={index}
                      image={idol.image}
                      title={idol.title}
                      description={idol.description}
                      profileImage={idol.profileImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex-1 w-1/5 p-2 ml-4 bg-white overflow-y-auto"
            ref={chatRef}
            style={{
              position: "fixed", // Cố định khung chat với màn hình
              top: "0", // Đặt top 0 sẽ được cập nhật bởi JavaScript
              right: "1%", // Đặt right 0 để khung chat nằm sát bên phải
              width: chatWidth, // Đặt chiều rộng khung chat theo tính toán
              height: frameSize.height, // Đặt chiều cao khung chat tương ứng với chiều cao livestream
              zIndex: "30", // Đảm bảo khung chat luôn ở trên
            }}
          >
            {/* Khung chat */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
