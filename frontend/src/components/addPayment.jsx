import { useState } from "react";

const AddPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [savePayment, setSavePayment] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = { cardNumber, cardHolder, expiryDate, cvc, savePayment };
    console.log("Payment Method Added:", paymentData); };

  if (savePayment) {
    localStorage.setItem("savedPayment", JSON.stringify(paymentData));
    alert("Payment method saved for future use!");
  } else {
    alert("Payment method will be used for this session only.");
  }

  console.log("Payment Method Added:", paymentData);

  return (
    <div className="payment-form">
      <h2>Add Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          type="password"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
        <input
            type="text"
            className="w-full p-2 border rounded"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Full Name"
        />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default AddPayment;