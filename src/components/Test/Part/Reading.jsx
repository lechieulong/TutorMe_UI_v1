import React, { useState, useEffect } from "react";
import FillInTheBlankQuestion from "../AnswerType/FillInTheBlankQuestion";
import RadioOption from "../AnswerType/RadioOption";
import MatchingHeading from "../AnswerType/MatchingHeading";
import { useDispatch } from "react-redux";
import { storeAnswer } from "../../../redux/answer/answerSlice";

const Reading = ({ partData, refs }) => {
  const dispatch = useDispatch();
  console.log(partData);

  // const onSubmit = () => {
  //   const payload = {
  //     reading: [
  //       {
  //         testId: "1",
  //         questionId: "1",
  //         answerId: "1",
  //         answerText: "1",
  //         skill: "1",
  //         part: "1",
  //       },
  //     ],
  //   };
  //   dispatch(storeAnswer(payload));
  // };

  return <div className="bg-green-50 h-screen p-3">{partData}</div>;
};

export default Reading;
