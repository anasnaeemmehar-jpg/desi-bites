-- DesiBites Database Schema (SQLite)

PRAGMA foreign_keys = ON;

-- Admin users (for admin panel login)
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categories (e.g. Biryani, BBQ, Desserts)
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products / Food items
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price REAL NOT NULL,
    discount_price REAL,
    image TEXT,
    is_available INTEGER DEFAULT 1,
    is_featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT NOT NULL,
    password TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, confirmed, preparing, on_the_way, delivered, cancelled
    payment_method TEXT DEFAULT 'cod', -- cod, card, online
    payment_status TEXT DEFAULT 'unpaid',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Order items (line items per order)
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER,
    product_name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Seed data: categories
INSERT INTO categories (name, slug, image) VALUES
('Biryani', 'biryani', 'biryani.jpg'),
('BBQ', 'bbq', 'bbq.jpg'),
('Karahi', 'karahi', 'karahi.jpg'),
('Fast Food', 'fast-food', 'fastfood.jpg'),
('Desserts', 'desserts', 'desserts.jpg'),
('Beverages', 'beverages', 'beverages.jpg');

-- Seed data: products
INSERT INTO products (category_id, name, slug, description, price, discount_price, image, is_featured) VALUES
(1, 'Chicken Biryani', 'chicken-biryani', 'Aromatic basmati rice cooked with tender chicken and traditional spices.', 350, 300, 'chicken-biryani.jpg', 1),
(1, 'Mutton Biryani', 'mutton-biryani', 'Rich and flavorful biryani made with succulent mutton pieces.', 500, NULL, 'mutton-biryani.jpg', 1),
(2, 'Seekh Kabab (6 pcs)', 'seekh-kabab', 'Juicy grilled beef seekh kababs served with mint chutney.', 400, NULL, 'seekh-kabab.jpg', 0),
(2, 'Chicken Tikka (Full)', 'chicken-tikka', 'Charcoal grilled chicken tikka marinated in traditional spices.', 450, 400, 'chicken-tikka.jpg', 1),
(3, 'Chicken Karahi (Full)', 'chicken-karahi', 'Traditional chicken karahi cooked in tomato and pepper gravy.', 900, NULL, 'chicken-karahi.jpg', 1),
(4, 'Zinger Burger', 'zinger-burger', 'Crispy fried chicken burger with fresh lettuce and mayo.', 280, NULL, 'zinger-burger.jpg', 0),
(5, 'Gulab Jamun (4 pcs)', 'gulab-jamun', 'Soft milk-solid dumplings soaked in sugar syrup.', 150, NULL, 'gulab-jamun.jpg', 0),
(6, 'Fresh Lassi', 'fresh-lassi', 'Traditional sweet yogurt drink, chilled and refreshing.', 120, NULL, 'lassi.jpg', 0);

-- Default admin (email: admin@desibites.com / password: admin123 - hashed in app, this is placeholder)
-- Actual hashed password will be inserted by seed script, not here.
