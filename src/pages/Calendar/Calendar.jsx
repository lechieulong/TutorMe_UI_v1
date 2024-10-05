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

    const eventsFromRedux = useSelector(state => state.event.events); // Make sure this points to your events in Redux
    console.log("Events: ", eventsFromRedux);
    const [events, setEvents] = useState([]);

    // Check authentication token
    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/"); // Nếu ko có token, chuyển hướng đến Landing Page
        }
    }, [navigate]);

    useEffect(() => {
        dispatch(GetEventByUserId()); // Fetch events when component mounts
    }, [dispatch]);

    useEffect(() => {
        if (eventsFromRedux) {
            setEvents(eventsFromRedux); // Update local events when redux events change
        }
    }, [eventsFromRedux]);

    return (
        <div className="relative bg-gray-100 flex-1">
            <MainLayout>
                <div className="pt-5">
                    <div className="myCustomHeight">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%', width: '100%' }}
                            views={['month', 'week', 'day', 'agenda']}
                            defaultView="agenda"
                            components={{
                                event: ({ event }) => (
                                    <div>
                                        <strong>{event.title}</strong>
                                        {/* Hiển thị mô tả và liên kết nếu có */}
                                        {event.description && <p>{event.description}</p>}
                                        {event.link && (
                                            <a href={event.link} target="_blank" rel="noopener noreferrer">
                                                Join event
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
                                            {/* Week view chỉ hiển thị tiêu đề */}
                                        </span>
                                    ),
                                },
                                day: {
                                    event: ({ event }) => (
                                        <span>
                                            <strong>{event.title}</strong>
                                            {/* Day view chỉ hiển thị tiêu đề */}
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
                                                <a href={event.link} target="_blank" rel="noopener noreferrer">
                                                    Join event
                                                </a>
                                            )}
                                            {/* <p className="text-xs text-gray-500">
                                                Start: {moment(event.start).format('MMMM Do YYYY, h:mm A')}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                End: {moment(event.end).format('MMMM Do YYYY, h:mm A')}
                                            </p> */}
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
