// src/components/common/LiveStreamFrame.jsx
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import { useState, useEffect } from "react";
import React from "react";
import { getUser } from "../../service/GetUser";
import axios from "axios";
import GiftList from "./Gift";
import { ZIM } from 'zego-zim-web';
import GiftNotification from "./ShowGift";
import { isHaveTicket } from "./Ticket";
import CreateTicketButton from "./Ticket";
import { ToastContainer } from "react-toastify";
import { GetUserByID } from "../../redux/users/UserSlice";
import { useDispatch } from "react-redux";
import apiURLConfig from "../../redux/common/apiURLConfig";
// Truy cập các biến môi trường
const appID = Number(import.meta.env.VITE_APP_ID);
const serverSecret = import.meta.env.VITE_SERVER_SECRET;
const url = apiURLConfig.baseURL;
let zp = null;

// Hàm chuyển UUID sang chuỗi 32 byte (xóa dấu gạch nối)
export const convertUUIDTo32Bytes = (uuid) => {
  return uuid.replaceAll("-", "");
};

// Hàm chuyển chuỗi 32 byte thành UUID (thêm dấu gạch nối)
export const convert32BytesToUUID = (uuid32Bytes) => {
  return `${uuid32Bytes.slice(0, 8)}-${uuid32Bytes.slice(
    8,
    12
  )}-${uuid32Bytes.slice(12, 16)}-${uuid32Bytes.slice(
    16,
    20
  )}-${uuid32Bytes.slice(20)}`;
};

// Lấy danh sách phiên phát sóng trực tiếp
const fetchStreamSessions = async () => {
  try {
    const response = await axios.get(`${url}/StreamSession`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stream sessions:", error);
    return [];
  }
};

// Tạo Phiên Live
export const createStreamSession= async (LiveStreamId,Name,Type,Status)=>{
  console.log(LiveStreamId,Type)
  const fomdata={
    name:Name,
    Status:Status,
    Type:Type,
    LiveStreamId:LiveStreamId
  }
  try{
    const respone = await axios.post(`${url}/StreamSession`, fomdata, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Create StreamSession: "+respone);
  }catch(err){
    console.error(err);
  }
}
// cập nhật Phiên Live
export const UpdateStreamSession= async (LiveStreamId,type)=>{
  const StreamSession= await getStreamSession(LiveStreamId);
  if(StreamSession==null){
    return;
  }
  const fomdata={
    Id:StreamSession.id,
    Name:StreamSession.name,
    Status:1,
    StartTime:StreamSession.startTime,
    EndTime:new Date().toISOString(),
    Type:type,
    LiveStreamId:StreamSession.liveStreamId
  }
  try{
    const respone = await axios.put(`${url}/StreamSession`, fomdata, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("End StreamSession: "+respone);
  }catch(err){
    console.error(err);
  }
}



// Kết Thúc Phiên Live
const EndStreamSession= async (LiveStreamId)=>{
  const StreamSession= await getStreamSession(LiveStreamId);
  if(StreamSession==null){
    return;
  }
  const fomdata={
    Id:StreamSession.id,
    Name:StreamSession.name,
    Status:0,
    StartTime:StreamSession.startTime,
    EndTime:new Date().toISOString(),
    Type:StreamSession.type,
    LiveStreamId:StreamSession.liveStreamId
  }
  try{
    const respone = await axios.put(`${url}/StreamSession`, fomdata, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("End StreamSession: "+respone);
  }catch(err){
    console.error(err);
  }
}
// Tìm Kiếm phiên live theo LiveStreamID
export const getStreamSession = async (liveId) => {
  try {
    const response = await axios.get(`${url}/StreamSession/${liveId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stream sessions:', error);
    return null;
  }
};

// Hàm tạo ID ngẫu nhiên
function randomID(len) {
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Hàm lấy tham số từ URL
export function getUrlParams(url = window.location.href) {
  return new URLSearchParams(url.split("?")[1]);
}

// Hàm chuyển byte sang chuỗi hex
export const bytesToHex = (bytes) => {
  return Array.from(bytes, (byte) => {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
};

// Hàm tạo chữ ký bảo mật
export const generateSignature = (
  appID,
  signatureNonce,
  serverSecret,
  timestamp
) => {
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
export async function GetListIdIsLiveStream() {
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
    const sessions = await fetchStreamSessions();
    if(sessions.length==0){
      return null;
    }
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
  const [privacy, setPrivacy] = useState('Public'); // Default to 'Public'
  const [giftNotifications, setGiftNotifications] = useState([]); // Mảng thông báo quà tặng
  const [Access, setAccess] = useState(null);
  const user = getUser();
  const dispatch = useDispatch();
  const UserId = user ? convertUUIDTo32Bytes(user.sub) : randomID(32);
  const role_str =
    convert32BytesToUUID(UserId) === roomID ? "Host" : "Audience";
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const Listid = await GetListIdIsLiveStream();
        const roomIdFromUrl = getUrlParams().get('roomID');
        if (roomIdFromUrl) {
          if(await getStreamSession(roomIdFromUrl)){
            setRoomID(roomIdFromUrl);
          }
        } else if (Listid!=null) {
          setRoomID(Listid[0]);
        }    

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
        const StreamSession = await getStreamSession(roomID);
        setPrivacy(StreamSession.type==1?'Private':'Public');
        const isPublic=!StreamSession.type==1;
        const isHaveTikcet=await isHaveTicket(roomID,convert32BytesToUUID(UserId));
        if(isPublic||!isPublic&&isHaveTikcet||!isPublic&&role_str==="Host"||!isPublic&&user?.role?.includes("ADMIN")){
           setAccess(true);
        }else{
          setAccess(false);
        }
    };
    if (roomID) checkAccess();
  }, [roomID,privacy]);
  

  useEffect(() => {
    const metting = async () => {
      myMeeting(document.getElementById("meetingContainer"));
    };
    if (Access) {
      metting();
    }
  }, [Access]);

  // Hàm thêm thông báo quà tặng
  const addGiftNotification = (UserName, GiftURL) => {
    const newNotification = { UserName, GiftURL, id: Date.now() };
    setGiftNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
    setTimeout(
      () =>
        setGiftNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== newNotification.id
          )
        ),
      3000
    );
  };
  if (loading){
    return <div
    className={`relative border-4 border-blue-500 rounded-lg overflow-hidden ${className}`}
    style={{ width, height }}
  >
    {/* Background */}
    <div
      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
    ></div>
  
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/50 flex items-center justify-center"
    >
      <span className="text-white text-lg font-semibold animate-pulse">
        Loading
      </span>
    </div>
  </div>
  }

  if (!roomID) {
    return <div className={`relative border-4 border-blue-500 rounded-lg overflow-hidden ${className}`} style={{ width, height }}>
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
  
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/50 flex items-center justify-center"
    >
      <span className="text-white text-lg font-semibold animate-pulse">
      No Room Exists 
      </span>
    </div>
  </div>
    
  }


  if(!Access){
    return (
      <div
        className={`relative border-4 border-blue-500 rounded-lg overflow-hidden ${className}`}
        style={{ width, height }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center space-y-4">
          <span className="text-white text-lg font-semibold animate-pulse text-center">
            This room is private, Please buy ticket.
          </span>
          {user != null && (
            <CreateTicketButton
              roomID={roomID}
              role={role_str}
              privacy={privacy}
              setPrivacy={setPrivacy}
            />
          )}
        </div>
      </div>
    );
  }
   // Information about the user from backend
  const UserName = user?user.name:"guest";
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
  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      UserId,
      UserName
    );
    zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.addPlugins({ ZIM });
    setTimeout(() => {
      zp.hasJoinedRoom=false;
      zp.joinRoom({
        onJoinRoom: () => {
          console.log("user join");
          // Get the roomID
          let roomID = zp.getRoomID();
          // Store it in sessionStorage
          sessionStorage.setItem('roomID', roomID);
        },
        onLiveStart:(usere)=>{
          if(role_str=='Host'){
          createStreamSession(roomID,privacy=='Public'?0:1)
          }
          
        },
        onLiveEnd:(usere)=>{
         EndStreamSession(roomID);
          
        },
        onLeaveRoom: () =>{
          console.log("user leave");
          sessionStorage.removeItem('roomID');
        },
        onUserAvatarSetter:(userList)=>{
          userList.forEach(u => {
            dispatch(GetUserByID(convert32BytesToUUID(u.userID))).then((userInfo) => {
              u.setUserAvatar(userInfo.payload.imageURL);
          });
        })
        },
        startLiveButtonText: "Start Live",
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
        showTextChat: role_str === "Host"||window.location.pathname.includes("/live-stream")?true:false,
        showPreJoinView:false,
        showRoomDetailsButton: role_str === "Host"||window.location.pathname.includes("/live-stream")?true:false,
        showLeavingView: false,
        showRemoveUserButton: role_str === "Host"?true:false,
        onInRoomCustomCommandReceived(messages) {
          if(messages[0].command.Type=="Gift"){
             const { UserName, GiftURL } = messages[0].command;
            addGiftNotification(UserName, GiftURL);
          }else if(messages[0].command.Type=="Privacy"){
            const Privacy=messages[0].command;
            setPrivacy(Privacy);
          }else if(messages[0].command.Type=="Test"){
           console.log("hello");
          }
          ;
        },
      }); 
    }, 3000);
  };
  // Hàm gửi thông báo quà tặng
  const handleSendCommand = (UserName, GiftURL) => {
    if (zp) {
      return zp
        .sendInRoomCustomCommand({ Type: "Gift", UserName, GiftURL })
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

  // Hàm gửi thông báo thay doi
  const handleUpdateCommand = (Privacy) => {
    if (zp&&zp.hasJoinedRoom) {
      return zp
        .sendInRoomCustomCommand({ Type: "Privacy", Privacy })
        .then(() => {
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
    <div className={`relative border-4 border-blue-500 rounded-lg overflow-hidden  inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${className}`}>
    {user!=null&&window.location.pathname.includes("/live-stream")&&!user?.role.includes("USER")&&<CreateTicketButton roomID={roomID} role={role_str} privacy={privacy} setPrivacy={setPrivacy} handleUpdateCommand={handleUpdateCommand}/>} 
    <div  className={`relative border-blue-500 rounded-lg overflow-hidden ${className}`} style={{ width, height }}> <ToastContainer/>       
     <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" style={{ position: "relative" }}>
        <div id="meetingContainer" className={`bg-black ${className}`} style={{ width, height }}></div>
     </div>
    </div>
    {role_str != "Host"&&user!=null&&window.location.pathname.includes("/live-stream")&&<GiftList userId={UserId} roomID={roomID} UserName={UserName} handleSendCommand={handleSendCommand} />}
    <GiftNotification notifications={giftNotifications} /> {/* Sử dụng component thông báo */}
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
