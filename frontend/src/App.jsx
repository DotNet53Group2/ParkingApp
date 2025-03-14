import { useState } from 'react'
import parkingLogo from './parking.svg';
import './App.css'
import ParkingApp from './components/ParkingApp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <header className="App-header">
        <img src={parkingLogo} className="App-logo" alt="logo" />
        <h1>Smart Parking</h1>
        <ParkingApp />
      </header>
    </div>
    </>
  )
}

export default App
