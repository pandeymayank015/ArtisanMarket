import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Import the Modal component
import { url } from '../utils/ApiUrls';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null); // New state variable

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(url + '/events/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchRegisteredEvents = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const response = await axios.get(
          `${url}/events/registeredEvents?username=${user.username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    fetchEvents();
    fetchRegisteredEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const user = JSON.parse(localStorage.getItem('currentUser'));
      const response = await axios.post(
        `${url}/events/register/${eventId}`,
        {
          username: user.username,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Event registration successful. Confirmation email has been sent.');
        window.location.reload();
      } else {
        alert('Error registering for the event.');
      }

      console.log('Registration Response:', response.data);
    } catch (error) {
      console.error('Error registering for the event:', error);
    }
  };

  const handleInvite = (eventId) => {
    // Set the selected event ID
    setSelectedEventId(eventId);

    // Open the invite modal
    setInviteModalOpen(true);
  };

  const handleInviteSubmit = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const user = JSON.parse(localStorage.getItem('currentUser'));

      const response = await axios.post(
        `${url}/events/invite`,
        {
          eventId: selectedEventId,
          username: user.username,
          inviteEmail: inviteEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Invitation sent successfully.');
        setInviteEmail('');
      } else {
        alert('Error sending invitation.');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
    }

    // Close the invite modal
    setInviteModalOpen(false);
  };

  return (
    <div>
      <h2>Events Page</h2>
      <p>
        <Link to="/event-creation">
          <button>Create an Event</button>
        </Link>
      </p>

      <div>
        <h3>All Events</h3>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.eventName}</strong>
              <p>Date: {event.eventDate}</p>
              <p>Time: {event.eventTime}</p>
              <p>Venue: {event.eventVenue}</p>
              <p>Description: {event.eventDescription}</p>
              {registeredEvents.some((registeredEvent) => registeredEvent.id === event.id) && (
                <span style={{ color: 'green', marginLeft: '10px' }}>Registered</span>
              )}
              {registeredEvents.some((registeredEvent) => registeredEvent.id === event.id) ? (
                <button onClick={() => handleInvite(event.id)}>Invite</button>
              ) : (
                <button onClick={() => handleRegister(event.id)}>Register</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onRequestClose={() => setInviteModalOpen(false)}
        contentLabel="Invite Modal"
      >
        <p>Enter email address to invite:</p>
        <input
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
        />
        <button onClick={handleInviteSubmit}>Send Invite</button>
        <button onClick={() => setInviteModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default Events;
