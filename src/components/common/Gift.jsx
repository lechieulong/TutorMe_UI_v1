import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CheckBanlance, GiveMeMyMoney } from './PayOS';
import { toast } from "react-toastify";
import { convert32BytesToUUID } from './LiveStreamFrame';
import apiURLConfig from "../../redux/common/apiURLConfig";
import { FaGift } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const url = apiURLConfig.baseURL;

// Gửi quà tặng
async function sendGift(GiftId, GiftURL, UserName, userId, roomID, handleSendCommand) {
  const user = convert32BytesToUUID(userId);
  try {
    const gift = await getGift(GiftId);
    if (await CheckBanlance(gift.price)) {
      if (await handleSendCommand(UserName, GiftURL)) {
        await GiveMeMyMoney(user, gift.price * -1, `${gift.name} ${user} ${roomID}`,"Buy_Gift");
        await GiveMeMyMoney(roomID, gift.price, `${gift.name} ${user} ${roomID}`,"Receive_Gift");
        const formData = {
          userId: user,
          giftId: GiftId,
          receiverId: roomID,
          amount: gift.price,
        };
        await AddUser_Gift(formData);
        toast.success("Gift sent successfully.");
      } else {
        toast.error("Gift sent Fail.");
      }
    } else {
      const userChoice = window.confirm("Số dư không đủ. Bạn có muốn nạp tiền không?");
      if (userChoice) window.location.href = "/Payment";
      else toast.error("Gift sent Fail.");
    }
  } catch (error) {
    console.error("Error sending gift:", error);
  }
}

// Lấy thông tin quà tặng
const getGift = async (id) => {
  try {
    const response = await axios.get(`${url}/Gift/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching gifts:', error);
  }
};

// Thêm thông tin User_Gift
const AddUser_Gift = async (formData) => {
  try {
    const response = await axios.post(`${url}/User_Gift`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving user gift:', error);
  }
};

const GiftList = ({ UserName, userId, roomID, handleSendCommand }) => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const visibleCount = 5; // Hiển thị 5 quà tại một thời điểm
  const [isVisible, setIsVisible] = useState(false);

  const fetchGifts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${url}/Gift`);
      setGifts(response.data);
    } catch (error) {
      console.error('Error fetching gifts:', error);
      setError('Có lỗi xảy ra khi tải danh sách quà tặng.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setVisibleIndex(Math.min(visibleIndex + visibleCount, gifts.length - visibleCount));
  };

  const handlePrev = () => {
    setVisibleIndex(Math.max(visibleIndex - visibleCount, 0));
  };

  const toggleGiftList = () => {
    setIsVisible(!isVisible);
    if (!isVisible) fetchGifts(); // Gọi API nếu mở lần đầu
  };

  useEffect(() => {
    if (isVisible) fetchGifts();
  }, [isVisible]);
  
  return (
    <div>
      {/* Nút hiển thị danh sách gift */}
      <button
        onClick={toggleGiftList}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        <FaGift />
      </button>
  
      {isVisible && (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
  
          <div className="mt-4 relative overflow-hidden">
            <div
              className={`flex transition-transform duration-300 ease-in-out`}
            >
              {gifts.slice(visibleIndex, visibleIndex + visibleCount).map(gift => (
                <div
                  key={gift.id}
                  className="w-1/5 relative flex-shrink-0 p-2"
                >
                  <button
                    onClick={() =>
                      sendGift(gift.id, gift.url, UserName, userId, roomID, handleSendCommand)
                    }
                    className="block w-full h-full focus:outline-none bg-gradient-to-r from-blue-300 to-purple-300 bg-opacity-70 rounded-lg"
                  >
                    <DotLottieReact src={gift.url} loop autoplay />
                    <div className="absolute inset-0 flex flex-col justify-start items-start text-black bg-opacity-50 p-2">
                      <p className="text-sm">$:{gift.price}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
  
            {/* Buttons điều hướng nằm giữa, phủ lên danh sách gift */}
            <button
              onClick={handlePrev}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg ${visibleIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={visibleIndex === 0}
            >
            <FontAwesomeIcon icon={faChevronLeft} />
              
            </button>
            <button
              onClick={handleNext}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg ${visibleIndex + visibleCount >= gifts.length ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={visibleIndex + visibleCount >= gifts.length}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default GiftList;
