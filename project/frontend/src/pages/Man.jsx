import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function Man() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [params] = useSearchParams();

  const sub = params.get("sub") || "see all"; // default

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts();

        const filtered = data.filter((p) => {
          // Category Man = 1
          if (p.category_id !== 1) return false;

          // See all
          if (sub === "see all") return true;

          return p.subcategory?.toLowerCase() === sub.toLowerCase();
        });

        setProducts(filtered);
      } catch (err) {
        setError("Error loading products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [sub]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
