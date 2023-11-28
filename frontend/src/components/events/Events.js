import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Import the Modal component
import { url } from '../../utils/ApiUrls';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null); // New state variable

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const role = user.roles[0]

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
        const role = user.roles[0]
        console.log(role);
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
        toast.success('Event registration successful. Confirmation email has been sent.');
        window.location.reload();
      } else {
        toast.error('Error registering for the event.');
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
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!inviteEmail || !emailRegex.test(inviteEmail)) {
        toast.error('Please enter a valid email address');
        return;
      }
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
        toast.success('Invitation sent successfully.');
        setInviteEmail('');
      } else {
        toast.error('Error sending invitation.');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
    }

    // Close the invite modal
    setInviteModalOpen(false);
  };

  if (role !== 'ROLE_USER' && role !== 'ROLE_ADMIN') {
     // Display an error message or redirect to another page
     return (
      <div className='view-container p-4'>
        <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>
          You are not authorized to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className='view-container p-4'>
      <div className="events-container">
        <div>
          <h2 style={{ textAlign: 'center' }}>Events</h2>
          <p style={{ textAlign: 'center' }}>
            <Link to="/event-creation">
              <button style={{ marginLeft: '10px', marginTop: '20px', width: '170px' }}>Create an Event</button>
            </Link>
          </p>

          <div>
            <h3 style={{marginBottom: '30px', marginTop: '30px',  textAlign: 'center' }}>All Events:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {events.map((event) => (
                <li
                  key={event.id}
                  style={{
                    border: '1px solid black',
                    padding: '15px',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column', // Align children in a column
                    alignItems: 'stretch', // Stretch children to fill the width
                  }}
                >
                  <strong style={{ fontSize: '18px', marginBottom: '10px' }}>{event.eventName}</strong>
                  <p>Date: {event.eventDate}</p>
                  <p>Time: {event.eventTime}</p>
                  <p>Venue: {event.eventVenue}</p>
                  <p>Description: {event.eventDescription}</p>
                  {registeredEvents.some((registeredEvent) => registeredEvent.id === event.id) && (
                    <span style={{ backgroundColor: 'white', color: 'green', fontWeight: 'bold', padding: '11px 5px', alignSelf: 'flex-start' }}>
                      Registered
                    </span>
                  )}
                  {registeredEvents.some((registeredEvent) => registeredEvent.id === event.id) ? (
                    <button style={{ marginTop: '10px' }} onClick={() => handleInvite(event.id)}>Invite</button>
                  ) : (
                    <button style={{ marginTop: '10px', width: '100px' }} onClick={() => handleRegister(event.id)}>Register</button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Invite Modal */}
          {/* Invite Modal */}
          <Modal
            isOpen={isInviteModalOpen}
            onRequestClose={() => {
              setInviteModalOpen(false);
              setInviteEmail(''); // Clear the inviteEmail on close
            }}
            contentLabel="Invite Modal"
            style={modalStyles} // Apply the custom styles
          >
            <button
              onClick={() => {
                setInviteModalOpen(false);
                setInviteEmail(''); // Clear the inviteEmail on click
              }}
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
              <button
                onClick={() => {
                  setInviteModalOpen(false);
                  setInviteEmail('');
                }
                } style={{ padding: '8px', width: '30%' }}>Cancel</button>
            </div>
          </Modal>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Events;
