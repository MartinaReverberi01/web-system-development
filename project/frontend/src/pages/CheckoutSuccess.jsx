import { Link } from "react-router-dom";
import "./Checkout.css";

export default function CheckoutSuccess() {
  return (
    <section className="checkout-success">
      <h1>Thank you for your purchase! 🎉</h1>
      <p>Your order has been successfully placed.</p>

      <Link className="btn" to="/products">
        Continue Shopping
      </Link>
    </section>
  );
}
