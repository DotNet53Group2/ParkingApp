import { useState } from "react";

// Card Payment
const AddPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [savePayment, setSavePayment] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
      cardNumber,
      expiryDate,
      cvc,
      savePayment,
    };

    if (savePayment) {
      localStorage.setItem("savedPayment", JSON.stringify(paymentData));
      alert("Payment method saved for future use!");
    } else {
      alert("Payment method will be used for this session only.");
    }
    setCardNumber("");
    setExpiryDate("");
    setCvc("");
    setSavePayment(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Card Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Card Holder Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium">CVC</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Card
        </button>
      </form>
    </div>
  );
};

export default AddPayment;
