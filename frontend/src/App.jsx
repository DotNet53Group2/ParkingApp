import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pay from './pages/Pay';
import AddPayment from './components/addPayment'
import parkingLogo from './path-to-logo';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={parkingLogo} className="App-logo" alt="logo" />
          <h1>Smart Parking</h1>
          <Routes>
            <Route path="/" element= "Parking"/>
            <Route path="/pay" element={<Pay />} />
            <Route path="/addpayment" element={<AddPayment />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
