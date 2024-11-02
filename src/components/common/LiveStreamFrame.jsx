// src/components/common/LiveStreamFrame.jsx
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import { useState, useEffect } from "react";
import React from "react";
import { getUser } from '../../service/GetUser';
import axios from 'axios';
import GiftList from "./Gift";
import { ZIM } from 'zego-zim-web';
import initializeZim from "./Zim";
import GiftNotification from "./ShowGift";
import { isHaveTicket } from "./Ticket";
import CreateTicketButton from "./Ticket";
import { ToastContainer } from "react-toastify";


// Truy cập các biến môi trường
const appID = Number(import.meta.env.VITE_APP_ID);
const serverSecret = import.meta.env.VITE_SERVER_SECRET;
const url= import.meta.env.VITE_Backend_URL;
let zp = null;

// Hàm chuyển UUID sang chuỗi 32 byte (xóa dấu gạch nối)
export const convertUUIDTo32Bytes = (uuid) => {
  return uuid.replaceAll('-', '');
};

// Hàm chuyển chuỗi 32 byte thành UUID (thêm dấu gạch nối)
export const convert32BytesToUUID = (uuid32Bytes) => {
  return `${uuid32Bytes.slice(0, 8)}-${uuid32Bytes.slice(8, 12)}-${uuid32Bytes.slice(12, 16)}-${uuid32Bytes.slice(16, 20)}-${uuid32Bytes.slice(20)}`;
};

// Lấy danh sách phiên phát sóng trực tiếp
const fetchStreamSessions = async () => {
  try {
    const response = await axios.get(`${url}/api/StreamSession`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stream sessions:', error);
    return [];
  }
};

// Kiểm tra xem phiên phát sóng có công khai không
const isPublicLive = async (liveId) => {
  try {
    const sessions = await fetchStreamSessions();
    return sessions.some(session => session.liveStreamId === liveId && session.type === 0);
  } catch (error) {
    console.error('Error checking if live is public:', error);
    return false;
  }
};

// Hàm tạo ID ngẫu nhiên
function randomID(len) {
  const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Hàm lấy tham số từ URL
function getUrlParams(url = window.location.href) {
  return new URLSearchParams(url.split("?")[1]);
}

// Hàm chuyển byte sang chuỗi hex
export const bytesToHex = (bytes) => {
  return Array.from(bytes, (byte) => {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
};

// Hàm tạo chữ ký bảo mật
export const generateSignature = (appID, signatureNonce, serverSecret, timestamp) => {
  const str = `${appID}${signatureNonce}${serverSecret}${timestamp}`;
  return CryptoJS.MD5(str).toString(); // Tạo mã băm MD5
};

// Hàm tạo chuỗi hex ngẫu nhiên
export const generateRandomHexString = () => {
  const bytes = new Uint8Array(8); // 8 bytes (64 bits)
  window.crypto.getRandomValues(bytes); // Generate cryptographically secure random values
  return bytesToHex(bytes); // Convert the byte array to a hex string
};

// Lấy danh sách ID phát sóng trực tiếp
export async function GetListIdIsLiveStream(appID, serverSecret, fetchStreamSessions) {
  const fetchRoomData = async () => {
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const signatureNonce = generateRandomHexString(); // Generate random nonce

    const signature = generateSignature(appID, signatureNonce, serverSecret, timestamp);

    const baseURL = `https://rtc-api.zego.im/?Action=DescribeUserNum`;
    const sessions = await fetchStreamSessions();
    const roomIds = sessions.map(session => session.liveStreamId);

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
    
      if (data.Code === 0) {
        // API success
        const sortedRooms = data.Data.UserCountList.sort(
          (a, b) => b.UserCount - a.UserCount
        );

        // Return the list of RoomIds in descending order of UserCount
        return sortedRooms.map((room) => room.RoomId);
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
  return await fetchRoomData();
}

// Component khung phát sóng trực tiếp
const LiveStreamFrame = ({ width, height, className }) => {
  const [roomID, setRoomID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [giftNotifications, setGiftNotifications] = useState([]); // Mảng thông báo quà tặng
  const [Access, setAccess] = useState(null);
  const user = getUser();
  const UserId =user?convertUUIDTo32Bytes(user.sub):randomID(32);
  const role_str = convert32BytesToUUID(UserId) === roomID ? "Host" : "Audience";
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const Listid = await GetListIdIsLiveStream(appID,serverSecret,fetchStreamSessions);
        setRoomID(getUrlParams().get('roomID')||Listid[0]);
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);

  useEffect(() => {
    const checkAccess = async () => {
        const isPublic = await isPublicLive(roomID);
        const isHaveTikcet=await isHaveTicket(roomID,convert32BytesToUUID(UserId));
        if(isPublic||!isPublic&&isHaveTikcet||!isPublic&&role_str==="Host"){
           setAccess(true);
        }else{
          setAccess(false);
        }
    };
    if (roomID) checkAccess();
}, [roomID]);

useEffect(() => {
  const metting=async()=>{
    const element = document.getElementById("meetingContainer");
    zp = ZegoUIKitPrebuilt.create(kitToken);
     zp.addPlugins({ZIM});
    myMeeting(element);
  }
  if(Access){
    metting();
  } 
}, [Access]);


    // Hàm thêm thông báo quà tặng
  const addGiftNotification = (UserName, GiftURL) => {
    const newNotification = { UserName, GiftURL, id: Date.now() };
    setGiftNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    setTimeout(() => setGiftNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== newNotification.id)), 3000);
  };
  if (loading) return <div>Loading...</div>;

  if (!roomID) return <div>No room data available</div>;

  if(!Access){
        return (  
        <div className={`bg-black ${className}`} style={{ width, height, display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column' }}>
         {user!=null&&<CreateTicketButton LiveStreamId={roomID} role={role_str}/>}
         <p>Đây là private Live vui lòng mua vé</p>
        </div>
        );
  }
   // Information about the user from backend
  const UserName = user?user.userName:"guest";
  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  const sharedLinks = [
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
    const rom =sessionStorage.getItem('roomID');
    zp.hasJoinedRoom=false;
      zp.joinRoom({
        onJoinRoom: () => {
          console.log("user join");
          // Get the roomID
          let roomID = zp.getRoomID();
          // Store it in sessionStorage
          sessionStorage.setItem('roomID', roomID);
        },
        onLeaveRoom: () =>{
          console.log("user leave");
          sessionStorage.removeItem('roomID');
          zp.destroy();
        },
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
        showTextChat: role_str === "Host"||window.location.pathname==="/live-stream"?true:false,
        showPreJoinView: role_str === "Host"&&rom!=roomID?true:false,
        showRoomDetailsButton: role_str === "Host"||window.location.pathname==="/live-stream"?true:false,
        showLeavingView: false,
        showRemoveUserButton: role_str === "Host"?true:false,
        onInRoomCustomCommandReceived(messages) {
          if(messages[0].command.Type=="Gift"){
             const { UserName, GiftURL } = messages[0].command;
            addGiftNotification(UserName, GiftURL);
          };
        },
      }); 
  };
    // Hàm gửi thông báo quà tặng
  const handleSendCommand = (UserName, GiftURL) => {
    if (zp) {
        return zp.sendInRoomCustomCommand({ Type: 'Gift', UserName, GiftURL })
            .then(() => {
                addGiftNotification(UserName, GiftURL);
                return true;
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
    } else {
        console.error("ZegoUIKitPrebuilt instance (zp) chưa được khởi tạo.");
        return false;
    }
};

  return (
    <div> <ToastContainer/>  
     {user!=null&&<CreateTicketButton LiveStreamId={roomID} role={role_str}/>} 
     <div style={{ position: "relative" }}>
    <div id="meetingContainer" className={`bg-black ${className}`} style={{ width, height }}></div>
     {role_str != "Host"&&user!=null&&<GiftList userId={UserId} roomID={roomID} UserName={UserName} handleSendCommand={handleSendCommand} />}
      
      <GiftNotification notifications={giftNotifications} /> {/* Sử dụng component thông báo */}
     </div>
     
    </div>
    
  );
};
  

// Define PropTypes to validate the prop types
LiveStreamFrame.propTypes = {
  width: PropTypes.string.isRequired, // Width size
  height: PropTypes.string.isRequired, // Height size
  className: PropTypes.string, // Additional CSS classes
};

export default LiveStreamFrame;
