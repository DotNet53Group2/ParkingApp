import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pay from "./pages/payPage"; 
import AddPayment from "./components/addPayment"; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Smart Parking</h1>
        </header>

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
    </Router>
  );
}

export default App;
  