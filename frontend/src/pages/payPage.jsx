import { useState } from "react";

//Placeholder, fake data
const Pay = ({ bookingDetails }) => {
  const mockBookingDetails = {
    parkingSpot: "A123",
    timeBooked: "2 hours",
    price: 100,
  };

  const { parkingSpot, timeBooked, price } = bookingDetails || mockBookingDetails;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [savePayment, setSavePayment] = useState(false);
  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Processing payment for:", { parkingSpot, timeBooked, price, paymentMethod, savePayment });

  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

      <div className="mb-4">
        <p>Parking Spot: <strong>{parkingSpot}</strong></p>
        <p>Duration: <strong>{timeBooked}</strong></p>
        <p>Total Price: <strong>${price}</strong></p>
      </div>

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
          <label htmlFor="savePayment" className="ml-2">Save payment method for future checkouts</label>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Pay Now</button>
      </form>
    </div>
  );
};

export default Pay; 