import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

const Cart = ({ formatPrice, displayedTotal, isEuro }) => {
  const { cart } = useCart(); 

  return (
    <>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              index={index}
              formatPrice={formatPrice}
            />
          ))}
        </ul>
      )}
      <p data-testid="cart-total" className="cart-total">
        Total: {displayedTotal.toFixed(2)} {isEuro ? '€' : '$'}
      </p>
    </>
  );
};

export default Cart;
