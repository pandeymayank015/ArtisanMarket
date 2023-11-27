import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Import the Modal component
import { url } from '../../utils/ApiUrls';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null); // New state variable

  // Invite Modal
  const modalStyles = {
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '60%',
      height: '50%',
      margin: 'auto', 
    },
  };

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
    <div className='view-container p-4'>
    <div className="events-container">
      <div>
        <h2 style={{ textAlign: 'center' }}>Events</h2>
        <p style={{ textAlign: 'center' }}>
          <Link to="/event-creation">
            <button style={{ marginLeft: '20px', marginTop: '20px', width: '170px' }}>Create an Event</button>
          </Link>
        </p>

        <div>
          <h3 style={{ marginLeft: '70px', marginBottom: '30px' }}>All Events :</h3>
          <ul>
            {events.map((event) => (
              <li key={event.id} style={{ border: '1px solid black', padding: '15px', marginBottom: '20px' }}>
                <strong style={{ fontSize: '18px' }}>{event.eventName}</strong>
                <br />
                <p style={{ marginTop: '15px' }}>Date: {event.eventDate}</p>
                <p>Time: {event.eventTime}</p>
                <p>Venue: {event.eventVenue}</p>
                <p>Description: {event.eventDescription}</p>
                {registeredEvents.some((registeredEvent) => registeredEvent.id === event.id) && (
                    <span style={{ backgroundColor: 'white', color: 'green', fontWeight: 'bold', padding: '11px 5px' }}>
                    Registered
                  </span>
                )}
                {registeredEvents.some((registeredEvent) => registeredEvent.id === event.id) ? (
                  <button style={{ marginLeft: '10px' }} onClick={() => handleInvite(event.id)}>Invite</button>
                ) : (
                  <button style={{ width: '100px' }} onClick={() => handleRegister(event.id)}>Register</button>
                )}
              </li>
            ))}
          </ul>

        </div>

        {/* Invite Modal */}
       {/* Invite Modal */}
       <Modal
          isOpen={isInviteModalOpen}
          onRequestClose={() => setInviteModalOpen(false)}
          contentLabel="Invite Modal"
          style={modalStyles} // Apply the custom styles
        >
          <button
              onClick={() => setInviteModalOpen(false)}
              style={{ alignSelf: 'flex-end', padding: '8px', cursor: 'pointer', fontSize: '16px', height: '35px' }}
            >
              X
            </button>
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Enter email address to invite:</p>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            style={{ marginBottom: '30px', padding: '8px', width: '30%' }} // Add spacing
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
            <button
              onClick={handleInviteSubmit}
              style={{ padding: '8px', width: '40%' }} // Add spacing
            >
              Send Invite
            </button>
            <button onClick={() => setInviteModalOpen(false)} style={{ padding: '8px', width: '30%' }}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
    </div>
  );
};

export default Events;
