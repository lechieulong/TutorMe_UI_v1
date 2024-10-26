/* eslint-disable react/prop-types */
import Header from "../components/common/Header";

const MainLayout = ({ children }) => {
  return (
    <div style={{ height: "100vh" }} className="flex flex-col w-lvw">
      <Header />
      <main
        style={{
          maxHeight: "calc(100vh - 60px)",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
