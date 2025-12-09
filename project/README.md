## Marti&Nico – E-commerce Platform  

This project is a fully functional full-stack e-commerce web application built with:
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: SQLite
- File Upload: Multer
- State Management: React Context
- Routing: React Router
- Validation: Zod (server-side)

The project allows you to:
- View products
- Filter them by category, subcategory, price, and size
- Add them to your cart
- Simulate a checkout
- Manage products via an Admin Dashboard with full CRUD
- Upload product images
- Save your cart to localStorage

## Features

## User Features
- Browser products
- Filter products
- View product details
- Choose size & quantity
- Add/remove items to/from cart
- Persistent shopping cart (localStorage)
- Checkout & confirmation screen

## Admin Features
- Create products
- Upload images
- Edit products
- Delete products
- Manage sizes & quantity
- Mark products as on sale
- Dashboard with table view

## Technology Stack

## Frontend
- React 19
- Vite
- React Router
- CSS Modules
- React Context API (cart)

## Backend
- Node.js
- Express
- Multer (image upload)
- SQLite3 (database)
- Zod (validation)

## Installation Instructions Backend
cd backend --> npm install --> npm start (to start the server). The backend runs on: http://localhost:4000

## Installation Instructions Frontend
cd frontend --> npm install --> npm run dev. The frontend runs on: http://localhost:5173

## API Documentation
- GET /products --> Returns all products, with: category, subcategory, total quantity, sizes_summary.
- GET /products/:id --> Returns one product + all sizes.
- POST /products --> Create a new product.
- PUT /products/:id --> Update an existing product.
- DELETE /products/:id --> Delete product + related quantities.
- GET /categories --> Returns the list of categories.
- GET /subcategories?category_id= --> Returns all subcategories of a category.
- POST /upload --> Upload your product image.