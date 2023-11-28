// Import necessary React components and libraries
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Sample data for events
const eventsData = [
  { date: '2023-12-01', title: 'Artisan Workshop 1', description: 'Learn new techniques.' },
  { date: '2023-12-15', title: 'Craft Fair', description: 'Explore unique handmade items.' },
  // Add more events as needed
];

// Main App component
function App() {
  // State to track the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State to track user registration for events
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // Event handler for date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Event registration handler
  const registerForEvent = (event) => {
    setRegisteredEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <div>
      <h1>Event Calendar</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Calendar component */}
        <div style={{ flex: 1 }}>
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        {/* Event details and registration */}
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <h2>Events on {selectedDate.toDateString()}</h2>
          <ul>
            {eventsData.map((event) => (
              <li key={event.date}>
                <strong>{event.title}</strong>
                <p>{event.description}</p>
                <button onClick={() => registerForEvent(event)}>Register</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* User registered events */}
      <div>
        <h2>Registered Events</h2>
        <ul>
          {registeredEvents.map((event) => (
            <li key={event.date}>
              <strong>{event.title}</strong>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
