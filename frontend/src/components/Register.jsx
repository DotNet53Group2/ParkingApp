import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [licensePlate, setLicensePlate] = useState(""); // New car field
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiUrl = "http://localhost:5072/api";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          passwordHash: password,
          cars: [
            { 
                licensePlate,
                userId: 0
             }
        ],
        }),
      });

      if (response.ok) {
        navigate("/dashboard"); // Redirect to ParkingApp.jsx
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      setError("Error connecting to server.", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
