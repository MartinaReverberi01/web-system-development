import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import products from './data/products';
import PaymentForm from "./components/PaymentForm";

function App() {
  const [cart, setCart] = useState([]);
  const [isEuro, setIsEuro] = useState(true);

  const euroToDollarRate = 1.16;
  const [thankYou, setThankYou] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);

  const addToCart = (product, quantity, color) => {
    const existingIndex = cart.findIndex(
      (item) => item.name === product.name && item.color === color
    );

    if (existingIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity, color }]);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const displayedTotal = isEuro ? total : total * euroToDollarRate;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        setIsEuro((prev) => !prev);
        console.log(
          `💱 Currency changed: now showing in ${isEuro ? 'DOLLAR' : 'EURO'}`
        );
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEuro]);

  const formatPrice = (price) => {
    if (isEuro) return `${price.toFixed(2)} €`;
    return `${(price * euroToDollarRate).toFixed(2)} $`;
  };

  return (
    <div className="app-container">

      {thankYou && (
        <div className="thank-you-banner">
          <h2>🎉 Thank you for your purchase!</h2>
          <p>Your order is on its way 🚚</p>
          <button
            onClick={() => {
              setThankYou(false);
              setFormResetKey((prev) => prev + 1); 
            }}
          >
            Continue shopping
          </button>

        </div>
      )}

      <h1>React Shopping Cart</h1>

      <p>
        Current currency:{' '}
        <strong>{isEuro ? 'EURO (€)' : 'DOLLAR ($)'}</strong>
      </p>
      <p className="shortcut">(Press Ctrl+M or Cmd+M to toggle currency)</p>

      <div className="layout">
        <div className="left-column">
          <ProductList
            key={formResetKey}
            products={products}
            onAdd={addToCart}
            formatPrice={formatPrice}
          />
        </div>

        <div className="right-column">
          <Cart
            cart={cart}
            onRemove={removeFromCart}
            formatPrice={formatPrice}
            displayedTotal={displayedTotal}
            isEuro={isEuro}
          />

          {cart.length > 0 && (
            <PaymentForm
              total={displayedTotal}
              isEuro={isEuro}
              onPaymentSuccess={() => {
                setCart([]);
                setThankYou(true);
              }}
            />
          )}
        </div>
      </div>


    </div>
  );
};

export default App;
