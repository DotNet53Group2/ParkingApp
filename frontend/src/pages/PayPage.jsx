import { useState, useEffect } from "react";
import "./PayPage.css";

const PayPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [savePayment, setSavePayment] = useState(false);
  const [savedPayment, setSavedPayment] = useState(null);

  useEffect(() => {
    const savedPayment = JSON.parse(localStorage.getItem("savedPayment"));
    if (savedPayment) {
      setSavedPayment(savedPayment);
    }
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Processing payment for:", { paymentMethod, savePayment });
    if (savedPayment) {
      console.log("Using saved payment method:", savedPayment);
    } else {
      alert("No saved payment method found.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

      {savedPayment ? (
        <div className="mb-4">
          <h3>Saved Payment Method:</h3>
          <p>Card Holder: {savedPayment.cardHolder}</p>
          <p>Card Number: {savedPayment.cardNumber}</p>
        </div>
      ) : (
        <p>No payment method saved.</p>
      )}

      <form onSubmit={handlePayment}>
        <label className="block mb-2">Payment Method:</label>
        <select
          className="border p-2 w-full mb-4"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="card">Credit/Debit Card</option>
        </select>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="savePayment"
            checked={savePayment}
            onChange={() => setSavePayment(!savePayment)}
          />
          <label htmlFor="savePayment" className="ml-2">
            Save payment method for future checkouts
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PayPage;

