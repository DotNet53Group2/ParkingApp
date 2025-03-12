// import logo from './logo.svg';
import parking from './parking.svg';
import './App.css';
import AddPayment from "./AddPayment";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={parking} className="App-logo" alt="logo" />
        <h1>Smart Parking</h1>
      </header>

      <AddPayment />
      
    </div>
  );
}

export default App;
