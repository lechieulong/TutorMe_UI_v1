import { useState } from "react";
import TestView from "./TestView";
import Header from "../../components/Test/Header";

const TestLayout = () => {
  const [isTimeOut, setIsTimeOut] = useState(false);
  return (
    <div>
      <Header setIsTimeOut={setIsTimeOut} />
      <TestView />
    </div>
  );
};

export default TestLayout;
