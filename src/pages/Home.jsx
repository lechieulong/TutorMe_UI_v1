import LiveStreamFrame from "../components/common/LiveStreamFrame";
import SubjectListCard from "../components/common/SubjectListCard";
import subjects from "../data/subjects";
import MainLayout from "../layout/MainLayout";
import LinkTo from "../components/common/linkToCalendar";
import { Link } from "react-router-dom";
import LiveStreamList from "../components/common/LiveStreamList";
import { fetchTopRatedTeachers } from "../redux/users/teacherSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const { topRatedTeachers, loading, error } = useSelector(
    (state) => state.teachers
  );

  useEffect(() => {
    dispatch(fetchTopRatedTeachers());
  }, [dispatch]);
  return (
    <MainLayout>
      <div className="flex justify-center bg-white mx-auto px-4 py-8">
        <LiveStreamFrame width="1000px" height="500px" />
      </div>
      <hr />
      <div className="m-5 bg-lightGreen rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              What is <br /> AI-Enhanced IELTS Prep?
            </h1>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-xl text-gray-700 font-mono">
              AI-Enhanced IELTS Prep aims to enhance learning efficiency by
              utilizing AI technology to provide personalized feedback and
              suggestions, helping students focus on areas that need improvement
              and optimize their study efforts.
            </p>
          </div>
        </div>
      </div>

      <br />
      {/* Livestream and Subjects Section */}
      <div className="bg-white">
      <div className="flex justify-center items-center rounded-lg p-4">
          <div className="text-center">
            <h2 className="text-lg font-bold bg-lightGreen p-3 text-black rounded-lg">
              LIVESTREAMS SESSION SHARE PROFOUND KNOWLEDGE
            </h2>
          </div>
        </div>
        <LiveStreamList />
        <hr className="mt-10 mx-5"/>
        <div className="flex justify-center items-center m-5 bg-lightGreen rounded-lg p-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-black">
              A TEAM OF TEACHERS WITH FULL KNOWLEDGE, EXPERIENCE AND EXPERTISE.
            </h2>
          </div>
        </div>

        <div className="flex justify-center items-center p-5">
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
              {topRatedTeachers.map((teacher) => (
                <SubjectListCard
                  key={teacher.userName}
                  userName={teacher.userName}
                  fullName={teacher.fullName}
                  image={teacher.imageURL}
                  averageRating={teacher.averageRating}
                  ratingCount={teacher.ratingCount}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
      <br />
      {/* Footer Section */}
      <footer className="bg-houseGreen text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">AI-Enhanced IELTS Prep</h2>
              <p className="text-sm mt-2">
                Enhancing learning efficiency with AI technology to personalize
                feedback and suggestions for IELTS preparation.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row md:space-x-8 text-center">
              <a href="/about" className="hover:underline text-sm">
                About Us
              </a>
              <a href="/courses" className="hover:underline text-sm">
                Courses
              </a>
              <a href="/contact" className="hover:underline text-sm">
                Contact
              </a>
              <a href="/privacy" className="hover:underline text-sm">
                Privacy Policy
              </a>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 text-center">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <i className="fab fa-facebook-square text-2xl"></i>
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <i className="fab fa-twitter-square text-2xl"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <i className="fab fa-instagram-square text-2xl"></i>
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AI-Enhanced IELTS Prep. All rights
            reserved.
          </div>
        </div>
      </footer>

      <LinkTo />
    </MainLayout>
  );
};

export default Home;
