import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Cart from "./pages/Cart.jsx";
import ProductForm from "./pages/ProductForm.jsx";

import Man from "./pages/Man.jsx";
import Woman from "./pages/Woman.jsx";
import Shoes from "./pages/Shoes.jsx";
import Accessories from "./pages/Accessories.jsx";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/cart", element: <Cart /> },
      { path: "/products/new", element: <ProductForm mode="create" /> },
      { path: "/products/edit/:id", element: <ProductForm mode="edit" /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/success", element: <CheckoutSuccess /> },



      // CATEGORY
      { path: "/man", element: <Man /> },
      { path: "/woman", element: <Woman /> },
      { path: "/shoes", element: <Shoes /> },
      { path: "/accessories", element: <Accessories /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>        
    <RouterProvider router={router} />
  </CartProvider>
);
