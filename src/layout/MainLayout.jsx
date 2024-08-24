/* eslint-disable react/prop-types */
import Header from "../components/common/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
