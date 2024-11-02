import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { getUser } from '../../service/GetUser';
import {ToastContainer ,toast } from "react-toastify";
import { CheckBanlance,GiveMeMyMoney } from './PayOS';

const url = import.meta.env.VITE_Backend_URL;
const user=getUser();
export const isHaveTicket = async (RoomId, UserId) => {
  try {
    const TicketId = await GetTicket(RoomId);
    if (TicketId != null) {
      const response = await axios.get(`${url}/api/User_Ticket/${TicketId.id}/${UserId}`);
      return response.data.id != null;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error Check Ticket:', error);
    return false;
  }
};
const BuyTicket = async (TicketId,UserId,liveStreamId,Price) => {
  try{
    if(await CheckBanlance(Price)){
      await GiveMeMyMoney(UserId,Price*-1,`Buy_Ticket ${TicketId}`);
      await GiveMeMyMoney(liveStreamId,Price,`Ticket ${TicketId} ${UserId}`);
      var formData={
      TicketId:TicketId,
      UserId:UserId,}
      await AddUser_Ticket(formData);
      toast.success("Buy Ticket successfully.");
    }else {
      // Hiện thông báo khi số dư không đủ
      const userChoice = window.confirm("Số dư không đủ. Bạn có muốn nạp tiền không?");
      
      if (userChoice) {
        // Redirect đến trang nạp tiền nếu người dùng nhấn 'Có'
        window.location.href = "/Payment"; // Thay "/nap-tien" bằng URL trang nạp tiền của bạn
      } else {
        // Thông báo giao dịch bị hủy bỏ
        toast.error("Buy Ticket Fail.");
      }
    }
  }catch(error){
    console.error("Error sending gift:", error);
  } 
};
const AddUser_Ticket = async (formData) => {
  try {
      const response = await axios.post(`${url}/api/User_Ticket/`,formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data != null;
  } catch (error) {
    console.error('Error add User_Ticket:', error);
    return false;
  }
}
const GetTicket = async (RoomId) => {
  try {
    const response = await axios.get(`${url}/api/Ticket/${RoomId}`);
    return response.data[0];
  } catch (error) {
    console.error('Error Check Ticket:', error);
    return false;
  }
};

const CreateTicketButton = ({ LiveStreamId, role }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [privacy, setPrivacy] = useState('Public'); // Default to 'Public'
  const [formData, setFormData] = useState({
    SubjectName: '',
    LiveStreamId: LiveStreamId,
    Price: '',
    StartTime: '',
    EndTime: '',
  });
  const [ticketInfo, setTicketInfo] = useState({
    id:'',
    subjectName: '',
    liveStreamId:'',
    price: '',
    startTime: '',
    endTime: '',
  }); // Thêm state để lưu thông tin vé

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/Ticket`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Form submitted successfully:', response.data);
      closePopup();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  const handleBuyTicket = async () => {
      const response = await axios.get(`${url}/api/Ticket/${LiveStreamId}`);
      const { id,subjectName, liveStreamId,price, startTime, endTime } = response.data[0];
      console.log(subjectName);
      setTicketInfo((prevInfo) => ({
        ...prevInfo,
        id,
        subjectName,
        liveStreamId,
        price,
        startTime,
        endTime,
      }));
      openPopup(); 
  };

  return (
    <div>
      {role === 'Host' ? (
        <>
          <div className="flex items-center gap-4 mb-4">
            <select
              value={privacy}
              onChange={(e) => {
                handlePrivacyChange(e);
                if (e.target.value === 'Private') {
                  openPopup();
                }
              }}
              className={`border rounded p-2 text-black ${
                privacy === 'Public' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <option value="Public" className="bg-white hover:bg-yellow-300">Public</option>
              <option value="Private" className="bg-white hover:bg-yellow-300">Private</option>
            </select>
          </div>

          <Modal
            isOpen={isPopupOpen}
            onRequestClose={() => {
              closePopup();
              setPrivacy("Public");
            }}
            contentLabel="Create Ticket"
            ariaHideApp={false}
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h2 className="text-xl mb-4">Create Ticket</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block">Subject Name:</label>
                <input
                  type="text"
                  name="SubjectName"
                  value={formData.SubjectName}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block">Price:</label>
                <input
                  type="text"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block">Start Time:</label>
                <input
                  type="datetime-local"
                  name="StartTime"
                  value={formData.StartTime}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block">End Time:</label>
                <input
                  type="datetime-local"
                  name="EndTime"
                  value={formData.EndTime}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mr-2">
                Submit
              </button>
              <button type="button"  
              onClick={() => {
                    closePopup();
                    setPrivacy("Public");
              }} 
              className="bg-gray-500 text-white py-2 px-4 rounded">
                Cancel
              </button>
            </form>
          </Modal>
        </>
      ) : (
        // Nếu role là user
        <div>
          {/* Thêm thông tin vé ở đây */}
          <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleBuyTicket}>
            Buy Ticket
          </button>

          <Modal
            isOpen={isPopupOpen}
            onRequestClose={closePopup}
            contentLabel="Ticket Information"
            ariaHideApp={false}
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h2 className="text-xl mb-4">Ticket Information</h2>
            {/* Hiển thị thông tin vé ở đây */}
            {ticketInfo ? (
              <div>
                <p><strong>Subject Name:</strong> {ticketInfo.subjectName}</p>
                <p><strong>Price:</strong> {ticketInfo.price}</p>
                <p><strong>Start Time:</strong> {ticketInfo.startTime}</p>
                <p><strong>End Time:</strong> {ticketInfo.endTime}</p>
              </div>
            ) : (
              <p>No ticket information available.</p>
            )}
            <button type="button"  onClick={() => BuyTicket(ticketInfo.id, user.sub,ticketInfo.liveStreamId,ticketInfo.price)} className="bg-green-500 text-white py-2 px-4 rounded mr-2">
             Mua vé
            </button>
            <button type="button" onClick={closePopup} className="bg-gray-500 text-white py-2 px-4 rounded">
              Cancel
            </button>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CreateTicketButton;
