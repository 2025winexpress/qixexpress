# مخطط لوحة تحكم المشرف

## نظرة عامة

لوحة تحكم المشرف هي واجهة شاملة تتيح للمسؤولين إدارة جميع جوانب تطبيق برنامج الولاء، بما في ذلك المتجر، الطلبات، المستخدمين، برنامج الولاء، وتحويلات الكوينز. تم تصميم اللوحة بناءً على هيكل قاعدة البيانات الحالية وعلاقاتها.

## هيكل قاعدة البيانات وعلاقاتها

### الجداول الرئيسية

1. **المستخدمين (users)**
   - المعرف الفريد، البريد الإلكتروني، الاسم، الهاتف، العنوان، الصورة، المستوى

2. **بطاقات الولاء (loyalty_cards)**
   - المعرف، معرف المستخدم، رقم البطاقة، نوع البطاقة، الرصيد، تاريخ الانتهاء

3. **مراحل المكافآت (reward_stages)**
   - المعرف، معرف البطاقة، الاسم، الطوابع المطلوبة، الوصف

4. **معاملات الكوينز (coin_transactions)**
   - المعرف، معرف المستخدم، المبلغ، النوع، الوصف، المرجع

5. **رصيد الكوينز (user_coins)**
   - معرف المستخدم، الرصيد

6. **المنتجات (products)**
   - المعرف، الاسم، الوصف، السعر، سعر الخصم، سعر الكوينز، الصورة، الفئة

7. **خيارات المنتج (product_options)**
   - المعرف، معرف المنتج، الاسم، السعر، الافتراضي

8. **إضافات المنتج (product_extras)**
   - المعرف، معرف المنتج، الاسم، السعر، الافتراضي

9. **الطلبات (orders)**
   - المعرف، معرف المستخدم، الإجمالي، الخصم، الحالة، تاريخ التوصيل، وقت التوصيل

10. **عناصر الطلب (order_items)**
    - المعرف، معرف الطلب، معرف المنتج، الكمية، السعر، الخيارات، الإضافات

### العلاقات الرئيسية

- المستخدم -> بطاقات الولاء (علاقة واحد إلى متعدد)
- بطاقات المكافآت -> مراحل المكافآت (علاقة واحد إلى متعدد)
- المستخدم -> معاملات الكوينز (علاقة واحد إلى متعدد)
- المستخدم -> رصيد الكوينز (علاقة واحد إلى واحد)
- المنتج -> خيارات المنتج (علاقة واحد إلى متعدد)
- المنتج -> إضافات المنتج (علاقة واحد إلى متعدد)
- المستخدم -> الطلبات (علاقة واحد إلى متعدد)
- الطلب -> عناصر الطلب (علاقة واحد إلى متعدد)

## مكونات لوحة التحكم

### 1. لوحة القيادة الرئيسية

**الوظائف:**
- عرض إحصائيات عامة (عدد المستخدمين، إجمالي المبيعات، عدد الطلبات النشطة)
- عرض الرسوم البيانية للمبيعات والإيرادات
- عرض أحدث الطلبات والمستخدمين الجدد
- عرض تنبيهات النظام والإشعارات

**واجهة المستخدم:**
- بطاقات إحصائية مع أيقونات ملونة
- رسوم بيانية تفاعلية (خطية وشريطية ودائرية)
- جداول مختصرة مع إمكانية التوسيع

### 2. إدارة المتجر

**الوظائف:**
- إدارة المنتجات (إضافة، تعديل، حذف)
- إدارة فئات المنتجات
- إدارة العروض والخصومات
- إدارة خيارات وإضافات المنتجات

**واجهة المستخدم:**
- جدول منتجات مع خيارات تصفية وبحث
- نموذج إضافة/تعديل منتج مع حقول متعددة
- محرر صور المنتجات مع إمكانية السحب والإفلات
- واجهة إدارة العروض مع تواريخ البدء والانتهاء

**نموذج إدارة المنتج:**
```jsx
<form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="name">اسم المنتج</Label>
      <Input id="name" value={product.name} onChange={handleNameChange} required />
    </div>
    <div>
      <Label htmlFor="category">الفئة</Label>
      <Select value={product.category} onValueChange={handleCategoryChange}>
        <SelectItem value="food">الطعام</SelectItem>
        <SelectItem value="drinks">المشروبات</SelectItem>
        <SelectItem value="desserts">الحلويات</SelectItem>
        <SelectItem value="icecream">المثلجات</SelectItem>
      </Select>
    </div>
    <div className="md:col-span-2">
      <Label htmlFor="description">الوصف</Label>
      <Textarea id="description" value={product.description} onChange={handleDescriptionChange} />
    </div>
    <div>
      <Label htmlFor="price">السعر (درهم)</Label>
      <Input id="price" type="number" value={product.price} onChange={handlePriceChange} required />
    </div>
    <div>
      <Label htmlFor="coinPrice">سعر الكوينز</Label>
      <Input id="coinPrice" type="number" value={product.coinPrice} onChange={handleCoinPriceChange} required />
    </div>
    <div>
      <Label htmlFor="discountPrice">سعر الخصم (اختياري)</Label>
      <Input id="discountPrice" type="number" value={product.discountPrice} onChange={handleDiscountPriceChange} />
    </div>
    <div>
      <Label htmlFor="image">صورة المنتج</Label>
      <Input id="image" type="file" onChange={handleImageChange} />
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="isFlashDeal" checked={product.isFlashDeal} onCheckedChange={handleFlashDealChange} />
      <Label htmlFor="isFlashDeal">عرض محدود</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="isBestSeller" checked={product.isBestSeller} onCheckedChange={handleBestSellerChange} />
      <Label htmlFor="isBestSeller">الأكثر مبيعاً</Label>
    </div>
  </div>
  
  <h3 className="text-lg font-semibold mt-6 mb-2">خيارات المنتج</h3>
  {/* واجهة إدارة خيارات المنتج */}
  
  <h3 className="text-lg font-semibold mt-6 mb-2">إضافات المنتج</h3>
  {/* واجهة إدارة إضافات المنتج */}
  
  <div className="mt-6">
    <Button type="submit">حفظ المنتج</Button>
  </div>
</form>
```

### 3. إدارة الطلبات

**الوظائف:**
- عرض جميع الطلبات مع حالاتها
- تصفية الطلبات حسب الحالة والتاريخ
- تحديث حالة الطلبات
- عرض تفاصيل الطلب (المنتجات، العميل، التوصيل)
- إدارة عمليات الدفع والمردودات

**واجهة المستخدم:**
- جدول طلبات مع ترميز لوني للحالات
- نموذج تفاصيل الطلب مع علامات تبويب
- واجهة تعيين عامل التوصيل
- خريطة لتتبع التوصيل

**نموذج إدارة الطلبات:**
```jsx
<div className="space-y-4">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
    <div className="flex space-x-2">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectItem value="all">جميع الحالات</SelectItem>
        <SelectItem value="pending">قيد الانتظار</SelectItem>
        <SelectItem value="processing">قيد المعالجة</SelectItem>
        <SelectItem value="preparing">قيد التحضير</SelectItem>
        <SelectItem value="delivering">جاري التوصيل</SelectItem>
        <SelectItem value="completed">مكتمل</SelectItem>
        <SelectItem value="rejected">مرفوض</SelectItem>
      </Select>
      <DatePicker date={dateFilter} setDate={setDateFilter} />
    </div>
  </div>
  
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>رقم الطلب</TableHead>
        <TableHead>العميل</TableHead>
        <TableHead>التاريخ</TableHead>
        <TableHead>الإجمالي</TableHead>
        <TableHead>الحالة</TableHead>
        <TableHead>الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {filteredOrders.map((order) => (
        <TableRow key={order.id}>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.customer_name}</TableCell>
          <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
          <TableCell>{order.total} درهم</TableCell>
          <TableCell>
            <Badge variant={getStatusVariant(order.status)}>
              {getStatusLabel(order.status)}
            </Badge>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="sm" onClick={() => openOrderDetails(order)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => openUpdateStatus(order)}>
              <Edit className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  
  {/* نافذة تفاصيل الطلب */}
  <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>تفاصيل الطلب #{selectedOrder?.id}</DialogTitle>
      </DialogHeader>
      {/* محتوى تفاصيل الطلب */}
    </DialogContent>
  </Dialog>
  
  {/* نافذة تحديث الحالة */}
  <Dialog open={isStatusUpdateOpen} onOpenChange={setIsStatusUpdateOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>تحديث حالة الطلب</DialogTitle>
      </DialogHeader>
      <Select value={newStatus} onValueChange={setNewStatus}>
        <SelectItem value="pending">قيد الانتظار</SelectItem>
        <SelectItem value="processing">قيد المعالجة</SelectItem>
        <SelectItem value="preparing">قيد التحضير</SelectItem>
        <SelectItem value="delivering">جاري التوصيل</SelectItem>
        <SelectItem value="completed">مكتمل</SelectItem>
        <SelectItem value="rejected">مرفوض</SelectItem>
      </Select>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsStatusUpdateOpen(false)}>إلغاء</Button>
        <Button onClick={handleUpdateStatus}>تحديث</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>
```

### 4. إدارة المستخدمين

**الوظائف:**
- عرض وتعديل معلومات المستخدمين
- إدارة مستويات المستخدمين (برونزي، فضي، ذهبي، بلاتيني)
- عرض نشاط المستخدم (الطلبات، المعاملات)
- تعليق أو حظر الحسابات

**واجهة المستخدم:**
- جدول مستخدمين مع خيارات تصفية وبحث
- صفحة تفاصيل المستخدم مع علامات تبويب
- رسوم بيانية لنشاط المستخدم

**نموذج إدارة المستخدمين:**
```jsx
<div className="space-y-4">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
    <div className="flex space-x-2">
      <Input placeholder="بحث..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <Select value={levelFilter} onValueChange={setLevelFilter}>
        <SelectItem value="all">جميع المستويات</SelectItem>
        <SelectItem value="bronze">برونزي</SelectItem>
        <SelectItem value="silver">فضي</SelectItem>
        <SelectItem value="gold">ذهبي</SelectItem>
        <SelectItem value="platinum">بلاتيني</SelectItem>
      </Select>
    </div>
  </div>
  
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>المستخدم</TableHead>
        <TableHead>البريد الإلكتروني</TableHead>
        <TableHead>الهاتف</TableHead>
        <TableHead>المستوى</TableHead>
        <TableHead>تاريخ التسجيل</TableHead>
        <TableHead>الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {filteredUsers.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.phone || "غير متوفر"}</TableCell>
          <TableCell>
            <Badge variant={getLevelVariant(user.level)}>
              {getLevelLabel(user.level)}
            </Badge>
          </TableCell>
          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
          <TableCell>
            <Button variant="ghost" size="sm" onClick={() => openUserDetails(user)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => openEditUser(user)}>
              <Edit className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  
  {/* نافذة تفاصيل المستخدم */}
  <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>تفاصيل المستخدم</DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          <TabsTrigger value="orders">الطلبات</TabsTrigger>
          <TabsTrigger value="loyalty">برنامج الولاء</TabsTrigger>
          <TabsTrigger value="coins">الكوينز</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          {/* محتوى الملف الشخصي */}
        </TabsContent>
        <TabsContent value="orders">
          {/* محتوى الطلبات */}
        </TabsContent>
        <TabsContent value="loyalty">
          {/* محتوى برنامج الولاء */}
        </TabsContent>
        <TabsContent value="coins">
          {/* محتوى الكوينز */}
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
  
  {/* نافذة تعديل المستخدم */}
  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>تعديل المستخدم</DialogTitle>
      </DialogHeader>
      {/* نموذج تعديل المستخدم */}
    </DialogContent>
  </Dialog>
</div>
```

### 5. إدارة برنامج الولاء وتوليد البطاقات

**الوظائف:**
- إنشاء وإدارة بطاقات المكافآت
- إنشاء وإدارة بطاقات الهدايا
- تكوين مراحل المكافآت والطوابع
- توليد أرقام بطاقات جديدة
- تتبع استخدام البطاقات

**واجهة المستخدم:**
- واجهة إنشاء بطاقات مع خيارات متعددة
- جدول البطاقات النشطة
- مولد أرقام بطاقات مع خيارات التخصيص
- مخطط مراحل المكافآت

**نموذج إدارة البطاقات:**
```jsx
<div className="space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">إدارة برنامج الولاء</h2>
    <Button onClick={() => setIsGeneratorOpen(true)}>
      <Plus className="mr-2 h-4 w-4" />
      توليد بطاقات جديدة
    </Button>
  </div>
  
  <Tabs defaultValue="rewards">
    <TabsList>
      <TabsTrigger value="rewards">بطاقات المكافآت</TabsTrigger>
      <TabsTrigger value="gift">بطاقات الهدايا</TabsTrigger>
      <TabsTrigger value="coins">بطاقات الكوينز</TabsTrigger>
      <TabsTrigger value="stages">مراحل المكافآت</TabsTrigger>
    </TabsList>
    
    <TabsContent value="rewards">
      <Card>
        <CardHeader>
          <CardTitle>بطاقات المكافآت</CardTitle>
          <CardDescription>إدارة بطاقات المكافآت وتتبع استخدامها</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم البطاقة</TableHead>
                <TableHead>المستخدم</TableHead>
                <TableHead>الرصيد</TableHead>
                <TableHead>الحد الأقصى</TableHead>
                <TableHead>تاريخ الإضافة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rewardCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>{card.card_number}</TableCell>
                  <TableCell>{card.user_name || "غير مستخدمة"}</TableCell>
                  <TableCell>{card.balance}</TableCell>
                  <TableCell>{card.max_balance}</TableCell>
                  <TableCell>{new Date(card.date_added).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={card.is_active ? "success" : "destructive"}>
                      {card.is_active ? "نشطة" : "غير نشطة"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => openCardDetails(card)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEditCard(card)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="gift">
      {/* محتوى بطاقات الهدايا */}
    </TabsContent>
    
    <TabsContent value="coins">
      {/* محتوى بطاقات الكوينز */}
    </TabsContent>
    
    <TabsContent value="stages">
      {/* محتوى مراحل المكافآت */}
    </TabsContent>
  </Tabs>
  
  {/* نافذة توليد البطاقات */}
  <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>توليد بطاقات جديدة</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardType">نوع البطاقة</Label>
          <Select id="cardType" value={cardType} onValueChange={setCardType}>
            <SelectItem value="rewards">بطاقة مكافآت</SelectItem>
            <SelectItem value="gift">بطاقة هدية</SelectItem>
            <SelectItem value="coins">بطاقة كوينز</SelectItem>
          </Select>
        </div>
        <div>
          <Label htmlFor="count">عدد البطاقات</Label>
          <Input id="count" type="number" value={cardCount} onChange={(e) => setCardCount(parseInt(e.target.value))} min="1" max="100" />
        </div>
        {cardType === "gift" && (
          <div>
            <Label htmlFor="value">القيمة (درهم)</Label>
            <Input id="value" type="number" value={cardValue} onChange={(e) => setCardValue(parseFloat(e.target.value))} min="1" />
          </div>
        )}
        {cardType === "coins" && (
          <div>
            <Label htmlFor="coinValue">قيمة الكوينز</Label>
            <Input id="coinValue" type="number" value={coinValue} onChange={(e) => setCoinValue(parseInt(e.target.value))} min="1" />
          </div>
        )}
        <div>
          <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
          <Input id="expiryDate" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsGeneratorOpen(false)}>إلغاء</Button>
        <Button onClick={handleGenerateCards}>توليد البطاقات</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>
```

### 6. إدارة تحويلات الكوينز

**الوظائف:**
- عرض جميع معاملات الكوينز
- تصفية المعاملات حسب النوع والتاريخ
- إنشاء معاملات كوينز يدوياً
- تتبع تحويلات الكوينز بين المستخدمين
- إدارة استبدال الكوينز

**واجهة المستخدم:**
- جدول معاملات مع ترميز لوني للأنواع
- نموذج إنشاء معاملة جديدة
- رسوم بيانية لاتجاهات استخدام الكوينز

**نموذج إدارة تحويلات الكوينز:**
```jsx
<div className="space-y-4">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">إدارة تحويلات الكوينز</h2>
    <div className="flex space-x-2">
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectItem value="all">جميع الأنواع</SelectItem>
        <SelectItem value="earned">مكتسب</SelectItem>
        <SelectItem value="spent">مستخدم</SelectItem>
        <SelectItem value="transferred">محول</SelectItem>
        <SelectItem value="received">مستلم</SelectItem>
      </Select>
      <DatePicker date={dateFilter} setDate={setDateFilter} />
      <Button onClick={() => setIsNewTransactionOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        معاملة جديدة
      </Button>
    </div>
  </div>
  
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>المعرف</TableHead>
        <TableHead>المستخدم</TableHead>
        <TableHead>النوع</TableHead>
        <TableHead>المبلغ</TableHead>
        <TableHead>الوصف</TableHead>
        <TableHead>التاريخ</TableHead>
        <TableHead>الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {filteredTransactions.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell>{transaction.id}</TableCell>
          <TableCell>{transaction.user_name}</TableCell>
          <TableCell>
            <Badge variant={getTransactionTypeVariant(transaction.type)}>
              {getTransactionTypeLabel(transaction.type)}
            </Badge>
          </TableCell>
          <TableCell className={transaction.type === "earned" || transaction.type === "received" ? "text-green-600" : "text-red-600"}>
            {transaction.type === "earned" || transaction.type === "received" ? "+" : "-"}{transaction.amount}
          </TableCell>
          <TableCell>{transaction.description}</TableCell>
          <TableCell>{new Date(transaction.created_at).toLocaleString()}</TableCell>
          <TableCell>
            <Button variant="ghost" size="sm" onClick={() => openTransactionDetails(transaction)}>
              <Eye className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  
  {/* نافذة معاملة جديدة */}
  <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>إنشاء معاملة كوينز جديدة</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label htmlFor="userId">المستخدم</Label>
          <Select id="userId" value={userId} onValueChange={setUserId}>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>{user.name} ({user.email})</SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="transactionType">نوع المعاملة</Label>
          <Select id="transactionType" value={transactionType} onValueChange={setTransactionType}>
            <SelectItem value="earned">مكتسب</SelectItem>
            <SelectItem value="spent">مستخدم</SelectItem>
          </Select>
        </div>
        <div>
          <Label htmlFor="amount">المبلغ</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} min="1" />
        </div>
        <div>
          <Label htmlFor="description">الوصف</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsNewTransactionOpen(false)}>إلغاء</Button>
        <Button onClick={handleCreateTransaction}>إنشاء</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>
```

## تكامل النظام

### 1. واجهة برمجة التطبيقات (API)

يجب إنشاء واجهات برمجة تطبيقات RESTful لكل وظيفة في لوحة التحكم:

- `/api/admin/products` - إدارة المنتجات
- `/api/admin/orders` - إدارة الطلبات
- `/api/admin/users` - إدارة المستخدمين
- `/api/admin/loyalty` - إدارة برنامج الولاء
- `/api/admin/transactions` - إدارة المعاملات

### 2. المصادقة والتفويض

- استخدام Supabase للمصادقة
- إنشاء أدوار مختلفة (مشرف، مدير متجر، مدير طلبات)
- تطبيق سياسات الوصول المستند إلى الصفوف (RLS) في قاعدة البيانات

### 3. التكامل مع التطبيق الرئيسي

- مشاركة نفس قاعدة البيانات مع التطبيق الرئيسي
- استخدام نفس نظام المصادقة
- تنفيذ إشعارات في الوقت الفعلي للطلبات الجديدة والتغييرات

## خطة التنفيذ

### المرحلة 1: الإعداد الأساسي

1. إنشاء مشروع React جديد للوحة التحكم
2. إعداد التوجيه والمصادقة
3. إنشاء المكونات الأساسية والتخطيط

### المرحلة 2: إدارة المنتجات والمتجر

1. تنفيذ واجهة إدارة المنتجات
2. تنفيذ إدارة الفئات والخيارات والإضافات
3. تنفيذ إدارة العروض والخصومات

### المرحلة 3: إدارة الطلبات

1. تنفيذ واجهة عرض الطلبات وتصفيتها
2. تنفيذ تحديث حالة الطلبات
3. تنفيذ تعيين عمال التوصيل وتتبعهم

### المرحلة 4: إدارة المستخدمين

1. تنفيذ واجهة عرض المستخدمين وتصفيتهم
2. تنفيذ تعديل معلومات المستخدمين
3. تنفيذ إدارة مستويات المستخدمين

### المرحلة 5: إدارة برنامج الولاء

1. تنفيذ واجهة إدارة البطاقات
2. تنفيذ مولد البطاقات
3. تنفيذ إدارة مراحل المكافآت

### المرحلة 6: إدارة تحويلات الكوينز

1. تنفيذ واجهة عرض المعاملات
2. تنفيذ إنشاء المعاملات
3. تنفيذ تقارير وإحصائيات الكوينز

### المرحلة 7: لوحة القيادة والتقارير

1. تنفيذ لوحة القيادة الرئيسية
2. تنفيذ الرسوم البيانية والإحصائيات
3. تنفيذ نظام التقارير

## الخلاصة

لوحة تحكم المشرف ستوفر واجهة شاملة لإدارة جميع جوانب تطبيق برنامج الولاء. من خلال الاستفادة من هيكل قاعدة البيانات الحالي والعلاقات، ستتيح اللوحة للمسؤولين إدارة المتجر، الطلبات، المستخدمين، برنامج الولاء، وتحويلات الكوينز بكفاءة وفعالية.

التصميم المقترح يركز على سهولة الاستخدام، مع واجهات مستخدم بديهية وتدفقات عمل مبسطة. كما يوفر التصميم إمكانية التوسع في المستقبل لإضافة ميزات جديدة أو تعديل الميزات الحالية حسب الحاجة.
