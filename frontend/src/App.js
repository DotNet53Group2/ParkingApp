// import logo from './logo.svg';
import parking from './parking.svg';
import './App.css';
import ParkingApp from './components/ParkingApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={parking} className="App-logo" alt="logo" />
        <h1>Smart Parking</h1>
        <ParkingApp />
      </header>
    </div>
  );
}

export default App;
