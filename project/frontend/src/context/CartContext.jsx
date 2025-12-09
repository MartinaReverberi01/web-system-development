import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART 
    function addToCart(product, size, quantity = 1) {

    // Same product + same size → increase quantity
    const existing = cart.find(
        (item) => item.id === product.id && item.size === size
    );

    if (existing) {
        setCart(prev =>
        prev.map(item =>
            item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        );
    } else {
        
        setCart(prev => [
        ...prev,
        {
            ...product,
            size: size,
            quantity: quantity,
        }
        ]);
    }
    }


  // REMOVE 
  function removeFromCart(id, size) {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  }

  // CLEAR 
  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
