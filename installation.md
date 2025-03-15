# دليل تثبيت وتشغيل تطبيق برنامج الولاء

## متطلبات النظام

- Node.js (الإصدار 16.x أو أحدث)
- npm (الإصدار 8.x أو أحدث)
- Git

## تثبيت التطبيق للتطوير المحلي (localhost)

### 1. استنساخ المستودع

```bash
git clone https://github.com/your-username/loyalty-program.git
cd loyalty-program
```

### 2. تثبيت التبعيات

```bash
npm install
```

### 3. إعداد متغيرات البيئة

قم بإنشاء ملف `.env.local` في المجلد الرئيسي للمشروع وأضف المتغيرات التالية:

```
VITE_SUPABASE_URL=https://your-supabase-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=http://localhost:3000/api
VITE_TEMPO=false
```

### 4. تشغيل خادم التطوير

```bash
npm run dev
```

سيتم تشغيل التطبيق على `http://localhost:5173`

## إعداد قاعدة البيانات

### 1. إنشاء مشروع Supabase

1. قم بإنشاء حساب على [Supabase](https://supabase.com/) إذا لم يكن لديك حساب بالفعل
2. أنشئ مشروعًا جديدًا
3. احصل على عنوان URL ومفتاح الوصول المجهول من إعدادات المشروع

### 2. إعداد جداول قاعدة البيانات

1. انتقل إلى قسم SQL Editor في لوحة تحكم Supabase
2. قم بتنفيذ النص البرمجي SQL الموجود في ملف `database.sql` في المشروع

```sql
-- قم بنسخ محتويات ملف database.sql هنا وتنفيذها في محرر SQL في Supabase
```

### 3. إعداد سياسات الأمان (RLS)

لتأمين البيانات، قم بإعداد سياسات الوصول المستند إلى الصفوف (Row Level Security):

```sql
-- تفعيل RLS لجميع الجداول
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE coin_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_coins ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات للمستخدمين
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- إنشاء سياسات لبطاقات الولاء
CREATE POLICY "Users can view their own loyalty cards" ON loyalty_cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own loyalty cards" ON loyalty_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- إضافة سياسات مماثلة لباقي الجداول
```

## نشر التطبيق للإنتاج

### 1. بناء التطبيق

```bash
npm run build
```

سيتم إنشاء ملفات البناء في مجلد `dist`

### 2. نشر التطبيق

#### خيار 1: استضافة ثابتة (Vercel, Netlify, GitHub Pages)

1. قم بإعداد مشروع جديد على منصة الاستضافة المختارة
2. قم بربط المشروع بمستودع Git الخاص بك
3. قم بتكوين متغيرات البيئة التالية:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` (إذا كنت تستخدم واجهة برمجة تطبيقات خارجية)

#### خيار 2: استضافة على خادم خاص

1. قم بنقل محتويات مجلد `dist` إلى خادم الويب الخاص بك
2. قم بتكوين خادم الويب (Apache, Nginx) لتوجيه جميع الطلبات إلى `index.html`

### 3. إعداد المصادقة في Supabase للإنتاج

1. انتقل إلى إعدادات المصادقة في لوحة تحكم Supabase
2. أضف عناوين URL المسموح بها للتطبيق المنشور
3. قم بتكوين إعدادات البريد الإلكتروني للمصادقة

## استكشاف الأخطاء وإصلاحها

### مشكلات الاتصال بقاعدة البيانات

- تأكد من صحة عنوان URL ومفتاح Supabase
- تحقق من سياسات RLS للتأكد من أنها لا تمنع الوصول المطلوب

### مشكلات المصادقة

- تأكد من تكوين مزودي المصادقة بشكل صحيح في Supabase
- تحقق من عناوين URL المسموح بها في إعدادات المصادقة

### مشكلات التوجيه

- تأكد من تكوين خادم الويب لتوجيه جميع الطلبات إلى `index.html`
- تحقق من إعدادات التوجيه في React Router

## الموارد الإضافية

- [وثائق Supabase](https://supabase.com/docs)
- [وثائق React](https://reactjs.org/docs/getting-started.html)
- [وثائق Vite](https://vitejs.dev/guide/)
- [وثائق Tailwind CSS](https://tailwindcss.com/docs)
