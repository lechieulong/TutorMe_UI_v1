import Header from "../components/common/Header";
import LiveStream from "../components/common/LiveStream";
import IdolListCard from "../components/common/IdolListCard";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid flex justify-center bg-white mx-auto px-4 py-8">
        <LiveStream />
      </div>
      <div className="bg-white">
        <h1 className="ml-[200px] text-2xl font-bold">
          <a className="text-black" href="#">
            Hot
          </a>
        </h1>
        <div className="p-5">
          {/* Container để căn giữa và cách đều các card */}
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <IdolListCard
                image="../../src/assets/images/idol.jpg" // Thay bằng URL hình ảnh thực tế
                title="Sample Idol"
                description="This is a brief description of the idol."
                price={29.99}
              />
              <IdolListCard
                image="../../src/assets/images/idol.jpg" // Thay bằng URL hình ảnh thực tế
                title="Sample Idol"
                description="This is a brief description of the idol."
                price={29.99}
              />
              <IdolListCard
                image="../../src/assets/images/idol.jpg" // Thay bằng URL hình ảnh thực tế
                title="Sample Idol"
                description="This is a brief description of the idol."
                price={29.99}
              />
              <IdolListCard
                image="../../src/assets/images/idol.jpg" // Thay bằng URL hình ảnh thực tế
                title="Sample Idol"
                description="This is a brief description of the idol."
                price={29.99}
              />
              <IdolListCard
                image="../../src/assets/images/idol.jpg" // Thay bằng URL hình ảnh thực tế
                title="Sample Idol"
                description="This is a brief description of the idol."
                price={29.99}
              />
              <IdolListCard
                image="../../src/assets/images/idol.jpg" // Thay bằng URL hình ảnh thực tế
                title="Sample Idol"
                description="This is a brief description of the idol."
                price={29.99}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
