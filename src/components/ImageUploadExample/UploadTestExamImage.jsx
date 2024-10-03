// import { useState } from "react";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
// import { db, storage } from "../../../firebaseConfig";

// const UploadTestExamImage = ({ testId }) => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     console.log(file);
//     if (file) {
//       try {
//         const storageRef = ref(storage, `testExams/${file.name}`);
//         await uploadBytes(storageRef, file);
//         const downloadURL = await getDownloadURL(storageRef);
//         const testExamDocRef = doc(db, "testExams", testId, "reading", "2");

//         const docSnap = await getDoc(testExamDocRef);
//         if (docSnap.exists()) {
//           // If document exists, update it
//           await updateDoc(testExamDocRef, {
//             image: downloadURL,
//           });
//         } else {
//           // If document does not exist, create it
//           await setDoc(testExamDocRef, {
//             image: downloadURL,
//           });
//         }

//         alert("Image uploaded and metadata saved!");
//       } catch (error) {
//         console.error("Error uploading image or saving metadata:", error);
//         alert("Failed to upload image or save metadata.");
//       }
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload Image</button>
//     </div>
//   );
// };

// export default UploadTestExamImage;
