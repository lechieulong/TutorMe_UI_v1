import React, { useState } from 'react';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CheckBanlance,GiveMeMyMoney,GetBanlance } from './PayOS';
import {toast } from "react-toastify";
import { convert32BytesToUUID } from './LiveStreamFrame';

const url= import.meta.env.VITE_Backend_URL;

async function sendGift(GiftId, GiftURL,UserName,userId, roomID,handleSendCommand) {
  const user=convert32BytesToUUID(userId);
  try {
    const gift = await getGift(GiftId);
    if (await CheckBanlance(gift.price)) {
      // Nếu số dư đủ, gửi lệnh để gửi quà
      if(await handleSendCommand(UserName, GiftURL)){
        await GiveMeMyMoney(user,gift.price*-1,`Buy_Gift ${gift.name} ${GiftId}`);
        await GiveMeMyMoney(roomID,gift.price,`Receive_Gift ${gift.name} ${GiftId} ${user}`);
        const formData={
          userId: user,
          giftId: GiftId,
          receiverId: roomID,
          amount: gift.price
        } 
        await AddUser_Gift(formData);

      toast.success("Gift sent successfully.");
      }else{
        toast.error("Gift sent Fail.");
      }
      
    } else {
      // Hiện thông báo khi số dư không đủ
      const userChoice = window.confirm("Số dư không đủ. Bạn có muốn nạp tiền không?");
      
      if (userChoice) {
        // Redirect đến trang nạp tiền nếu người dùng nhấn 'Có'
        window.location.href = "/Payment"; // Thay "/nap-tien" bằng URL trang nạp tiền của bạn
      } else {
        // Thông báo giao dịch bị hủy bỏ
        toast.error("Gift sent Fail.");
      }
    }
  } catch (error) {
    console.error("Error sending gift:", error);
  }
}

const getGift= async (id)=>{
  try {
    const response = await axios.get(`${url}/api/Gift/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching gifts:', error);
    setError('Có lỗi xảy ra khi tải danh sách quà tặng.');
  }
}
const AddUser_Gift= async (formData)=>{
  try {
    const response = await axios.post(`${url}/api/User_Gift`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching gifts:', error);
    setError('Có lỗi xảy ra khi tải danh sách quà tặng.');
  }
}
const GiftList = ({UserName,userId,roomID,handleSendCommand} ) => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // Trạng thái để kiểm soát hiển thị danh sách

  const fetchGifts = async () => {
    setLoading(true);
    setError(null); // Reset lỗi trước khi gọi API
    try {
      const response = await axios.get(`${url}/api/Gift`);
      console.log(response.data);
      setGifts(response.data);
    } catch (error) {
      console.error('Error fetching gifts:', error);
      setError('Có lỗi xảy ra khi tải danh sách quà tặng.');
    } finally {
      setLoading(false);
    }
  };

  const toggleGiftList = () => {
    if (!isVisible) {
      fetchGifts(); // Gọi API khi hiện danh sách
    }
    setIsVisible(!isVisible); // Đảo ngược trạng thái hiển thị
  };

  return (
    <div>
      <button onClick={toggleGiftList} className="bg-blue-500 text-white py-2 px-4 rounded">
        {isVisible ? 'Ẩn danh sách quà tặng' : 'Hiện danh sách quà tặng'}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Hiển thị danh sách quà tặng nếu isVisible là true */}
      {isVisible && (
        <ul className="flex flex-wrap mt-4">
          {gifts.map(gift => (
            <li key={gift.id} className="w-1/5 p-2 mb-2 border relative">
              <button onClick={() => sendGift(gift.id, gift.url,UserName,userId, roomID,handleSendCommand)} className="block w-full h-full focus:outline-none">
               <DotLottieReact src={gift.url} loop autoplay />
               <div className="absolute inset-0 flex flex-col justify-center items-center text-black bg-opacity-50">
               <h3 className="font-bold">{gift.name}</h3>
               <p>Price: {gift.price}</p>
               </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GiftList;
