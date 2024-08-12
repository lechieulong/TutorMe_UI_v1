import Header from "../components/common/Header";
import LiveStream from "../components/common/LiveStream";
import IdolListCard from "../components/common/IdolListCard";
import SubjectListCard from "../components/common/SubjectListCard";
import idols from "../data/idols";
import subjects from "../data/subjects";

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
            Hot Livestream{" "}
            <span className="font-normal text-xl opacity-40">more</span>
          </a>
        </h1>
        <div className="p-5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
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
        <h1 className="ml-[200px] text-2xl font-bold">
          <a className="text-black" href="#">
            Subjects{" "}
            <span className="font-normal text-xl opacity-40">more</span>
          </a>
        </h1>
        <div className="p-5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-20">
              {subjects.map((subject, index) => (
                <SubjectListCard
                  key={index}
                  image={subject.image}
                  title={subject.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
