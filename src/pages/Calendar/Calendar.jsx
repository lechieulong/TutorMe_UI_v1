import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/style.css';
import Header from '../../components/common/Header';

const localizer = momentLocalizer(moment);

// Example events
const events = [
    {
        title: 'Meeting with John',
        start: new Date(2024, 7, 24, 10, 0), // September 24, 2024, 10:00 AM
        end: new Date(2024, 7, 24, 11, 0), // September 24, 2024, 11:00 AM
        allDay: false
    },
    {
        title: 'Project Deadline',
        start: new Date(2024, 8, 25), // September 25, 2024
        end: new Date(2024, 8, 25),
        allDay: true
    },
    {
        title: 'Lunch with Sarah',
        start: new Date(2024, 8, 26, 12, 30), // September 26, 2024, 12:30 PM
        end: new Date(2024, 8, 26, 13, 30), // September 26, 2024, 1:30 PM
        allDay: false
    },
    {
        title: 'Conference Call',
        start: new Date(2024, 9, 27, 15, 0), // September 27, 2024, 3:00 PM
        end: new Date(2024, 9, 27, 16, 0), // September 27, 2024, 4:00 PM
        allDay: false
    }
];

const MyCalendar = () => {
    return (
        <div className="relative bg-gray-100 flex-1">
            <Header />
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
    );
};

export default MyCalendar;