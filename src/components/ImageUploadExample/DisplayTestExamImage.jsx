// import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../firebaseConfig";

// const DisplayTestExamImage = ({ testId }) => {
//   const [imageURL, setImageURL] = useState("");

//   useEffect(() => {
//     const fetchImageURL = async () => {
//       const testExamDocRef = doc(db, "testExams", testId);
//       const docSnap = await getDoc(testExamDocRef);
//       if (docSnap.exists()) {
//         setImageURL(docSnap.data().ImageURL);
//       }
//     };
//     fetchImageURL();
//   }, [testId]);

//   return (
//     <div>
//       {imageURL ? (
//         <img src={imageURL} alt="Test Exam" />
//       ) : (
//         <p>No image available</p>
//       )}
//     </div>
//   );
// };

// export default DisplayTestExamImage;
