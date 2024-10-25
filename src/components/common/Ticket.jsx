import React, { useState } from 'react';
import Modal from 'react-modal';

const CreateTicketButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [privacy, setPrivacy] = useState('Public'); // Default to 'Public'
  const [formData, setFormData] = useState({
    id: '',
    SubjectName: '',
    LiveStreamId: '',
    Price: '',
    StartTime: '',
    EndTime: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    closePopup();
    // Add logic to send form data to API or handle as required
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <select
          value={privacy}
          onChange={handlePrivacyChange}
          className={`border rounded p-2 text-black ${
            privacy === 'Public' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <option value="Public" className="bg-white hover:bg-yellow-300">Public</option>
          <option value="Private" className="bg-white hover:bg-yellow-300">Private</option>
        </select>

        {privacy === 'Private' && (
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={openPopup}>
            Create Ticket
          </button>
        )}
      </div>
      
      <Modal
        isOpen={isPopupOpen}
        onRequestClose={closePopup}
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
            <label className="block">Live Stream ID:</label>
            <input
              type="number"
              name="LiveStreamId"
              value={formData.LiveStreamId}
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
          <button type="button" onClick={closePopup} className="bg-gray-500 text-white py-2 px-4 rounded">
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateTicketButton;
