import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const EventList = () => {
  const  events  = [  {"Name": "ADP GPT Welcome",
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
  const navigate = useNavigate();

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [eventsPerPage, setEventsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateEventsPerPage = () => {
      const availableHeight = window.innerHeight - 300 // Account for header and padding
      const eventItemHeight = 50 // Approximate height per customer item
      const newEventsPerPage = Math.max(5, Math.floor(availableHeight / eventItemHeight))
      setEventsPerPage(newEventsPerPage)
    }

    updateEventsPerPage()
    window.addEventListener('resize', updateEventsPerPage)
    
    return () => window.removeEventListener('resize', updateEventsPerPage)
  }, [])

  const startIndex = currentPage * eventsPerPage
  const endIndex = startIndex + eventsPerPage
//   const currentEvents = events.slice(startIndex, endIndex)
  const currentEvents = events
  const totalPages = Math.ceil(events.length / eventsPerPage)

  const handleEventClick = (event) => {
    setSelectedEvents(prev => {
      const isAlreadySelected = prev.some(c => c.eventId === event.eventId)
      
      if (isAlreadySelected) {
        // Remove customer if already selected
        return prev.filter(c => c.eventId !== event.eventId)
      } else {
        // Add customer if not selected and under limit
        if (prev.length < 6) {
          return [...prev, event]
        }
        return prev
      }
    })
  }

  const handleRemoveEvent = (eventId) => {
    setSelectedEvents(prev => prev.filter(e => e.id !== eventId))
  }

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <div className="flex min-h-96">
      <div className="w-3/10 border-r border-gray-300 p-5 flex flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <h3>Events:</h3>
            {/* TODO EITHER NAVIGATE TO NEW PAGE OR NEW POP UP */}
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
                {event.Name}
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
    </div>
  )
}

export default EventList