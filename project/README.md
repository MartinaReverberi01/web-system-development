# Marti&Nico – E-commerce Platform  

This project is a fully functional full-stack e-commerce web application built with:
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: SQLite
- Image Upload: Multer
- State Management: React Context
- Routing: React Router
- Validation: Zod (server-side + client-side)

The platform includes a customer area and a complete admin dashboard for product management.

## Features

### User Features
- Browser products
- Filter products by price and size
- View product details
- Select size & quantity
- Add/remove items from cart
- Persistent cart using localStorage
- Checkout simulation with confirmation page

### Admin Features
- Create new products
- Upload product images
- Edit product details
- Delete products
- Manage sizes & quantity
- Mark products as on sale
- Dashboard with table view

## Technology Stack

### Frontend
- React 19
- Vite
- React Router
- CSS Modules
- React Context API (cart)
- Client-side validation (Zod)

### Backend
- Node.js
- Express
- Multer (image upload)
- SQLite3 (database)
- Server-side validation (Zod)

## Installation Instructions Backend
cd backend --> npm install --> npm start (to start the server). The backend runs on: http://localhost:4000

## Installation Instructions Frontend
cd frontend --> npm install --> npm run dev. The frontend runs on: http://localhost:5173

## API Documentation

### Products
- GET /products --> Returns all products with: category, subcategory, total quantity, sizes_summary.
- GET /products/:id --> Returns one product + all sizes.
- POST /products --> Create a new product.
- PUT /products/:id --> Update an existing product.
- DELETE /products/:id --> Delete product + related quantities.

### Categories
- GET /categories --> Returns the list of categories.

### Subcategories
- GET /subcategories?category_id= --> Returns all subcategories of a category.

### Uploads
- POST /upload --> Upload your product image.

## Database Structure
Tables:
- categories
- subcategories
- products
- product_sizes
