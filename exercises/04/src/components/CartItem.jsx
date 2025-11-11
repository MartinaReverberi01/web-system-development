import { useCart } from '../context/CartContext';

const CartItem = ({ item, index, formatPrice }) => {
  const { removeFromCart } = useCart(); 

  return (
    <li className="cart-item" data-testid={`cart-item-${index}`}>
      <div className="product-info">
        <img src={item.image} alt={item.name} className="product-image" />
        <div className="product-details">
          <span className="product-name">
            {item.name} × {item.quantity}
          </span>
          <span className="product-price">
            {formatPrice(item.price * item.quantity)}
          </span>
          {item.color && (
            <span className="item-color">Color: {item.color}</span>
          )}
        </div>
      </div>
      <button
        data-testid={`remove-${index}`}
        onClick={() => removeFromCart(index)}
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;
