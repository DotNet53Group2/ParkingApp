import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PayPage from "./pages/PayPage"; 
import AddPayment from "./components/AddPayment"; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Smart Parking</h1>
        </header>

        <nav className="mb-4">
          <Link to="/add-payment" className="text-blue-500 mr-4">AddPayment</Link>
          <Link to="/pay" className="text-blue-500">PayPage</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Welcome!</h2>} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/add-payment" element={<AddPayment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;