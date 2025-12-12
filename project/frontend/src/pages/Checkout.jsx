import { useCart } from "../context/CartContext";
import "./Checkout.css";
import { useState } from "react";

export default function Checkout() {
  const { cart, totalItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handlePayment(e) {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:4000/products/checkout", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }), // Inviamo l'intero array del carrello
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error during the payment");
      }

      alert("Payment successfully completed");
      clearCart();
      window.location.href = "/success"; 

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="checkout-page">
      <h1>Order Summary</h1>

      <div className="summary-list">
        {cart.map((item) => (
          <div className="summary-item" key={item.id + item.size}>
            <img src={item.image} alt={item.name} className="summary-img" />

            <div>
              <h3>{item.name}</h3>
              <p>Size: {item.size}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: € {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Total: € {total.toFixed(2)}</h2>

      <h1>Payment</h1>

      <form className="payment-form" onSubmit={handlePayment}>

     <div className="field">
          <label>Name on card:</label>
          <input type="text" required />
     </div>

     <div className="field">
         <label>Card number:</label>
         <input type="text" maxLength="16" required />
     </div>

     <div className="field">
         <label>Expiration date:</label>
         <input type="month" required />
     </div>

     <div className="field">
         <label>CVV:</label>
         <input type="text" maxLength="3" required />
     </div>

     <button className="pay-btn" type="submit">
         Pay now
     </button>
     </form>

    </div>
  );
}
