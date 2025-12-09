import { useCart } from "../context/CartContext";
import "./Checkout.css";

export default function Checkout() {
  const { cart, totalItems, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handlePayment(e) {
    e.preventDefault();
    alert("Pagamento completato con successo!");
    clearCart();
    window.location.href = "/success";   
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
