import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../api/products";
import "./Dashboard.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Error loading products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert("Error deleting product");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <Link to="/products/new" className="btn btn--primary">
        ➕ Add new product
      </Link>

      {error && <p className="error">{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (€)</th>
            <th>Total Qty</th>
            <th>Sizes</th>
            <th>Sale</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price} €</td>
              <td>{p.total_quantity}</td>
              <td>{p.sizes_summary || "-"}</td>
              <td>{p.in_sale ? "YES" : "NO"}</td>
              <td>{p.available ? "YES" : "NO"}</td>

              <td>
                <Link
                  to={`/products/edit/${p.id}`}
                  className="btn-small"
                >
                  ✏ Edit
                </Link>
                <button
                  className="btn-small btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
