-- ==========================================================
-- ShopSphere E-Commerce Platform - Sample Data Seed Script
-- ==========================================================

USE shopsphere_db;

-- 1. Seed Categories
INSERT INTO categories (id, name, description, image_url) VALUES
(1, 'Electronics', 'Smartphones, laptops, headphones, smart devices, and accessories', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80'),
(2, 'Fashion & Apparel', 'Trendy clothing, luxury footwear, accessories, and designer wear', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80'),
(3, 'Home & Kitchen', 'Modern cookware, aesthetic home decor, furniture, and smart appliances', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80'),
(4, 'Sports & Fitness', 'High-performance athletic gear, fitness equipment, and sportswear', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80'),
(5, 'Books & Stationery', 'Bestsellers, academic books, premium journals, and artistic stationery', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80'),
(6, 'Beauty & Wellness', 'Skincare, organic personal care, perfumes, and health wellness essentials', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), image_url=VALUES(image_url);

-- 2. Seed Products
INSERT INTO products (id, name, description, price, stock_quantity, image_url, rating, category_id, active) VALUES
-- Electronics
(1, 'AuraSound Pro Wireless Headphones', 'Active noise cancelling, 40-hour battery life, high-fidelity spatial audio, and ultra-comfortable memory foam ear cushions.', 149.99, 45, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', 4.8, 1, true),
(2, 'Veloce Ultra 15 Pro Laptop', 'Next-gen M-architecture 10-core CPU, 16GB unified RAM, 512GB NVMe SSD, and 120Hz Liquid Retina display.', 1199.00, 20, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80', 4.9, 1, true),
(3, 'PulseFit GPS Smartwatch Series 7', 'Comprehensive health tracking, ECG, SpO2 sensor, always-on AMOLED touchscreen, and 50m water resistance.', 199.50, 60, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', 4.7, 1, true),
(4, 'Lumix 4K Mirrorless Cinema Camera', '24.2 MP full-frame sensor, 4K 60fps recording, 5-axis image stabilization, and dual native ISO.', 899.99, 15, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80', 4.6, 1, true),

-- Fashion
(5, 'Classic Oxford Leather Dress Shoes', 'Handcrafted genuine full-grain Italian leather, Goodyear welted sole, and classic perforated brogue detailing.', 129.00, 35, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80', 4.7, 2, true),
(6, 'Minimalist Classic Chronograph Watch', 'Surgical-grade stainless steel case, sapphire crystal glass, Japanese quartz movement, and interchangeable leather strap.', 159.00, 40, 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80', 4.8, 2, true),
(7, 'Urban Nomad Water-Resistant Backpack', 'Ergonomic 28L commuter backpack with padded 16-inch laptop compartment, hidden anti-theft pocket, and USB charging port.', 79.99, 50, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', 4.6, 2, true),
(8, 'Signature Tailored Wool Blend Overcoat', 'Sophisticated notched lapel, slim modern fit, premium wool blend fabric, and deep interior pockets.', 189.99, 25, 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80', 4.9, 2, true),

-- Home & Kitchen
(9, 'AromaMaster Automatic Espresso Machine', '19-bar Italian high pressure pump, integrated conical burr grinder, and precision milk frothing wand.', 349.00, 18, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&q=80', 4.7, 3, true),
(10, 'Scandinavian Minimalist Ceramic Lamp', 'Hand-thrown textured matte ceramic base with breathable linen shade and warm ambient dimmable LED bulb.', 64.50, 40, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80', 4.5, 3, true),
(11, 'Professional Damascus Steel Chef Knife', '67 layers of high-carbon Japanese VG-10 Damascus steel, razor-sharp 8-inch blade, and ergonomic pakkawood handle.', 89.00, 30, 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80', 4.8, 3, true),

-- Sports & Fitness
(12, 'ProGrip Non-Slip Eco Yoga Mat', '6mm high-density natural tree rubber with laser-engraved alignment lines and moisture-absorbing micro-fiber surface.', 49.99, 75, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80', 4.8, 4, true),
(13, 'HydroShield Insulated Steel Water Bottle', '32oz double-wall vacuum insulated stainless steel bottle keeping drinks icy cold for 24 hours or piping hot for 12 hours.', 29.99, 100, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80', 4.9, 4, true),
(14, 'AeroStride Lightweight Running Shoes', 'Breathable flyknit upper, responsive nitrogen-infused foam midsole cushioning, and durable rubber traction outsole.', 119.50, 50, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 4.7, 4, true),

-- Books & Stationery
(15, 'Mastering Modern Full-Stack Architecture', 'Comprehensive guide covering microservices, Spring Boot, React, distributed databases, cloud deployments, and CI/CD.', 44.99, 65, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80', 4.9, 5, true),
(16, 'Handmade Refillable Leather Journal', 'Genuine distressed leather cover with 240 pages of thick 120gsm fountain-pen friendly cotton parchment paper.', 24.99, 80, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80', 4.6, 5, true),

-- Beauty & Wellness
(17, 'Botanical Radiant Glow Vitamin C Serum', 'Concentrated 20% Vitamin C with pure hyaluronic acid and botanical ferulic acid for brightened, youthful skin.', 38.00, 90, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', 4.8, 6, true),
(18, 'Artisan Amber & Cedarwood Scented Candle', '100% natural soy wax candle hand-poured with pure essential oils, wooden crackling wick, and 50-hour burn time.', 27.50, 60, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80', 4.7, 6, true)
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), price=VALUES(price), stock_quantity=VALUES(stock_quantity), image_url=VALUES(image_url), rating=VALUES(rating), category_id=VALUES(category_id);
