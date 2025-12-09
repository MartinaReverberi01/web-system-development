import "./Cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id + item.size}>
            <img
              src={item.image}
              alt={item.name}
              width="90"
              height="90"
              className="cart-img"
            />

            <div className="cart-details">
              <h3>{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: € {(item.price * item.quantity).toFixed(2)}</p>

              <button
                className="cart-btn"
                onClick={() => removeFromCart(item.id, item.size)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="cart-total">Total: € {total.toFixed(2)}</p>

    <Link to="/checkout" className="checkout-btn">Proceed to checkout</Link>

    </section>
  );
}
