import { useState } from "react";
import axios from "axios";
import "./AddPaymentStyle.css";

const AddPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [savePayment, setSavePayment] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = { cardNumber, cardHolder, expiryDate, cvc, savePayment };

    try {
      const response = await axios.post("http://localhost:5075/api/payments", paymentData);
      setMessage("Payment method added successfully!");
      console.log("Payment Response:", response.data);
    } catch (error) {
      setMessage("Error adding payment method.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="payment-form">
      <h2>Add Payment Method</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        <input type="text" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
        <input type="password" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default AddPayment;


