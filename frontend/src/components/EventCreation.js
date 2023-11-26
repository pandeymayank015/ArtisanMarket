import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../utils/ApiUrls';
import { useNavigate } from 'react-router-dom';

const EventCreation = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const eventData = {
      eventName,
      eventDate,
      eventTime,
      eventVenue,
      eventDescription,
    };
  
    try {
        // Retrieve the JWT token from your authentication mechanism (e.g., localStorage)
        const token = localStorage.getItem('jwtToken');
  
        // Include the JWT token in the request headers
        const response = await axios.post(
          url + '/events/create',
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log('Server Response:', response.data);
        if (response.status === 200) {
            alert('Event created successfully!');
            console.log('Server Response:', response.data);
            navigate('/events');
          } else {
            alert('Error creating event. Please try again.');
            console.error('Error creating event:', response.data);
          }
      } catch (error) {
        console.error('Error creating event:', error);
      }
    };
  

  return (
    <div>
      <h2>Create an Event</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Event Name:</label>
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        <br />

        <label>Event Date:</label>
        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        <br />

        <label>Event Time:</label>
        <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
        <br />

        <label>Event Venue:</label>
        <input type="text" value={eventVenue} onChange={(e) => setEventVenue(e.target.value)} />
        <br />

        <label>Event Description:</label>
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreation;
