/* eslint-disable react/prop-types */
import Header from "../components/common/Header";

const MainLayout = ({ children }) => {
  return (
    <div style={{ height: "100vh" }} className="flex flex-col ">
      <Header />
      <main
        style={{
          maxHeight: "calc(100vh - 60px)",
          overflowY: "auto",
        }}
        className="px-10"
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
