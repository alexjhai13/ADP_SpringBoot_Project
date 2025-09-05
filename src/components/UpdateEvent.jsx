import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import NavigationBar from './NavigationBar';

function EditEvent(){

    const [eventDetails, setEventDetails] = useState({
        eventName : "",
        eventDescription: "",
        eventDate: "",
        totalSeats: "",
    });

    
    

    return(
        <div>
            <NavigationBar/>
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-sm border p-6 mx-8">
                <h1>Update Event information</h1>




            </div>
        </div>
    )
}


export default EditEvent;