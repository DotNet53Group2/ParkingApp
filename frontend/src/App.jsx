// import logo from './logo.svg';
import parking from './assets/parking.svg';
import './App.css';
import React from 'react';
import ParkingList from './components/ParkingList.jsx';
import BookingForm from './components/BookingForm.jsx';

function App() {
  return (
    <div className="App">
      <ParkingList />
      <BookingForm />
      <header className="App-header">
        <img src={parking} className="App-logo" alt="logo" />
        <h1>Smart Parking</h1>
      </header>
    </div>
  );
}

export default App;
