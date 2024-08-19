/* eslint-disable react/prop-types */
import Header from "../components/common/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
