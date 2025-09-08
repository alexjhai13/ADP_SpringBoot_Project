import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'
import NavigationBar from './NavigationBar'
import 'react-calendar/dist/Calendar.css'

const events = [
  { "Name": "ADP GPT Welcome", "Description": "Kickoff event for new hires", "Date": "9/1/2025", "TotalSeats": 25, "SeatsTaken": 12, "eventId": 1 },
  { "Name": "Team Building Workshop", "Description": "Interactive team activities", "Date": "9/1/2025", "TotalSeats": 30, "SeatsTaken": 20, "eventId": 2 },
  { "Name": "ADP 5k", "Description": "Annual company run", "Date": "9/2/2025", "TotalSeats": 250, "SeatsTaken": 120, "eventId": 3 },
  { "Name": "Lunch Meet & Greet", "Description": "Networking lunch", "Date": "9/2/2025", "TotalSeats": 50, "SeatsTaken": 35, "eventId": 4 },
  { "Name": "Manager Meeting", "Description": "Monthly manager sync", "Date": "9/3/2025", "TotalSeats": 20, "SeatsTaken": 18, "eventId": 5 },
  { "Name": "Guitar Practice", "Description": "Music club session", "Date": "9/3/2025", "TotalSeats": 10, "SeatsTaken": 7, "eventId": 6 },
  { "Name": "Presentation Skills", "Description": "Workshop on presenting", "Date": "9/4/2025", "TotalSeats": 40, "SeatsTaken": 25, "eventId": 7 },
  { "Name": "Yoga Class", "Description": "Wellness activity", "Date": "9/4/2025", "TotalSeats": 20, "SeatsTaken": 15, "eventId": 8 },
  { "Name": "Tech Talk: AI", "Description": "Guest speaker on AI", "Date": "9/5/2025", "TotalSeats": 60, "SeatsTaken": 45, "eventId": 9 },
  { "Name": "Book Club", "Description": "Monthly book discussion", "Date": "9/5/2025", "TotalSeats": 15, "SeatsTaken": 10, "eventId": 10 },
  { "Name": "ADP Hackathon", "Description": "Coding competition", "Date": "9/6/2025", "TotalSeats": 100, "SeatsTaken": 80, "eventId": 11 },
  { "Name": "Coffee Chat", "Description": "Casual coffee meetup", "Date": "9/6/2025", "TotalSeats": 20, "SeatsTaken": 12, "eventId": 12 },
  { "Name": "Sales Training", "Description": "Sales techniques workshop", "Date": "9/7/2025", "TotalSeats": 30, "SeatsTaken": 25, "eventId": 13 },
  { "Name": "Design Thinking", "Description": "Creative problem solving", "Date": "9/7/2025", "TotalSeats": 25, "SeatsTaken": 20, "eventId": 14 },
  { "Name": "Finance Seminar", "Description": "Financial planning tips", "Date": "9/8/2025", "TotalSeats": 40, "SeatsTaken": 30, "eventId": 15 },
  { "Name": "Coding Bootcamp", "Description": "Intro to programming", "Date": "9/8/2025", "TotalSeats": 50, "SeatsTaken": 40, "eventId": 16 },
  { "Name": "Marketing Meetup", "Description": "Marketing strategies", "Date": "9/9/2025", "TotalSeats": 35, "SeatsTaken": 28, "eventId": 17 },
  { "Name": "HR Q&A", "Description": "Ask HR anything", "Date": "9/9/2025", "TotalSeats": 20, "SeatsTaken": 15, "eventId": 18 },
  { "Name": "Product Demo", "Description": "Demo of new features", "Date": "9/10/2025", "TotalSeats": 60, "SeatsTaken": 50, "eventId": 19 },
  { "Name": "Wellness Workshop", "Description": "Health and wellness tips", "Date": "9/10/2025", "TotalSeats": 25, "SeatsTaken": 18, "eventId": 20 },
  { "Name": "Leadership Panel", "Description": "Panel with company leaders", "Date": "9/11/2025", "TotalSeats": 80, "SeatsTaken": 65, "eventId": 21 },
  { "Name": "Art Class", "Description": "Painting and drawing", "Date": "9/11/2025", "TotalSeats": 15, "SeatsTaken": 10, "eventId": 22 },
  { "Name": "Customer Success", "Description": "Customer success stories", "Date": "9/12/2025", "TotalSeats": 40, "SeatsTaken": 32, "eventId": 23 },
  { "Name": "Team Lunch", "Description": "Team bonding lunch", "Date": "9/12/2025", "TotalSeats": 30, "SeatsTaken": 22, "eventId": 24 },
  { "Name": "Security Briefing", "Description": "Cybersecurity updates", "Date": "9/13/2025", "TotalSeats": 50, "SeatsTaken": 40, "eventId": 25 },
  { "Name": "Open Mic", "Description": "Share your talent", "Date": "9/13/2025", "TotalSeats": 20, "SeatsTaken": 12, "eventId": 26 },
  { "Name": "Volunteer Day", "Description": "Community service", "Date": "9/14/2025", "TotalSeats": 60, "SeatsTaken": 48, "eventId": 27 },
  { "Name": "Board Games", "Description": "Game night", "Date": "9/14/2025", "TotalSeats": 25, "SeatsTaken": 18, "eventId": 28 },
  { "Name": "Mentorship Meetup", "Description": "Meet your mentor", "Date": "9/15/2025", "TotalSeats": 30, "SeatsTaken": 22, "eventId": 29 },
  { "Name": "Photography Walk", "Description": "Explore and shoot photos", "Date": "9/15/2025", "TotalSeats": 15, "SeatsTaken": 10, "eventId": 30 }
];

function getRegisteredEvents(username, events, registrations) {
  return events.filter(e => registrations.some(r => r.username === username && r.eventId === e.eventId));
}

function isRegistered(username, eventId, registrations) {
  return registrations.some(r => r.username === username && r.eventId === eventId);
}

const EventList = ({ loggedInUser, authority, ...props }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock registrations - now using username instead of userId
  const [registrations, setRegistrations] = useState([
    { username: "testuser", eventId: 1 },
    { username: "testuser", eventId: 3 },
    { username: "testuser", eventId: 5 },
    { username: "admin", eventId: 1 },
    { username: "admin", eventId: 2 },
    // Add more sample registrations as needed
  ]);

  // Use the actual logged-in user, fallback to mock for development
  const currentUser = loggedInUser || "testuser";

  // Events user is registered for
  const registeredEvents = getRegisteredEvents(currentUser, events, registrations);

  // Events for selected date
  const eventsForDate = events.filter(
    e => new Date(e.Date).toLocaleDateString() === selectedDate.toLocaleDateString()
  );

  // Register/unregister handlers
  const handleRegister = (eventId) => {
    setRegistrations(prev => [...prev, { username: currentUser, eventId }]);
  };

  const handleUnregister = (eventId) => {
    setRegistrations(prev => prev.filter(r => !(r.username === currentUser && r.eventId === eventId)));
  };

  return (
    <>
      <NavigationBar {...props} />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-slate-800 text-3xl font-bold">My Registered Events</h1>
            {/* Show current user info */}
            <div className="text-sm text-gray-600">
              <p>Logged in as: <span className="font-medium">{currentUser}</span></p>
              {authority && <p>Authority: <span className="font-medium">{authority}</span></p>}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Registered Events List */}
            <div className="md:w-2/5 w-full bg-white rounded-lg shadow-sm border p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Events You're Registered For</h2>
              <div className="flex-1 overflow-y-auto">
                <ul className="list-none p-0">
                  {registeredEvents.length === 0 ? (
                    <li className="text-gray-500 text-sm">You are not registered for any events.</li>
                  ) : (
                    registeredEvents.map(event => (
                      <li key={event.eventId} className="p-2.5 border-b border-gray-200">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-800">{event.Name}</span>
                          <span className="text-xs text-gray-500">{event.Date}</span>
                          <span className="text-xs text-gray-400">{event.Description}</span>
                          <span className="text-xs text-gray-400">
                            Seats: {event.SeatsTaken}/{event.TotalSeats}
                          </span>
                          <button
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                            onClick={() => handleUnregister(event.eventId)}
                          >
                            Unregister
                          </button>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            
            {/* Calendar and Events for Selected Date */}
            <div className="md:w-3/5 w-full bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendar</h2>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                className="w-full max-w-md"
              />
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Events on {selectedDate.toLocaleDateString()}
                </h3>
                <ul>
                  {eventsForDate.length === 0 ? (
                    <li className="text-gray-500 text-sm">No events for this date.</li>
                  ) : (
                    eventsForDate.map(e => {
                      const registered = isRegistered(currentUser, e.eventId, registrations);
                      return (
                        <li key={e.eventId} className="mb-2 p-2 bg-gray-100 rounded flex justify-between items-center">
                          <div>
                            <span className="font-medium">{e.Name}</span>
                            <span className="ml-2 text-xs text-gray-500">{e.Description}</span>
                          </div>
                          {registered ? (
                            <button
                              className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                              onClick={() => handleUnregister(e.eventId)}
                            >
                              Unregister
                            </button>
                          ) : (
                            <button
                              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                              onClick={() => handleRegister(e.eventId)}
                            >
                              Register
                            </button>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventList;