import { useState } from "react";
import axios from "axios";
import "./ParkingApp.css";
import parkingLogo from "../assets/parking.svg";

export default function ParkingApp() {
  const [carId, setCarId] = useState("");
  const [parkingData, setParkingData] = useState(null);
  const [parkingEndData, setParkingEndData] = useState(null);
  // const [authToken] = useState(localStorage.getItem("token"));

  const apiUrl = "http://localhost:5072/api/parking";

  const handleBeginParking = async () => {
    try {
      const response = await axios.post(`${apiUrl}/begin/${carId}`);      
      setParkingData(response.data);
      alert("Parking session started");
    } catch (error) {
      alert("Error starting parking session", error);
    }
  };

  const handleEndParking = async () => {
    try {
      const response = await axios.post(`${apiUrl}/end/${carId}`);

      setParkingData(null);
      setParkingEndData(response.data);
      alert(`Parking session ended. Cost: ${response.data.cost} SEK`);
    } catch (error) {
      alert("Error ending parking session", error);
    }
  };

  const handleGetCurrentParking = async () => {
    try {
      const response = await axios.get(`${apiUrl}/current/${carId}`);
      setParkingData(response.data);
    } catch (error) {
      // if no active parking session found, set parkingData and setParkingEndData to null
      setParkingData(null);
      setParkingEndData(null);
      alert("No active parking session found", error);      
    }
  };

  return (
    <>
      <div className="App">
        <header >
          <img src={parkingLogo} className="App-logo" alt="logo" />
          <h1>Smart Parking</h1>
        </header>
        <div className="p-4 space-y-4">
          {/* <h1 className="text-xl font-bold">Parking System</h1> */}
          <input
            type="text"
            placeholder="Enter Car ID"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            className="border p-2"
          />
          <div className="flex space-x-1 p-2">
            <button
              onClick={handleBeginParking}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Start Parking
            </button>
            <button
              onClick={handleEndParking}
              className="bg-red-500 text-white p-2 rounded"
            >
              End Parking
            </button>
            <button
              onClick={handleGetCurrentParking}
              className="bg-green-500 text-white p-2 rounded"
            >
              Get Current Parking
            </button>
          </div>
          {parkingData && (
            <div className="border p-2 mt-4">
              <p>Car ID: {parkingData.carId}</p>
              <p>
                Start Time: {new Date(parkingData.startTime).toLocaleString()}
              </p>
            </div>
          )}
          {parkingEndData && (
            <div className="border p-2 mt-4">
              <p>Parking ID: {parkingEndData.id}</p>
              <p>Cost: {parkingEndData.cost} SEK</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
