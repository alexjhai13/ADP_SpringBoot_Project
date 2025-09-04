import React from 'react';
import NavigationBar from './NavigationBar'
import Calendar from 'react-calendar'
import EventList from "./EventList"
import './Calendar.css'
import 'react-calendar/dist/Calendar.css';

/** TODO: FIX CALENDAR SIZE */
/** TODO */

export default function UserCalendar(){
    return (
        <div className="min-h-screen bg-gray-50">
            <NavigationBar />
                <div>
                    <div>
                    <EventList/>
                    </div>
                    {/* <div>
                    <Calendar/>
                    </div> */}
                </div>

        </div>
    );
}

