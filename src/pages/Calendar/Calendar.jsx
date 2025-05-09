import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/style.css';
import MainLayout from '../../layout/MainLayout';
import { useEffect, useState } from "react";
import { GetEventByUserId } from "../../redux/event/EventSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Make sure this points to your events in Redux
    const eventsFromRedux = useSelector(state => state.event.events);
    const [events, setEvents] = useState([]);

    // Check authentication token
    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/"); // Nếu ko có token, chuyển hướng đến Landing Page
        }
    }, [navigate]);

    useEffect(() => {
        const fetchEvents = async () => {
            await dispatch(GetEventByUserId()).unwrap()
                .catch((error) => {
                    console.error('Failed to fetch events:', error);
                });
        };
        fetchEvents();
    }, [dispatch]);
    
    useEffect(() => {
        if (eventsFromRedux) {
            setEvents(eventsFromRedux); // Update local events when redux events change
        }
    }, [eventsFromRedux]);

    return (
        <div className="relative bg-gray-100 flex-1">
            <MainLayout>
                <div className="">
                    <div className="myCustomHeight">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%', width: '100%' }}
                            views={['month', 'week', 'day', 'agenda']}
                            defaultView="agenda"
                            onSelectEvent={event => alert(event.description)}
                            components={{
                                event: ({ event }) => (
                                    <div>
                                        <strong>{event.title}</strong>
                                        {/* Hiển thị mô tả và liên kết nếu có */}
                                        {event.description && <p>{event.description}</p>}
                                        {event.link && (
                                            <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-green-500" >
                                                Join meet
                                            </a>
                                        )}
                                    </div>
                                ),
                                month: {
                                    event: ({ event }) => (
                                        <span>
                                            <strong>{event.title}</strong>
                                            {/* Month view chỉ hiển thị tiêu đề */}
                                        </span>
                                    ),
                                },
                                week: {
                                    event: ({ event }) => (
                                        <span>
                                            <strong>{event.title}</strong>
                                            {event.link && (
                                                <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-green-500">
                                                    Join meet
                                                </a>
                                            )}
                                            {/* Week view chỉ hiển thị tiêu đề */}
                                        </span>
                                    ),
                                },
                                day: {
                                    event: ({ event }) => (
                                        <span>
                                            <strong>{event.title}</strong>
                                            {/* Day view chỉ hiển thị tiêu đề */}
                                            {event.link && (
                                                <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-green-500">
                                                    Join meet
                                                </a>
                                            )}
                                        </span>
                                    ),
                                },
                                agenda: {
                                    event: ({ event }) => (
                                        <div>
                                            <strong>{event.title}</strong>
                                            {/* Agenda view hiển thị đầy đủ thông tin */}
                                            {event.description && <p>{event.description}</p>}
                                            {event.link && (
                                                <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-green-500">
                                                    Join meet
                                                </a>
                                            )}
                                        </div>
                                    ),
                                },
                            }}
                        />
                    </div>
                </div>
            </MainLayout>
        </div>
    );
};

export default MyCalendar;
