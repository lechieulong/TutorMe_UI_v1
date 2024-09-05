import LiveStreamFrame from "../components/common/LiveStreamFrame";
import IdolListCard from "../components/common/IdolListCard";
import idols from "../data/idols";
import MainLayout from "../layout/MainLayout";

const LiveStream = () => {
  return (
    <MainLayout>
      <div className="flex flex-col h-min mt-16">
        {/* Div cha chứa LiveStreamFrame và div chat */}
        <div className="flex w-full">
          {/* Div chứa LiveStreamFrame chiếm 80% chiều rộng */}
          <div className="w-[80%] p-2">
            <LiveStreamFrame height="500px" />
          </div>
          {/* Div chứa chat box chiếm 20% chiều rộng */}
          <div className="w-[20%] text-white p-2">
            <div className="bg-black h-[500px]">123</div>
          </div>
        </div>

        {/* Div chứa nội dung với ảnh và các IdolListCard */}
        <div className="p-4 bg-white shadow-md">
          <div className="flex items-center">
            <img
              src="../src/assets/images/ava.png"
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full mr-4"
            />
            <div>
              <h3 className="text-black text-xl font-semibold mt-8">
                Channel name
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="text-black font-bold">Number</span> subscribes
              </p>
            </div>
          </div>
          <p className="text-black mt-1 mb-4">Đây là content mỗi khi live</p>
          <hr className="border-t-2 border-gray-300 my-4 w-full" />
          <p className="text-black mt-1 mb-4">Giới thiệu</p>

          <h2 className="text-black font-bold mb-4">Livestreams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
    </MainLayout>
  );
};

export default LiveStream;
