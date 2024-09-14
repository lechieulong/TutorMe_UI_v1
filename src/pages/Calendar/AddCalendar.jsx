import { useState } from "react";

const AddCalendar = ({ onClose, onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = () => {
    const newEvent = {
      title,
      start: startDate,
      end: endDate,
    };
    onAddEvent(newEvent);
    onClose();
  };

  return (
    <div className="add-calendar-modal">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
      />
      <input
        type="date"
        value={startDate.toISOString().slice(0, 10)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <input
        type="date"
        value={endDate.toISOString().slice(0, 10)}
        onChange={(e) => setEndDate(new Date(e.target.value))}
      />
      <button onClick={handleSubmit}>Add Event</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddCalendar;
