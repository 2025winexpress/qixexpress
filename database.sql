-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  avatar_url TEXT,
  level VARCHAR(20) DEFAULT 'bronze',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  preferences JSONB DEFAULT '{}'::jsonb,
  notification_settings JSONB DEFAULT '{"email": true, "push": true}'::jsonb
);

-- Loyalty cards table
CREATE TABLE loyalty_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  card_number VARCHAR(20) NOT NULL,
  card_type VARCHAR(20) NOT NULL CHECK (card_type IN ('rewards', 'gift', 'coins')),
  balance NUMERIC(10, 2) DEFAULT 0,
  max_balance NUMERIC(10, 2),
  expiry_date DATE,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Reward stages table
CREATE TABLE reward_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID REFERENCES loyalty_cards(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  required_stamps INTEGER NOT NULL,
  description TEXT
);

-- User coins table
CREATE TABLE user_coins (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0
);

-- Coin transactions table
CREATE TABLE coin_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('earned', 'spent', 'transferred', 'received')),
  description TEXT,
  reference_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  discount_price NUMERIC(10, 2),
  coin_price INTEGER NOT NULL,
  image_url TEXT,
  category VARCHAR(20) NOT NULL,
  is_flash_deal BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  rating NUMERIC(3, 1),
  review_count INTEGER DEFAULT 0,
  end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product options table
CREATE TABLE product_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2),
  is_default BOOLEAN DEFAULT FALSE
);

-- Product extras table
CREATE TABLE product_extras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  total NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'preparing', 'delivering', 'completed', 'rejected')),
  delivery_date DATE,
  delivery_time VARCHAR(20),
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('cash', 'coins')),
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  options JSONB,
  extras JSONB
);

-- Loyalty program usage in orders
CREATE TABLE order_loyalty (
  order_id UUID PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
  reward_card_id UUID REFERENCES loyalty_cards(id) ON DELETE SET NULL,
  gift_card_id UUID REFERENCES loyalty_cards(id) ON DELETE SET NULL,
  coins_used INTEGER DEFAULT 0,
  stamp_requested BOOLEAN DEFAULT FALSE,
  reward_requested BOOLEAN DEFAULT FALSE
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_loyalty_cards_user_id ON loyalty_cards(user_id);
CREATE INDEX idx_coin_transactions_user_id ON coin_transactions(user_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_flash_deal ON products(is_flash_deal) WHERE is_flash_deal = TRUE;
CREATE INDEX idx_products_best_seller ON products(is_best_seller) WHERE is_best_seller = TRUE;
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);

-- Create views for common queries

-- Active loyalty cards view
CREATE VIEW active_loyalty_cards AS
SELECT lc.*, u.name as user_name, u.email as user_email
FROM loyalty_cards lc
JOIN users u ON lc.user_id = u.id
WHERE lc.is_active = TRUE
AND (lc.expiry_date IS NULL OR lc.expiry_date > CURRENT_DATE);

-- User loyalty summary view
CREATE VIEW user_loyalty_summary AS
SELECT 
  u.id as user_id,
  u.name as user_name,
  u.level as user_level,
  uc.balance as coin_balance,
  COUNT(CASE WHEN lc.card_type = 'rewards' THEN 1 END) as reward_cards_count,
  COUNT(CASE WHEN lc.card_type = 'gift' THEN 1 END) as gift_cards_count,
  COUNT(CASE WHEN lc.card_type = 'coins' THEN 1 END) as coin_cards_count
FROM users u
LEFT JOIN user_coins uc ON u.id = uc.user_id
LEFT JOIN loyalty_cards lc ON u.id = lc.user_id AND lc.is_active = TRUE
GROUP BY u.id, u.name, u.level, uc.balance;

-- Order summary view
CREATE VIEW order_summary AS
SELECT 
  o.id as order_id,
  o.user_id,
  u.name as user_name,
  o.customer_name,
  o.customer_phone,
  o.total,
  o.discount,
  o.status,
  o.payment_method,
  o.created_at,
  COUNT(oi.id) as item_count,
  SUM(oi.quantity) as total_quantity,
  ol.reward_card_id,
  ol.gift_card_id,
  ol.coins_used,
  ol.stamp_requested,
  ol.reward_requested
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN order_loyalty ol ON o.id = ol.order_id
GROUP BY o.id, o.user_id, u.name, o.customer_name, o.customer_phone, o.total, o.discount, o.status, o.payment_method, o.created_at, ol.reward_card_id, ol.gift_card_id, ol.coins_used, ol.stamp_requested, ol.reward_requested;

-- Sample data for testing

-- Insert sample users
INSERT INTO users (id, email, name, phone, address, avatar_url, level) VALUES
(uuid_generate_v4(), 'user1@example.com', 'جين سميث', '0612345678', 'شارع الحسن الثاني، رقم 123، الدار البيضاء', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane', 'gold'),
(uuid_generate_v4(), 'user2@example.com', 'محمد أحمد', '0623456789', 'شارع محمد الخامس، رقم 45، الرباط', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed', 'silver'),
(uuid_generate_v4(), 'user3@example.com', 'فاطمة علي', '0634567890', 'شارع المسيرة، رقم 78، مراكش', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima', 'bronze');

-- Insert user profiles
INSERT INTO profiles (id, preferences, notification_settings)
SELECT id, '{"theme": "light", "language": "ar"}'::jsonb, '{"email": true, "push": true}'::jsonb FROM users;

-- Insert user coins
INSERT INTO user_coins (user_id, balance)
SELECT id, CASE WHEN level = 'gold' THEN 1250 WHEN level = 'silver' THEN 750 ELSE 250 END FROM users;

-- Insert sample products
INSERT INTO products (id, name, description, price, discount_price, coin_price, image_url, category, is_flash_deal, is_best_seller, rating, review_count) VALUES
(uuid_generate_v4(), 'قهوة عربية', 'قهوة عربية أصلية مع هيل', 30, NULL, 120, 'https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=400&q=80', 'drinks', FALSE, TRUE, 4.8, 124),
(uuid_generate_v4(), 'كيك الشوكولاتة', 'كيك شوكولاتة بلجيكية فاخرة', 45, NULL, 180, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', 'desserts', FALSE, TRUE, 4.7, 89),
(uuid_generate_v4(), 'كروسان بالجبن', 'كروسان طازج محشو بالجبن', 35, NULL, 140, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', 'food', FALSE, TRUE, 4.6, 76),
(uuid_generate_v4(), 'شاي بالنعناع', 'شاي أخضر طازج مع نعناع طبيعي', 25, NULL, 100, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80', 'drinks', FALSE, TRUE, 4.9, 142),
(uuid_generate_v4(), 'قهوة تركية', 'قهوة تركية تقليدية', 25, NULL, 100, 'https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=400&q=80', 'drinks', TRUE, FALSE, 4.5, 78),
(uuid_generate_v4(), 'كيك الشوكولاتة', 'كيك شوكولاتة بلجيكية فاخرة', 60, 45, 200, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', 'desserts', TRUE, FALSE, 4.7, 89),
(uuid_generate_v4(), 'عصير برتقال طازج', 'عصير برتقال طبيعي 100%', 30, 20, 100, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80', 'drinks', TRUE, FALSE, 4.8, 112);

-- Insert product options
INSERT INTO product_options (product_id, name, price, is_default)
SELECT id, 'بدون سكر', NULL, TRUE FROM products WHERE name = 'قهوة عربية';

INSERT INTO product_options (product_id, name, price, is_default)
SELECT id, 'مع هيل', NULL, FALSE FROM products WHERE name = 'قهوة عربية';

INSERT INTO product_options (product_id, name, price, is_default)
SELECT id, 'بدون سكر', NULL, TRUE FROM products WHERE name = 'قهوة تركية';

INSERT INTO product_options (product_id, name, price, is_default)
SELECT id, 'مع هيل', NULL, FALSE FROM products WHERE name = 'قهوة تركية';

-- Insert product extras
INSERT INTO product_extras (product_id, name, price, is_default)
SELECT id, 'كريمة إضافية', 5, FALSE FROM products WHERE name = 'قهوة عربية' OR name = 'قهوة تركية';

INSERT INTO product_extras (product_id, name, price, is_default)
SELECT id, 'شوكولاتة إضافية', 10, FALSE FROM products WHERE name = 'كيك الشوكولاتة';

-- Create functions and triggers

-- Function to update user level based on total orders
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
DECLARE
  total_orders INTEGER;
  new_level VARCHAR(20);
BEGIN
  -- Count total completed orders for the user
  SELECT COUNT(*) INTO total_orders
  FROM orders
  WHERE user_id = NEW.user_id AND status = 'completed';
  
  -- Determine new level based on order count
  IF total_orders >= 20 THEN
    new_level := 'platinum';
  ELSIF total_orders >= 10 THEN
    new_level := 'gold';
  ELSIF total_orders >= 5 THEN
    new_level := 'silver';
  ELSE
    new_level := 'bronze';
  END IF;
  
  -- Update user level if changed
  UPDATE users
  SET level = new_level, updated_at = NOW()
  WHERE id = NEW.user_id AND level <> new_level;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update user level after order completion
CREATE TRIGGER trigger_update_user_level
AFTER UPDATE OF status ON orders
FOR EACH ROW
WHEN (NEW.status = 'completed' AND OLD.status <> 'completed')
EXECUTE FUNCTION update_user_level();

-- Function to add coins to user after order completion
CREATE OR REPLACE FUNCTION add_coins_after_order()
RETURNS TRIGGER AS $$
DECLARE
  coins_to_add INTEGER;
BEGIN
  -- Calculate coins to add (10% of order total)
  coins_to_add := FLOOR(NEW.total * 10);
  
  -- Add coins to user balance
  UPDATE user_coins
  SET balance = balance + coins_to_add
  WHERE user_id = NEW.user_id;
  
  -- Create coin transaction record
  INSERT INTO coin_transactions (user_id, amount, type, description, reference_id)
  VALUES (NEW.user_id, coins_to_add, 'earned', 'Coins earned from order ' || NEW.id, NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to add coins after order completion
CREATE TRIGGER trigger_add_coins_after_order
AFTER UPDATE OF status ON orders
FOR EACH ROW
WHEN (NEW.status = 'completed' AND OLD.status <> 'completed' AND NEW.user_id IS NOT NULL)
EXECUTE FUNCTION add_coins_after_order();

-- Function to update product rating after order completion
CREATE OR REPLACE FUNCTION update_product_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update product review count and recalculate rating
  UPDATE products
  SET review_count = review_count + 1,
      updated_at = NOW()
  WHERE id IN (SELECT product_id FROM order_items WHERE order_id = NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product stats after order completion
CREATE TRIGGER trigger_update_product_stats
AFTER UPDATE OF status ON orders
FOR EACH ROW
WHEN (NEW.status = 'completed' AND OLD.status <> 'completed')
EXECUTE FUNCTION update_product_stats();
