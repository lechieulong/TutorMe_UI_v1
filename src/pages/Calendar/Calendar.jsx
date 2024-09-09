import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/style.css';
import Header from '../../components/common/Header';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([
        {
            title: 'Meeting with John',
            //month start from 0 (7 is Aug)
            start: new Date(2024, 7, 24, 10, 0),
            end: new Date(2024, 7, 24, 11, 0),
            allDay: false
        },
        {
            title: 'Project Deadline',
            start: new Date(2024, 8, 25),
            end: new Date(2024, 8, 25),
            allDay: true
        },
        {
            title: 'Lunch with Sarah',
            start: new Date(2024, 8, 26, 12, 30),
            end: new Date(2024, 8, 26, 13, 30),
            allDay: false
        },
        {
            title: 'Conference Call',
            start: new Date(2024, 9, 27, 15, 0),
            end: new Date(2024, 9, 27, 16, 0),
            allDay: false
        }
    ]);

    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', allDay: false });
    const [showForm, setShowForm] = useState(false);

    const handleAddEvent = (e) => {
        e.preventDefault();
        setEvents([...events, { ...newEvent, start: new Date(newEvent.start), end: new Date(newEvent.end) }]);
        setNewEvent({ title: '', start: '', end: '', allDay: false });
        setShowForm(false);
    };

    return (
        <div className="relative bg-gray-100 flex-1">
            <Header />
            <div className="p-2">
                {/* <button
                    className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setShowForm(!showForm)}
                >
                    Add Calendar
                </button>
                {showForm && (
                    <form onSubmit={handleAddEvent} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-700">Event Title</label>
                            <input
                                type="text"
                                className="w-full mt-2 p-2 border rounded-lg"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Start Date and Time</label>
                            <input
                                type="datetime-local"
                                className="w-full mt-2 p-2 border rounded-lg"
                                value={newEvent.start}
                                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">End Date and Time</label>
                            <input
                                type="datetime-local"
                                className="w-full mt-2 p-2 border rounded-lg"
                                value={newEvent.end}
                                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={newEvent.allDay}
                                    onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                                />
                                All Day Event
                            </label>
                        </div>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            Add Event
                        </button>
                    </form>
                )} */}
                <div className="myCustomHeight">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyCalendar;
