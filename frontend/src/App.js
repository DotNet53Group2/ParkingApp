import React, { useEffect, useState } from 'react';
import './App.css';

function formatCountdown(start) {
  const diff = new Date(start) - new Date();
  if (diff <= 0) return null;

  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
}

function App() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [selectedSpot, setSelectedSpot] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [countdowns, setCountdowns] = useState({});

  
  useEffect(() => {
    fetch('http://localhost:5044/api/booking')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Error fetching bookings:", err));

      fetch('http://localhost:5044/api/parking')
      .then(res => res.json())
      .then(data => {
        const testSpots = [
          { id: 9991, location: "B1", isAvailable: true },
          { id: 9992, location: "C2", isAvailable: true },
          { id: 9993, location: "D3", isAvailable: false }
        ];
        setParkingSpots([...data, ...testSpots]); 
      })
      .catch(err => console.error("Error fetching parking spots:", err));
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      bookings.forEach((b) => {
        const countdown = formatCountdown(b.startTime);
        if (countdown) {
          updated[b.id] = countdown;
        }
      });
      setCountdowns(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookings]);

  const handleAddSpot = () => {
    if (!newLocation.trim()) return;

    fetch('http://localhost:5044/api/parking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: newLocation, isAvailable: true })
    })


    
      .then(res => res.json())
      .then(newSpot => {
        setParkingSpots([...parkingSpots, newSpot]);
        setNewLocation("");
      });
  };

  const handleBooking = () => {
    if (!selectedSpot || !startTime || !endTime) {
      alert("Please fill in all booking fields!");
      return;
    }

    fetch('http://localhost:5044/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parkingSpotId: parseInt(selectedSpot),
        startTime,
        endTime
      })
    })
      .then(res => res.json())
      .then(data => {
        
        alert("Booking successful!");
        setSelectedSpot("");
        setStartTime("");
        setEndTime("");
        setBookings([...bookings, data]); 
      })
      .catch(err => {
        console.error("Booking failed:", err);
        alert("Something went wrong");
      });
  };

  const handleCancelBooking = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    fetch(`http://localhost:5044/api/booking/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setBookings(bookings.filter(b => b.id !== id));
      })
      .catch(err => {
        console.error("Failed to cancel booking", err);
        alert("Failed to cancel. Please try again.");
      });
  };

  return (
    <div className="app">
      <h1>Parking Spots</h1>

      <div className="add-form">
        <input
          type="text"
          placeholder="Enter spot name (e.g. A2)"
          value={newLocation}
          onChange={e => setNewLocation(e.target.value)}
        />
        <button onClick={handleAddSpot}>Add Parking Spot</button>

        <h2>Book a Parking Spot</h2>

        <div className="booking-form">
          <select value={selectedSpot} onChange={e => setSelectedSpot(e.target.value)}>
            <option value="">Select a spot</option>
            {parkingSpots.map(spot => (
              <option key={spot.id} value={spot.id}>
                {spot.location}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            placeholder="Start time"
          />

          <input
            type="datetime-local"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            placeholder="End time"
          />

          <button onClick={handleBooking}>Book Spot</button>
        </div>
      </div>

      <h2>All Bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            <strong>Spot #{b.parkingSpotId}</strong> <br />
            {new Date(b.startTime).toLocaleString()} → {new Date(b.endTime).toLocaleString()}

            {countdowns[b.id] && (
              <div style={{ marginTop: '5px', color: '#7b1fa2' }}>
                Starts in: <strong>{countdowns[b.id]}</strong>
              </div>
            )}
            


            <br />
            <button
              style={{
                marginTop: "0.5rem",
                backgroundColor: "#ff6b6b",
                color: "#fff",
                border: "none",
                padding: "0.5rem",
                borderRadius: "8px",
                cursor: "pointer"
              }}
              onClick={() => handleCancelBooking(b.id)}
            >
              Cancel Booking
            </button>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("available")}>Available</button>
        <button onClick={() => setFilter("booked")}>Booked</button>
      </div>

      <ul>
        {parkingSpots
          .filter(spot => {
            if (filter === "available") return spot.isAvailable;
            if (filter === "booked") return !spot.isAvailable;
            return true;
          })
          .map(spot => (
            <li key={spot.id}>
              <strong>{spot.location}</strong> – {spot.isAvailable ? "Available" : "Taken"}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
