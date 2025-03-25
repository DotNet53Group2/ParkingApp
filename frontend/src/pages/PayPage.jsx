import { useState, useEffect } from "react";
import axios from "axios";
import "./PayPageStyle.css";

const PayPage = () => {
  const [savedPayments, setSavedPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5075/api/payments")
      .then(response => {
        setSavedPayments(response.data);
      })
      .catch(error => console.error("Error fetching payments:", error));
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!selectedPayment) {
      setMessage("Please select a payment method.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5075/api/pay", { paymentId: selectedPayment });
      setMessage("Payment processed successfully!");
      console.log("Payment Response:", response.data);
    } catch (error) {
      setMessage("Payment failed.");
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="container">
      <h2>Complete Payment</h2>
      {message && <p className="message">{message}</p>}

      {savedPayments.length > 0 ? (
        <form onSubmit={handlePayment}>
          <label>Select Payment Method:</label>
          <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)} required>
            <option value="">Select</option>
            {savedPayments.map((payment) => (
              <option key={payment.id} value={payment.id}>
                {payment.cardHolder} - **** {payment.cardNumber.slice(-4)}
              </option>
            ))}
          </select>
          <button type="submit">Pay Now</button>
        </form>
      ) : (
        <p>No saved payment methods found.</p>
      )}
    </div>
  );
};

export default PayPage;



