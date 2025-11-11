import CartItem from './CartItem';

const Cart = ({ cart, onRemove, formatPrice, displayedTotal, isEuro }) => {
  return (
    <>
      <h2>Cart</h2>
      <ul className="cart-list">
        {cart.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            index={index}
            onRemove={onRemove}
            formatPrice={formatPrice}
          />
        ))}
      </ul>
      <p data-testid="cart-total" className="cart-total">
        Total: {displayedTotal.toFixed(2)} {isEuro ? '€' : '$'}
      </p>
    </>
  );
};

export default Cart;
