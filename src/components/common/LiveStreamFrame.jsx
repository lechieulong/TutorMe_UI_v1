// src/components/common/LiveStreamFrame.jsx
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import { useState, useEffect } from "react";
import React from "react";

// Accessing environment variables
const appID = import.meta.env.VITE_APP_ID;
const serverSecret = import.meta.env.VITE_SERVER_SECRET;

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

async function GetIdByMostView() {
  const bytesToHex = (bytes) => {
    return Array.from(bytes, (byte) => {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    }).join("");
  };

  const generateSignature = (
    appID,
    signatureNonce,
    serverSecret,
    timestamp
  ) => {
    const str = `${appID}${signatureNonce}${serverSecret}${timestamp}`;
    const md5 = CryptoJS.MD5(str).toString(); // Create MD5 hash
    return md5;
  };

  const generateRandomHexString = () => {
    const bytes = new Uint8Array(8); // 8 bytes (64 bits)
    window.crypto.getRandomValues(bytes); // Generate cryptographically secure random values
    return bytesToHex(bytes); // Convert the byte array to a hex string
  };

  const fetchRoomData = async () => {
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const signatureNonce = generateRandomHexString(); // Generate random nonce

    const signature = generateSignature(
      appID,
      signatureNonce,
      serverSecret,
      timestamp
    );

    const baseURL = `https://rtc-api.zego.im/?Action=DescribeUserNum`;

    const roomIds = ["12345", "12323"]; // Define room IDs here

    const roomIdParams = roomIds.map((id) => `RoomId[]=${id}`).join("&");
    const generatedUrl = `${baseURL}&${roomIdParams}&AppId=${appID}&SignatureNonce=${signatureNonce}&Timestamp=${timestamp}&Signature=${encodeURIComponent(
      signature
    )}&SignatureVersion=2.0`;

    try {
      const response = await fetch(generatedUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);

      if (data.Code === 0) {
        // API success
        // Find room with the highest number of users
        const roomWithMostViews = data.Data.UserCountList.reduce(
          (max, room) => (room.UserCount > max.UserCount ? room : max),
          data.Data.UserCountList[0]
        );
        return roomWithMostViews.RoomId; // Return room ID with the most users
      } else {
        console.error("API Error:", data.Message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  // Wait for fetchRoomData to complete and return the result
  const id = await fetchRoomData();
  return id;
}

const LiveStreamFrame = ({ width, height, className }) => {
  const [roomID, setRoomID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const id = await GetIdByMostView();
        setRoomID(id);
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!roomID) {
    return <div>No room data available</div>;
  }

  // Information about the user from backend
  const url = window.location.href;
  const UserId = url === "http://localhost:5173/" ? randomID(5) : "12345";
  const UserName = "guest";
  const role_str = UserId === roomID ? "Host" : "Audience";
  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [
    {
      name: "Join as audience",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID,
    },
  ];

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    UserId,
    UserName
  );

  const myMeeting = (element) => {
    if (!element) return; // Ensure element is available

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
      showTextChat: role_str === "Host",
      showPreJoinView: role_str === "Host",
      showRoomDetailsButton: role_str === "Host",
      showLeavingView: false,
    });

    // Cleanup when component unmounts
    return () => zp.leaveRoom();
  };

  return (
    <div
      className={`bg-black ${className}`}
      style={{ width, height }}
      ref={myMeeting}
    ></div>
  );
};

// Define PropTypes to validate the prop types
LiveStreamFrame.propTypes = {
  width: PropTypes.string.isRequired, // Width size
  height: PropTypes.string.isRequired, // Height size
  className: PropTypes.string, // Additional CSS classes
};

export default LiveStreamFrame;
