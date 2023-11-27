import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../../utils/ApiUrls';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../events/Event.css';

const EventCreation = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!eventName || !eventDate || !eventTime || !eventVenue || !eventDescription) {
      toast.error('All fields are required');
      return;
    }

     // Validate date (check if it's in the past)
     const selectedDate = new Date(eventDate);
     const currentDate = new Date();
 
     if (selectedDate < currentDate) {
       toast.error('Please select a future date');
       return;
     }

    const eventData = {
      eventName,
      eventDate,
      eventTime,
      eventVenue,
      eventDescription,
    };

    try {
      const token = localStorage.getItem('jwtToken');
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
        toast.success('Event created successfully!');
        console.log('Server Response:', response.data);
        setTimeout(() => {
          navigate('/events');
        }, 3000);
      } else {
        toast.error('Error creating event. Please try again.');
        console.error('Error creating event:', response.data);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className='view-container p-4'>
      <div className="event-creation-container" style={{ border: '2px solid black', padding: '20px', borderRadius: '10px', margin: '0 20px' }}>
        <h2 style={{ textAlign: 'center' }}>Create an Event</h2>
        <form onSubmit={handleFormSubmit} style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '20px', width: '150px', textAlign: 'left', fontWeight: 'bold' }}>Event Name:</label>
            <br />
            <input style={{ width: '170px', textAlign: 'left' }} type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '20px', width: '150px', textAlign: 'left', fontWeight: 'bold' }}>Event Date:</label>
            <br />
            <input style={{ width: '170px' }} type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '20px', width: '150px', textAlign: 'left', fontWeight: 'bold' }}>Event Time:</label>
            <br />
            <input style={{ width: '170px' }} type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '20px', width: '150px', textAlign: 'left', fontWeight: 'bold' }}>Event Venue:</label>
            <br />
            <input style={{ width: '170px' }} type="text" value={eventVenue} onChange={(e) => setEventVenue(e.target.value)} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '45px', width: '150px', textAlign: 'right', fontWeight: 'bold' }}>Event Description:</label>
            <br />
            <textarea style={{ width: '170px', height: '100px' }} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
          </div>

          <button type="submit" style={{ marginLeft: '30px', marginTop: '10px', width: '170px' }}>Create Event</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EventCreation;
