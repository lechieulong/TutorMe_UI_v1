import LiveStreamFrame from "../components/common/LiveStreamFrame";
import IdolListCard from "../components/common/IdolListCard";
import SubjectListCard from "../components/common/SubjectListCard";
import idols from "../data/idols";
import subjects from "../data/subjects";
import MainLayout from "../layout/MainLayout";
import LinkTo from "../components/common/linkToCalendar";

const Home = () => {
  return (
    <MainLayout>
      <div className="flex justify-center bg-white mx-auto px-4 py-8">
        <LiveStreamFrame width="1000px" height="500px" />
      </div>
      <hr />
      
      {/* Intro Section */}
      <div className="m-5 bg-gray-50 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              What is <br /> AI-Enhanced IELTS Prep?
            </h1>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-xl text-gray-700 font-mono">
              AI-Enhanced IELTS Prep aims to enhance learning efficiency by utilizing AI technology to provide personalized feedback and suggestions,
              helping students focus on areas that need improvement and optimize their study efforts.
            </p>
          </div>
        </div>
      </div>

      {/* Livestream and Subjects Section */}
      <div className="bg-white">
        <h1 className="ml-10 text-2xl font-bold">
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
        <h1 className="ml-10 text-2xl font-bold">
          <a className="text-black" href="#">
            Subjects{" "}
            <span className="font-normal text-xl opacity-40">more</span>
          </a>
        </h1>
        <div className="p-5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-10">
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
      
      <LinkTo />
    </MainLayout>
  );
};

export default Home;
