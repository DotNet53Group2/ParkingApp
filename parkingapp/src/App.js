import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPayment from "./parkingapp/components/AddPayment";
import PayPage from "./parkingapp/pages/PayPage";

function App() {
  return (
    <Router>
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Routes>
                <Route path="/" element={<PayPage />} />
                <Route path="/pay" element={<PayPage />} />
                <Route path="/add-payment" element={<AddPayment />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
