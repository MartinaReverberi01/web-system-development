import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function PaymentForm({ onPaymentSuccess, isEuro }) {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [message, setMessage] = useState("");
  const { total } = useCart(); 
  const euroToDollarRate = 1.16;
  const displayedTotal = isEuro ? total : total * euroToDollarRate;

  const handlePayment = (e) => {
    e.preventDefault();

    if (!name || !card) {
      setMessage("⚠️ Fill in all the fields.");
      return;
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name)) {
      setMessage("❌ The name can only contain letters.");
      return;
    }

    if (!/^\d{12,}$/.test(card)) {
      setMessage("❌ The card number must have at least 12 numeric digits.");
      return;
    }

    const confirmPay = window.confirm(
      `Confirm payment of ${displayedTotal.toFixed(2)} ${isEuro ? "€" : "$"}?`
    );

    if (!confirmPay) {
      setMessage("❎ Payment cancelled.");
      return;
    }

    setMessage("💳 Payment processing...");
    setTimeout(() => {
      setMessage("✅ Payment completed!");
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="payment-form">
      <h3>Payment Simulation</h3>
      <form onSubmit={handlePayment}>
        <label>
          Name on card:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mario Rossi"
          />
        </label>

        <label>
          Card number:
          <input
            type="text"
            inputMode="numeric"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            placeholder="123456789012"
          />
        </label>

        <button type="submit">
          Pay {displayedTotal.toFixed(2)} {isEuro ? "€" : "$"}
        </button>
      </form>

      {message && <p className="payment-message">{message}</p>}
    </div>
  );
}
