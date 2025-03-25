import { useState, useEffect } from "react";
import axios from "axios";

const PayPage = () => {
  const [savedPayments, setSavedPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/payments")
      .then(response => setSavedPayments(response.data))
      .catch(error => console.error("Error fetching payments:", error));
  }, []);

  const handlePayment = async () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/payments/process", selectedPayment);
      alert(response.data.message);
    } catch (error) {
      alert("Payment failed.");
    }
  };

  return (
    <div className="container">
      <h2>Complete Payment</h2>

      {savedPayments.length === 0 ? (
        <p>No saved payment methods found.</p>
      ) : (
        <div>
          <h3>Saved Payment Methods:</h3>
          {savedPayments.map((payment) => (
            <div key={payment.id}>
              <input type="radio" id={payment.id} name="payment" onChange={() => setSelectedPayment(payment)} />
              <label htmlFor={payment.id}>{payment.cardHolder} - {payment.cardNumber.slice(-4)}</label>
            </div>
          ))}
        </div>
      )}

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PayPage;


