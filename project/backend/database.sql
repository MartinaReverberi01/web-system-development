DROP TABLE IF EXISTS product_sizes;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

INSERT INTO categories (name) VALUES 
('Man'),
('Woman'),
('Accessories'),
('Shoes');

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    category_id INTEGER NOT NULL,
    subcategory_id INTEGER,
    price REAL NOT NULL,
    old_price REAL,
    available INTEGER DEFAULT 1,
    in_sale INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
);

CREATE TABLE product_sizes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE subcategories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO subcategories (category_id, name) VALUES

-- MAN
(1, 'T-shirts'),
(1, 'Trousers'),
(1, 'Jeans'),
(1, 'Jackets'),
(1, 'Sweatshirts'),

-- WOMAN
(2, 'Dresses'),
(2, 'Skirts'),
(2, 'Shirts'),
(2, 'Knitwear'),
(2, 'Trousers'),

-- SHOES
(3, 'Sneakers'),
(3, 'Heels'),
(3, 'Boots'),
(3, 'Sandals'),

-- ACCESSORIES
(4, 'Bags'),
(4, 'Belts'),
(4, 'Hats'),
(4, 'Necklaces');
