import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebaseConfig";

const UploadTestExamImage = ({ testId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const storageRef = ref(storage, `testExams/${file.name}`);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Cập nhật tài liệu trong Firestore với URL của ảnh
        const testExamDocRef = doc(db, "testExams", testId);
        await updateDoc(testExamDocRef, {
          ImageURL: downloadURL,
        });

        alert("Image uploaded and metadata saved!");
      } catch (error) {
        console.error("Error uploading image or saving metadata:", error);
        alert("Failed to upload image or save metadata.");
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default UploadTestExamImage;
