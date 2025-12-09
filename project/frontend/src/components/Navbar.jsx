import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const { cart } = useCart();
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);


  const categories = {
    man: ["See all", "T-shirts", "Trousers", "Jeans", "Jackets", "Sweatshirts"],
    woman: ["See all", "Dresses", "Skirts", "Shirts", "Knitwear", "Trousers"],
    shoes: ["See all", "Sneakers", "Heels", "Boots", "Sandals"],
    accessories: ["See all", "Bags", "Belts", "Hats", "Necklaces"],
  };

  return (
    <header className="navbar">
      
      {/* LOGO */}
      <div className="logo">
        <Link to="/">Marti&Nico</Link>
      </div>

      {/* CENTRAL MENU */}
      <nav className="nav-menu">
        {Object.keys(categories).map((cat) => (
          <div
            key={cat}
            className="nav-item"
            onMouseEnter={() => setOpenMenu(cat)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <span className="nav-link">{cat.toUpperCase()}</span>

            {/* DROPDOWN */}
            {openMenu === cat && (
              <div className="dropdown">
                {categories[cat].map((sub) => (
                  <Link
                    key={sub}
                    to={`/products?cat=${cat}&sub=${sub.toLowerCase()}`}
                    className="dropdown-item"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* ICONS */}
      <div className="nav-icons">
        <Link to="/cart" className="cart-icon">
          🛒
          {itemsCount > 0 && (
            <span className="cart-badge">{itemsCount}</span>
          )}
        </Link>
        <Link to="/dashboard" className="icon">🛠</Link>
      </div>

    </header>
  );
}
