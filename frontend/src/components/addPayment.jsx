import { useState } from "react";
import axios from "axios";

const AddPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const paymentData = { cardNumber, cardHolder, expiryDate, cvc };

    try {
      const response = await axios.post("http://localhost:5000/api/payments", paymentData);
      alert(response.data.message);
    } catch (error) {
      alert("Error saving payment method.");
    }
  };

  return (
    <div className="payment-form">
      <h2>Add Payment Method</h2>
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

