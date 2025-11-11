import { useState } from "react";
import { useCart } from "../context/CartContext"; 

const ProductItem = ({ product, index, formatPrice }) => {
  const { addToCart } = useCart(); 
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(""); 

  const handleAdd = () => {
    if (color === "") {
      alert("Select a color");
      return;
    }

    addToCart(product, qty, color); 
    setQty(1); 
    setColor(""); 
  };

  return (
    <li className="product-item">
      <div className="product-info">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{formatPrice(product.price)}</p>

          <div className="product-options">
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value) || 1)}
                className="quantity-input"
              />
            </label>

            <label>
              Color:
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="color-select"
              >
                <option value="">-- Select color --</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
              </select>
            </label>
          </div>

          <button data-testid={`add-${index}`} onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
