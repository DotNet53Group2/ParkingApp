import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getParkingSpots } from '../api/parking';

const ParkingList = () => {
    const [parkingSpots, setParkingSpots] = useState([]);
  
    useEffect(() => {       
        const fetchParkingSpots = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/parkings`);              
               
                if (Array.isArray(response.data)) {
                    setParkingSpots(response.data);
                } else {
                    console.error("Error: parkingSpots is not an array", response.data);
                }
            } catch (error) {
                console.error("Error fetching parking spots:", error);
            }
        };

        fetchParkingSpots();
    }, []); 

    return (
        <div>
            <h1>Available Parking Spots</h1>
            <ul>
                {parkingSpots.map((spot) => (
                    <li key={spot.id}>
                        {spot.location} - ${spot.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingList;
