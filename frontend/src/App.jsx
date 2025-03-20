
App.jsx // import logo from './logo.svg';
import parking from './parking.svg';
import './App.css';
import Pay from "./pages/payPage";
import AddPayment from "./pages/addPayment";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";function App()
 
{
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={parking} className="App-logo" alt="logo" />
            <h1>Smart Parking</h1>
          </header>
  
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <nav className="mb-4">
              <Link to="/add-payment" className="text-blue-500 mr-4">Add Payment</Link>
              <Link to="/pay" className="text-blue-500">Pay</Link>
            </nav>
  
            <Routes>
              <Route path="/" element={<h2>Welcome!</h2>} />
              <Route path="/pay" element={<Pay />} />
              <Route path="/add-payment" element={<AddPayment />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
}
  