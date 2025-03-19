import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const getParkingSpots = async () => {
    try {
        const response = await axios.get('${API_URL}/parking');
        return response.data;
    }
        catch (error)
        {
        console.error("Error fetching parking spots", error);
        throw error;
    }    
};

export const createParkingSpot = async (location, price) => {
    try {
        const response = await axios.post('${API_URL}/parking', { location, price });
        return response.data;
    }
    catch (error) {
        console.error("Error creating parking spot", error);
        throw error;
    }
};