/* eslint-disable react/prop-types */
import Header from "../components/common/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="container mx-auto overflow-y-auto mt-20">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
