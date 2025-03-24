  import React from "react";
  import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
  // import parkingLogo from './parking.svg';
  import Register from "./components/Register";
  import Login from "./components/Login";
  import ParkingApp from "./components/ParkingApp";
  import "./App.css";
  
  const App = () => {

  return (    
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default to Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ParkingApp />} />
      </Routes>
    </Router>
  )
}

export default App;