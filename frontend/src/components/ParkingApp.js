import { useState } from "react";
import axios from "axios";

export default function ParkingApp() {
  const [carId, setCarId] = useState("");
  const [parkingData, setParkingData] = useState(null);

  const handleBeginParking = async () => {
    try {
      await axios.post(`http://localhost:5072/api/parking/begin/${carId}`);
      alert("Parking session started");
    } catch (error) {
      alert("Error starting parking session");
    }
  };

  const handleEndParking = async () => {
    try {
      const response = await axios.post(`http://localhost:5072/api/parking/end/${carId}`);
      alert(`Parking session ended. Cost: ${response.data.Cost} SEK`);
    } catch (error) {
      alert("Error ending parking session");
    }
  };

  const handleGetCurrentParking = async () => {
    try {
      const response = await axios.get(`http://localhost:5072/api/parking/current/${carId}`);
      setParkingData(response.data);
    } catch (error) {
      alert("No active parking session found");
      setParkingData(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* <h1 className="text-xl font-bold">Parking System</h1> */}
      <input
        type="text"
        placeholder="Enter Car ID"
        value={carId}
        onChange={(e) => setCarId(e.target.value)}
        className="border p-2"
      />
      <div className="flex space-x-2">
        <button onClick={handleBeginParking} className="bg-blue-500 text-white p-2 rounded">Start Parking</button>
        <button onClick={handleEndParking} className="bg-red-500 text-white p-2 rounded">End Parking</button>
        <button onClick={handleGetCurrentParking} className="bg-green-500 text-white p-2 rounded">Get Current Parking</button>
      </div>
      {parkingData && (
        <div className="border p-2 mt-4">
          <p>Car ID: {parkingData.carId}</p>
          <p>Start Time: {new Date(parkingData.startTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
