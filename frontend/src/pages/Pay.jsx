import { useState, useEffect } from "react";
import AddPayment from './AddPayment';
import BookingForm from './BookingForm';

const Pay = ({ bookingDetails }) => {
  const mockBookingDetails = {
    parkingSpot: "A123",
    timeBooked: "2 hours",
    price: 100,
  };

  const { parkingSpot, timeBooked, price } = bookingDetails || mockBookingDetails;
  
  const [paymentMethod, setPaymentMethod] = useState("");
  const [savePayment, setSavePayment] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("Processing payment for:", { parkingSpot, timeBooked, price, paymentMethod, savePayment });
    
    try {
      const paymentResponse = await processPayment({ parkingSpot, timeBooked, price, paymentMethod, savePayment });
      const bookingResponse = await createBooking({ parkingSpot, timeBooked, price, paymentMethod, savePayment });
      
      console.log('Payment and booking processed:', { paymentResponse, bookingResponse });
      alert('Payment and booking completed successfully!');
    } catch (error) {
      console.error('Error processing payment or creating booking:', error);
      alert('Failed to process payment or booking');
    }
  };

  useEffect(() => {
    const savedPayment = JSON.parse(localStorage.getItem("savedPayment"));
    if (savedPayment) {
      setPaymentData(savedPayment);
    }
  }, []);

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

        {!paymentData ? (
          <AddPayment />
        ) : (
          <div className="mb-4">
            <p>Saved Payment Method: {paymentData.cardHolder}</p>
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Pay Now</button>
      </form>
    </div>
  );
};

export default Pay;
