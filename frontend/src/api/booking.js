import axios from 'axios';

const API_URL = "http://localhost:5000/api";
export const getBooking = async () => {
    try {
        const response = await axios.het('${API_URL}/booking');
        return response.data;
    }
    catch (error) {
        console.error("Error fetching bookings", error);
        throw error;
    }
    
};

export const createBooking = async (user_id, parking_spot_id, start_time, end_time) => {
    try {
        const response = await axios.post('${API_URL}/bookings', {
            user_id,
            parking_spot_id,
            start_time,
            end_time
        });
        return response.data;
    }
    catch (error) {
        console.error("Error creating booking", error);
        throw error;
    }
};