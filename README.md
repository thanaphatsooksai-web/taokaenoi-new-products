# เถ้าแก่น้อย NEW SIZE — เว็บแสดงสินค้าใหม่

Landing page สำหรับสินค้าใหม่ตามแผนการตลาดปี 2570 (แคมเปญ “เติมรส”)
- สาหร่ายอบ 20 ก. รสดั้งเดิม / ต้มยำ — 57 บาท
- สาหร่ายโรยข้าว 45 ก. (ซิปล็อก) รสดั้งเดิม / ต้มยำ — 95 บาท

## เริ่มใช้งาน
```bash
npm install
npm run dev   # http://localhost:3000
```

## โครงสร้าง
- `app/page.tsx` — ทุก section ของหน้า (Hero, สินค้า, จุดเด่น, เติมรสทุกมื้อ, บันไดราคา, Cooking Challenge, หาซื้อได้ที่)
- `components/ProductShowcase.tsx` — ตัวเลือกสินค้า/รสชาติแบบ interactive
- `lib/products.ts` — ข้อมูลสินค้า ราคา และเมนูจับคู่ (แก้ข้อมูลที่นี่ที่เดียว)
- `app/globals.css` — ธีม ขาว แดง เหลือง (ตัวแปรสีอยู่ที่ `:root`)
- `assets/` — ภาพแพ็กเกจที่ครอปจากรายงาน

## ดูเว็บออนไลน์
https://thanaphatsooksai-web.github.io/taokaenoi-new-products/

## Deploy
หลังแก้ไขงาน รันคำสั่งนี้เพื่อ build และอัปเดตเว็บบน GitHub Pages (branch `gh-pages`)
```bash
npm run deploy
```

---
เว็บไซต์ต้นแบบประกอบรายงานแผนการตลาด จัดทำเพื่อการศึกษา ไม่ใช่เว็บไซต์ทางการของบริษัท
