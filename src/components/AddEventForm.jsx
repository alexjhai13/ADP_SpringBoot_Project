import React , { useState } from 'react'
import NavigationBar from './NavigationBar';
import { useNavigate } from "react-router-dom";

function AddEventForm (){
    const navigate = useNavigate();

    const [eventDetails, setEventDetails] = useState({
        eventName : "",
        eventDescription: "",
        eventDate: "",
        totalSeats: "",
});

    const handleSubmit = async(e) => { 
        payload={
            eventName: eventDetails.eventName,
            eventDetails : eventDetails.eventDescription,
            eventDate: eventDetails.eventDate,
            totalSeats : eventDetails.totalSeats
        }

    }

    const onChange= (e) =>{
            const { name, value } = e.target;
            setEventDetails((v) => ({ ...v, [name]: value }))
    }

    return(
    <div>
        <NavigationBar />
        
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-sm border p-6 mx-8">
                <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
                <form onSubmit={handleSubmit} className="grid gap-3">
                    <label className="grid gap-1">
                        <span>Event Name</span> 
                        <input name="eventName" value={eventDetails.eventName} onChange={onChange} className="border p-2 rounded" />
                    </label>

                    <label className="grid gap-1">
                        <span>Event Description</span> 
                        <input name="eventDesc" value={eventDetails.eventDescription} onChange={onChange} className="border p-2 rounded" />
                    </label>

                    <label className="grid gap-1">
                        <span>Event date</span> 
                        <input name="eventDate" value={eventDetails.eventDate} type="date" onChange={onChange} className="border p-2 rounded" />
                    </label>

                    <label className="grid gap-1">
                        <span>Available Seating</span> 
                        <input name="totalSeats" value={eventDetails.totalSeats} onChange={onChange} className="border p-2 rounded" />
                    </label>

                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
                        <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 border rounded">Cancel</button>
                    </div>
                </form>
            </div>
        
    </div>
    );
}

export default AddEventForm;