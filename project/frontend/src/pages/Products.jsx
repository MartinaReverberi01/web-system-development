// src/pages/Products.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/products";
import FilterBar from "../components/FilterBar";
import { useLocation } from "react-router-dom";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const cat = params.get("cat");     // man, woman, ecc.
  const sub = params.get("sub");     // t-shirts, skirts, see all

  const [filters, setFilters] = useState({
    price: "",
    size: "",
  });

  function handleFilterChange(type, value) {
    setFilters((prev) => ({ ...prev, [type]: value }));
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();

        let filtered = data;

        if (cat) {
          const catId = cat === "man" ? 1 :
                        cat === "woman" ? 2 :
                        cat === "shoes" ? 3 :
                        cat === "accessories" ? 4 :
                        null;

          if (catId) filtered = filtered.filter(p => p.category_id === catId);
        }

        if (sub && sub !== "see all") {
          filtered = filtered.filter(p => 
            p.subcategory?.toLowerCase() === sub.toLowerCase()
          );
        }

        // FILTER BY PRICE
        if (filters.price) {
          if (filters.price === "low") {
            filtered = filtered.sort((a, b) => a.price - b.price);
          } else if (filters.price === "high") {
            filtered = filtered.sort((a, b) => b.price - a.price);
          }
        }

        // FILTER BY SIZE
        if (filters.size) {
          filtered = filtered.filter((p) => 
            p.sizes_summary?.toLowerCase().includes(filters.size.toLowerCase())
          );
        }

        setProducts(filtered);

      } catch (err) {
        setError("Error loading products");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [cat, sub, filters]);  


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (products.length === 0) return <p>No products available</p>;

  return (
    <div className="products-wrapper">
      <section className="products-page">
        <h1>Products</h1>

        <FilterBar onFilterChange={handleFilterChange} />

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
