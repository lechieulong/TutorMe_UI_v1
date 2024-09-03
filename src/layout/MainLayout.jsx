/* eslint-disable react/prop-types */
import Header from "../components/common/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <main className="container mt-10 mx-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
