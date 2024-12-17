import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Notification from "./Notification";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Thêm các định dạng ảnh vào allowedExtensions
const allowedExtensions = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "image/jpeg", // .jpg, .jpeg
  "image/png", // .png
  "image/gif", // .gif
  "image/webp", // .webp
];

export default function InputFileUpload({ type, onUpload }) {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("yes");

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const invalidFiles = files.filter(
      (file) => !allowedExtensions.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setNotificationMessage(
        `Unsupported file type(s) detected. Please upload Word, Excel, PowerPoint, or image files only.`
      );
      setNotificationType("no");
      return;
    }

    try {
      if (onUpload) {
        await onUpload({ type, files });
      }
      setNotificationMessage(
        `${files.length} file(s) uploaded successfully for ${type}.`
      );
      setNotificationType("yes");
    } catch {
      setNotificationMessage(`Failed to upload file(s) for ${type}.`);
      setNotificationType("no");
    }
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload {type}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
      <Notification
        message={notificationMessage}
        onClose={() => setNotificationMessage("")}
        shoud={notificationType}
      />
    </>
  );
}
