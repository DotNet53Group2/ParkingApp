import { useState } from "react";
import "./AddPaymentStyle.css";

const AddPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [savePayment, setSavePayment] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = { cardNumber, cardHolder, expiryDate, cvc, savePayment };
    console.log("Payment Method Added:", paymentData);

    if (savePayment) {
      localStorage.setItem("savedPayment", JSON.stringify(paymentData));
      alert("Payment method saved for future use!");
    } else {
      alert("Payment method will be used for this session only.");
    }

    // Clear form after submission
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setCardHolder("");
    setSavePayment(false);
  };

  return (
    <div className="payment-form">
      <h2>Add Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiry(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Card Holder Name"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          required
        />
        
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="savePayment"
            checked={savePayment}
            onChange={() => setSavePayment(!savePayment)}
          />
          <label htmlFor="savePayment">Save payment method for future checkouts</label>
        </div>

        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default AddPayment;
