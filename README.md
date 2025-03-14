# برنامج الولاء - Loyalty Program Application

## نظرة عامة - Overview

هذا التطبيق هو نظام برنامج ولاء متكامل مستوحى من ستاربكس، يتيح للمستخدمين اكتشاف وإضافة وإدارة بطاقات المكافآت وبطاقات الهدايا والكوينز في حساباتهم. يوفر التطبيق واجهة سهلة الاستخدام مع تصميم متجاوب يعمل على جميع الأجهزة.

This application is a comprehensive loyalty program system inspired by Starbucks, allowing users to discover, add, and manage reward cards, gift cards, and coins in their accounts. The application provides an easy-to-use interface with a responsive design that works on all devices.

## الصفحات والمكونات - Pages and Components

### 1. الصفحة الرئيسية - Home Page
**الملف:** `src/components/home.tsx`

الصفحة الرئيسية تعرض نظرة عامة على برنامج الولاء وتتيح للمستخدم الوصول إلى جميع الميزات الرئيسية. تتضمن:
- نظرة عامة على برنامج الولاء (الطوابع، الكوينز، بطاقات الهدايا)
- منتجات مميزة من المتجر
- تنقل سهل إلى صفحات أخرى

The home page displays an overview of the loyalty program and allows the user to access all the main features. It includes:
- Overview of the loyalty program (stamps, coins, gift cards)
- Featured products from the store
- Easy navigation to other pages

### 2. صفحة اكتشاف البطاقات - Card Discovery Page
**الملف:** `src/components/loyalty/CardDiscovery.tsx`

تتيح هذه الصفحة للمستخدمين إدخال رقم بطاقة والتحقق منها وإضافتها إلى حسابهم. تتضمن:
- نموذج التحقق من البطاقة (`CardVerificationForm.tsx`)
- عرض تفاصيل البطاقة بعد التحقق (`CardDetails.tsx`)
- معلومات حول أنواع البطاقات المختلفة

This page allows users to enter a card number, verify it, and add it to their account. It includes:
- Card verification form (`CardVerificationForm.tsx`)
- Display of card details after verification (`CardDetails.tsx`)
- Information about different card types

### 3. لوحة تحكم برنامج الولاء - Loyalty Dashboard
**الملف:** `src/components/loyalty/LoyaltyDashboard.tsx`

لوحة تحكم تعرض جميع بطاقات المستخدم ومعلومات برنامج الولاء. تتضمن:
- علامات تبويب للتنقل بين أقسام مختلفة (`DashboardTabs.tsx`)
- قسم المكافآت لعرض بطاقات المكافآت وتقدم الطوابع (`RewardsSection.tsx`)
- قسم بطاقات الهدايا لعرض وإدارة بطاقات الهدايا (`GiftCardSection.tsx`)
- قسم الكوينز لعرض رصيد الكوينز وسجل المعاملات (`CoinsSection.tsx`)

A dashboard that displays all user cards and loyalty program information. It includes:
- Tabs for navigating between different sections (`DashboardTabs.tsx`)
- Rewards section for displaying reward cards and stamp progress (`RewardsSection.tsx`)
- Gift card section for displaying and managing gift cards (`GiftCardSection.tsx`)
- Coins section for displaying coin balance and transaction history (`CoinsSection.tsx`)

### 4. محفظة الولاء - Loyalty Wallet
**الملف:** `src/components/loyalty/LoyaltyWallet.tsx`

تعرض هذه الصفحة رصيد الكوينز وسجل المعاملات وتتيح للمستخدم تحويل الكوينز. تتضمن:
- عرض رصيد الكوينز
- جدول سجل المعاملات
- وظيفة تحويل الكوينز

This page displays the coin balance, transaction history, and allows the user to transfer coins. It includes:
- Coin balance display
- Transaction history table
- Coin transfer functionality

### 5. صفحة المتجر - Store Page
**الملف:** `src/components/store/StorePage.tsx`

تعرض هذه الصفحة منتجات المتجر مقسمة إلى فئات. تتضمن:
- فئات المنتجات (`ProductCategories.tsx`)
- عروض محدودة (`FlashDeals.tsx`)
- الأكثر مبيعاً (`BestSellers.tsx`)

This page displays store products categorized into sections. It includes:
- Product categories (`ProductCategories.tsx`)
- Flash deals (`FlashDeals.tsx`)
- Best sellers (`BestSellers.tsx`)

### 6. صفحة سلة التسوق - Cart Page
**الملف:** `src/components/cart/CartPage.tsx`

تعرض هذه الصفحة المنتجات في سلة التسوق وتتيح للمستخدم إتمام عملية الشراء. تتضمن:
- قائمة المنتجات في السلة
- خيارات التوصيل
- تكامل برنامج الولاء (استخدام بطاقات المكافآت، بطاقات الهدايا، الكوينز)
- طرق الدفع
- إتمام الطلب

This page displays products in the shopping cart and allows the user to complete the purchase. It includes:
- List of products in the cart
- Delivery options
- Loyalty program integration (using reward cards, gift cards, coins)
- Payment methods
- Checkout process

### 7. صفحة تسجيل الدخول - Login Page
**الملف:** `src/components/auth/LoginPage.tsx`

صفحة تسجيل الدخول للمستخدمين. تتضمن:
- نموذج تسجيل الدخول
- رابط لإنشاء حساب جديد
- رابط لاستعادة كلمة المرور

Login page for users. It includes:
- Login form
- Link to create a new account
- Link to recover password

### 8. الرأس والتنقل - Header and Navigation
**الملف:** `src/components/loyalty/Header.tsx`, `src/components/layout/MobileNavigation.tsx`

مكونات التنقل في التطبيق. تتضمن:
- شريط التنقل العلوي
- شريط التنقل السفلي للأجهزة المحمولة
- قائمة المستخدم

Navigation components in the application. They include:
- Top navigation bar
- Bottom navigation bar for mobile devices
- User menu

## قاعدة البيانات - Database

### جداول قاعدة البيانات - Database Tables

#### 1. المستخدمين - Users
```sql
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
```

#### 2. بطاقات الولاء - Loyalty Cards
```sql
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
```

#### 3. مراحل المكافآت - Reward Stages
```sql
CREATE TABLE reward_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID REFERENCES loyalty_cards(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  required_stamps INTEGER NOT NULL,
  description TEXT
);
```

#### 4. معاملات الكوينز - Coin Transactions
```sql
CREATE TABLE coin_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('earned', 'spent', 'transferred', 'received')),
  description TEXT,
  reference_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. رصيد الكوينز - User Coins
```sql
CREATE TABLE user_coins (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0
);
```

#### 6. المنتجات - Products
```sql
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
```

#### 7. خيارات المنتج - Product Options
```sql
CREATE TABLE product_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2),
  is_default BOOLEAN DEFAULT FALSE
);
```

#### 8. إضافات المنتج - Product Extras
```sql
CREATE TABLE product_extras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE
);
```

#### 9. الطلبات - Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  total NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  delivery_date DATE,
  delivery_time VARCHAR(20),
  payment_method VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 10. عناصر الطلب - Order Items
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  options JSONB,
  extras JSONB
);
```

## العلاقات بين الجداول - Table Relationships

1. **المستخدم وبطاقات الولاء** - User and Loyalty Cards
   - علاقة واحد إلى متعدد (مستخدم واحد يمكن أن يملك عدة بطاقات)
   - One-to-many relationship (one user can have multiple cards)

2. **بطاقات المكافآت ومراحل المكافآت** - Reward Cards and Reward Stages
   - علاقة واحد إلى متعدد (بطاقة مكافآت واحدة يمكن أن تحتوي على عدة مراحل)
   - One-to-many relationship (one reward card can have multiple stages)

3. **المستخدم ومعاملات الكوينز** - User and Coin Transactions
   - علاقة واحد إلى متعدد (مستخدم واحد يمكن أن يكون له عدة معاملات)
   - One-to-many relationship (one user can have multiple transactions)

4. **المستخدم ورصيد الكوينز** - User and Coin Balance
   - علاقة واحد إلى واحد (مستخدم واحد له رصيد كوينز واحد)
   - One-to-one relationship (one user has one coin balance)

5. **المنتج وخيارات المنتج** - Product and Product Options
   - علاقة واحد إلى متعدد (منتج واحد يمكن أن يكون له عدة خيارات)
   - One-to-many relationship (one product can have multiple options)

6. **المنتج وإضافات المنتج** - Product and Product Extras
   - علاقة واحد إلى متعدد (منتج واحد يمكن أن يكون له عدة إضافات)
   - One-to-many relationship (one product can have multiple extras)

7. **المستخدم والطلبات** - User and Orders
   - علاقة واحد إلى متعدد (مستخدم واحد يمكن أن يكون له عدة طلبات)
   - One-to-many relationship (one user can have multiple orders)

8. **الطلب وعناصر الطلب** - Order and Order Items
   - علاقة واحد إلى متعدد (طلب واحد يمكن أن يحتوي على عدة عناصر)
   - One-to-many relationship (one order can have multiple items)

## الخدمات والواجهات البرمجية - Services and APIs

### 1. خدمة المصادقة - Authentication Service
**الملف:** `src/services/auth.ts`

تتعامل مع تسجيل الدخول وتسجيل الخروج وإدارة جلسات المستخدم.

Handles login, logout, and user session management.

### 2. خدمة برنامج الولاء - Loyalty Service
**الملف:** `src/services/loyalty.ts`

تتعامل مع إدارة بطاقات الولاء والتحقق منها وتحديث الأرصدة.

Handles loyalty card management, verification, and balance updates.

### 3. خدمة سلة التسوق - Cart Service
**الملف:** `src/services/cart.ts`

تتعامل مع إدارة سلة التسوق وحساب الإجماليات.

Handles shopping cart management and total calculations.

### 4. خدمة الطلبات - Order Service
**الملف:** `src/services/order.ts`

تتعامل مع إنشاء الطلبات وتتبع حالتها.

Handles order creation and status tracking.

### 5. واجهة برمجة المستخدم - User API
**الملف:** `src/api/user.ts`

واجهة برمجية للتفاعل مع بيانات المستخدم في قاعدة البيانات.

API for interacting with user data in the database.

### 6. واجهة برمجة برنامج الولاء - Loyalty API
**الملف:** `src/api/loyalty.ts`

واجهة برمجية للتفاعل مع بيانات برنامج الولاء في قاعدة البيانات.

API for interacting with loyalty program data in the database.

### 7. واجهة برمجة المنتجات - Products API
**الملف:** `src/api/products.ts`

واجهة برمجية للتفاعل مع بيانات المنتجات في قاعدة البيانات.

API for interacting with product data in the database.

### 8. واجهة برمجة الطلبات - Orders API
**الملف:** `src/api/orders.ts`

واجهة برمجية للتفاعل مع بيانات الطلبات في قاعدة البيانات.

API for interacting with order data in the database.

## الأنواع والواجهات - Types and Interfaces

### 1. أنواع المستخدم - User Types
**الملف:** `src/types/user.ts`

تعريفات لأنواع بيانات المستخدم وجلسات المصادقة.

Definitions for user data types and authentication sessions.

### 2. أنواع برنامج الولاء - Loyalty Types
**الملف:** `src/types/loyalty.ts`

تعريفات لأنواع بيانات بطاقات الولاء ومعاملات الكوينز.

Definitions for loyalty card types and coin transactions.

### 3. أنواع المنتجات - Product Types
**الملف:** `src/types/products.ts`

تعريفات لأنواع بيانات المنتجات وخياراتها وإضافاتها.

Definitions for product types, options, and extras.

### 4. أنواع سلة التسوق - Cart Types
**الملف:** `src/types/cart.ts`

تعريفات لأنواع بيانات عناصر سلة التسوق.

Definitions for shopping cart item types.

### 5. أنواع الطلبات - Order Types
**الملف:** `src/types/orders.ts`

تعريفات لأنواع بيانات الطلبات وعناصرها وحالاتها.

Definitions for order types, items, and statuses.

## ملاحظات إضافية - Additional Notes

1. التطبيق يستخدم Supabase كقاعدة بيانات وخدمة مصادقة.
   The application uses Supabase as a database and authentication service.

2. التطبيق يستخدم React Router للتنقل بين الصفحات.
   The application uses React Router for navigation between pages.

3. التطبيق يستخدم Tailwind CSS للتصميم.
   The application uses Tailwind CSS for styling.

4. التطبيق يستخدم ShadCN UI لمكونات واجهة المستخدم.
   The application uses ShadCN UI for user interface components.

5. التطبيق متعدد اللغات ويدعم العربية والإنجليزية.
   The application is multilingual and supports Arabic and English.

6. التطبيق متجاوب ويعمل على جميع أحجام الشاشات.
   The application is responsive and works on all screen sizes.
