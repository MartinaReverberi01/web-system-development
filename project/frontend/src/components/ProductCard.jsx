import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";  

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">

      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>{product.category_name}</p>

      {product.sizes_summary ? (
        <p><strong>Sizes:</strong> {product.sizes_summary}</p>
      ) : (
        <p>No sizes available</p>
      )}

      <p>
        {product.in_sale ? (
          <>
            <span style={{ color: "red", fontWeight: "bold" }}>
              € {product.price}
            </span>{" "}
            <span style={{ textDecoration: "line-through", opacity: 0.6 }}>
              € {product.old_price}
            </span>
          </>
        ) : (
          <>€ {product.price}</>
        )}
      </p>

      <Link to={`/products/${product.id}`} className="btn">
        Details
      </Link>

    </div>
  );
}
