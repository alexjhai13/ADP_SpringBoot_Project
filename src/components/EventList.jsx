import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const events = [
  {"Name": "ADP GPT Welcome",
   "Description" : "Some Event",
   "Date" : "9/6/2025",
   "TotalSeats" : 25,
   "SeatsTaken" : 12,
   "eventId" : 1},                         
  {"Name": "ADP 5k",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 250,
   "SeatsTaken" : 120,
   "eventId" : 2},
  {"Name": "Lunch Meet & Greet",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 250,
   "SeatsTaken" : 120,
   "eventId" : 3},
  {"Name": "ADP Manager Meeting",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 250,
   "SeatsTaken" : 120,
   "eventId" : 4},
  {"Name": "Guitar Practice",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 1,
   "SeatsTaken" : 1,
   "eventId" : 5},
  {"Name": "Presentation",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 250,
   "SeatsTaken" : 120,
   "eventId" : 6},
  {"Name": "Lunch Meet & Greet",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 250,
   "SeatsTaken" : 120,
   "eventId" : 13},
  {"Name": "ADP Manager Meeting",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 250,
   "SeatsTaken" : 120,
   "eventId" : 14},
  {"Name": "Guitar Practice",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 1,
   "SeatsTaken" : 1,
   "eventId" : 15},
  {"Name": "Presentation",
   "Description" : "Some Event",
   "Date" : "9/7/2025",
   "TotalSeats" : 250,
   "SeatsTaken" : 120,
   "eventId" : 16}
];

const EventList = () => {
  const navigate = useNavigate();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [eventsPerPage, setEventsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const updateEventsPerPage = () => {
      const availableHeight = window.innerHeight - 300;
      const eventItemHeight = 50;
      const newEventsPerPage = Math.max(5, Math.floor(availableHeight / eventItemHeight));
      setEventsPerPage(newEventsPerPage);
    };
    updateEventsPerPage();
    window.addEventListener('resize', updateEventsPerPage);
    return () => window.removeEventListener('resize', updateEventsPerPage);
  }, []);

  const startIndex = currentPage * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleEventClick = (event) => {
    setSelectedEvents(prev => {
      const isAlreadySelected = prev.some(c => c.eventId === event.eventId);
      if (isAlreadySelected) {
        return prev.filter(c => c.eventId !== event.eventId);
      } else {
        if (prev.length < 6) {
          return [...prev, event];
        }
        return prev;
      }
    });
  };

  const handlePrevious = () => setCurrentPage(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-slate-800 text-3xl font-bold mb-4">Events</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Events List */}
          <div className="md:w-2/5 w-full bg-white rounded-lg shadow-sm border p-6 flex flex-col">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Event List</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/events/addevent')}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => navigate('/events/register')}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  View Events
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="list-none p-0">
                {currentEvents.map((event) => (
                  <li
                    key={event.eventId}
                    onClick={() => handleEventClick(event)}
                    className={`p-2.5 cursor-pointer border-b border-gray-200 hover:bg-gray-100 ${
                      selectedEvents.some(c => c.eventId === event.eventId) ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-800">{event.Name}</span>
                      <span className="text-xs text-gray-500">{event.Date}</span>
                      <span className="text-xs text-gray-400">{event.Description}</span>
                      <span className="text-xs text-gray-400">
                        Seats: {event.SeatsTaken}/{event.TotalSeats}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
          {/* Calendar */}
          <div className="md:w-3/5 w-full bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendar</h2>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              className="w-full max-w-md"
            />
            {/* Optionally show events for selected date */}
            <div className="mt-6 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Events on {selectedDate.toLocaleDateString()}</h3>
              <ul>
                {events.filter(e => new Date(e.Date).toLocaleDateString() === selectedDate.toLocaleDateString()).length === 0 ? (
                  <li className="text-gray-500 text-sm">No events for this date.</li>
                ) : (
                  events
                    .filter(e => new Date(e.Date).toLocaleDateString() === selectedDate.toLocaleDateString())
                    .map(e => (
                      <li key={e.eventId} className="mb-2 p-2 bg-gray-100 rounded">
                        <span className="font-medium">{e.Name}</span>
                        <span className="ml-2 text-xs text-gray-500">{e.Description}</span>
                      </li>
                    ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventList