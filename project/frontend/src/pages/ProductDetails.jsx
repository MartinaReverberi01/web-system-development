import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/products.js";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  // Size + quantity states
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Error loading product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Product not found</p>;

  const totalQty = product.sizes?.reduce((sum, s) => sum + s.quantity, 0) || 0;

  // Max quantity per size
  const maxQty =
    selectedSize && product.sizes
      ? product.sizes.find((s) => s.size === selectedSize)?.quantity || 1
      : 1;

  return (
    <section className="product-details">
      <img src={product.image} alt={product.name} className="details__image" />

      <div className="details__info">
        <h1>{product.name}</h1>

        <p className="details__category">{product.category}</p>

        <p className="details__price">
          € {product.price}
          {product.old_price && (
            <span className="details__old-price"> € {product.old_price}</span>
          )}
        </p>

        <p><strong>Total Quantity:</strong> {totalQty}</p>

        {/* DESCRIPTION */}
        {product.description && (
          <p className="details__description">
            <strong>Description:</strong> {product.description}
          </p>
        )}

        {/* SIZE */}
        {product.sizes?.length > 0 && (
          <div className="details__sizes">
            <label>Choose size:</label>
            <select
              value={selectedSize}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                setQuantity(1);
              }}
            >
              <option value="">Select size</option>
              {product.sizes.map((s) => (
                <option key={s.size} value={s.size}>
                  {s.size} (available: {s.quantity})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* QUANTITY */}
        {selectedSize && (
          <div className="details__quantity">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={maxQty}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        )}

        {/* ADD TO CART */}
        <button
          className="btn-add"
          disabled={!selectedSize}
          onClick={() => addToCart(product, selectedSize, quantity)}
        >
          Add to cart
        </button>
      </div>
    </section>
  );
}
