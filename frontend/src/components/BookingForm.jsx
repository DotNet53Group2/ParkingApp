import React, { useState } from "react";
import { createBooking } from "../api/booking";

const BookingForm = () => {
    const [userId, setUserId] = useState('');
    const [parkingSpotId, setParkingSpotId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newBooking = await createBooking(userId, parkingSpotId, startTime, endTime);
            console.log('Booking created:', newBooking);
            alert('Booking created successfully!');
        }
        catch (error) {
            console.error("Error creating booking:", error);
            alert('Failed to create booking');
        }
    };
    return (
        <div>
            <h2>Create Booking</h2>
            <form onSubmit={handleSubmit}>
                <label>User ID:</label>
                <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <label>Parking Spot ID:</label>
                <input type="number" value={userId} onChange={(e) => setParkingSpotId(e.target.value)} />
                <label>Start Time:</label>
                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <label>End Time:</label>
                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                <button trype="submit">Create Booking</button>
            </form>
        </div>

    );

};

export default BookingForm;