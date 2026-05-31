# Vietnamese Dishes Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change the photo for "Phở cuốn bò tây bắc" and add 5 new healthy Vietnamese dishes to the menu database array.

**Architecture:** Modify the flat `MENU_ITEMS` array inside `src/App.jsx` to update item `M26` and append items `M27` through `M31`.

**Tech Stack:** React, Vite

---

### Task 1: Update photo for M26 in `src/App.jsx`

**Files:**
- Modify: `src/App.jsx:634-651`

- [ ] **Step 1: Locate and modify the `img` field of `M26`**

Modify the item `M26` around line 644 to set the image to the raw spring rolls photo.

```javascript
  { 
    id: 'M26', 
    name: { en: 'Grass-Fed Beef Pho Rolls', vi: 'Phở Cuốn Bò Tây Bắc' }, 
    desc: { 
      en: 'Fresh steamed rice noodle sheets wrapped around grilled grass-fed beef slices, fresh regional herbs, and garden lettuce, served with a spiced lime chili fish sauce.', 
      vi: 'Bánh phở tươi cuộn thịt bò ăn cỏ nướng đậm vị Tây Bắc, rau thơm đặc sản và xà lách giòn ngọt, chấm nước mắm chanh ớt cay nồng.' 
    }, 
    cals: 380, 
    macros: { p: 26, c: 45, f: 10 }, 
    price: 52000, 
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', 
    ingredients: [
      { name: { en: 'Steamed Rice Sheets', vi: 'Bánh phở hấp' }, amt: '150g' }, 
      { name: { en: 'Grass-Fed Beef', vi: 'Thịt bò ăn cỏ' }, amt: '120g' }, 
      { name: { en: 'Fresh Regional Herbs', vi: 'Xà lách & Rau thơm' }, amt: '50g' }, 
      { name: { en: 'Spiced Lime Chili Fish Sauce', vi: 'Nước chấm tỏi ớt' }, amt: '40ml' }
    ] 
  }
```

- [ ] **Step 2: Commit Task 1**

```bash
git add src/App.jsx
git commit -m "feat: update photo for grass-fed beef pho rolls (M26)"
```

---

### Task 2: Append 5 new Vietnamese dishes (M27 - M31) to `src/App.jsx`

**Files:**
- Modify: `src/App.jsx:651-653`

- [ ] **Step 1: Append dishes to `MENU_ITEMS`**

Directly append `M27`, `M28`, `M29`, `M30`, and `M31` before the closing square bracket of `MENU_ITEMS` around line 652.

```javascript
  { 
    id: 'M27', 
    name: { en: 'Lean Pork Bun Cha Hanoi', vi: 'Bún Chả Hà Nội Sức Khỏe' }, 
    desc: { 
      en: 'Grilled lean pork shoulder patties, served with brown rice vermicelli, fresh local herbs, pickled green papaya, and a light fish sauce dipping broth.', 
      vi: 'Bún chả Hà Nội phiên bản thịt nạc vai xay nướng, dùng kèm bún gạo lứt dẻo thơm, đu đủ xanh muối chua và nước mắm pha nhạt thanh mát.' 
    }, 
    cals: 480, 
    macros: { p: 35, c: 55, f: 12 }, 
    price: 65000, 
    img: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=600&q=80', 
    ingredients: [
      { name: { en: 'Lean Pork Shoulder', vi: 'Thịt nạc vai heo' }, amt: '150g' }, 
      { name: { en: 'Brown Rice Vermicelli', vi: 'Bún gạo lứt' }, amt: '120g' }, 
      { name: { en: 'Mixed Local Herbs & Papaya', vi: 'Rau thơm & Đu đủ xanh' }, amt: '80g' }, 
      { name: { en: 'Light Dipping Sauce', vi: 'Nước mắm tỏi ớt nhạt' }, amt: '40ml' }
    ] 
  },
  { 
    id: 'M28', 
    name: { en: 'Clean Protein Chicken Pho', vi: 'Phở Gà Ức Sạch Sức Khỏe' }, 
    desc: { 
      en: 'Tender slices of grass-fed chicken breast in a fragrant ginger-spiced broth, topped with clean rice noodles, fresh scallions, coriander, and sweet basil.', 
      vi: 'Bánh phở tươi dùng kèm ức gà sạch hấp mọng nước trong nước dùng ninh thảo mộc gừng quế ấm nồng, hành ngò quế tươi.' 
    }, 
    cals: 390, 
    macros: { p: 32, c: 48, f: 8 }, 
    price: 48000, 
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad8cd305?auto=format&fit=crop&w=600&q=80', 
    ingredients: [
      { name: { en: 'Clean Chicken Breast', vi: 'Ức gà sạch hấp' }, amt: '140g' }, 
      { name: { en: 'Rice Noodles', vi: 'Bánh phở tươi' }, amt: '120g' }, 
      { name: { en: 'Fresh Herbs & Scallions', vi: 'Rau thơm & Hành ngò' }, amt: '60g' }, 
      { name: { en: 'Spiced Broth', vi: 'Nước dùng thảo mộc' }, amt: '350ml' }
    ] 
  },
  { 
    id: 'M29', 
    name: { en: 'High-Protein Shaking Beef with Brown Rice', vi: 'Bò Lúc Lắc Cơm Lứt' }, 
    desc: { 
      en: 'Tender cubes of lean grass-fed beef stir-fried with sweet bell peppers and onions, served on a bed of warm brown rice and fresh watercress salad.', 
      vi: 'Bò phi lê nạc lúc lắc xào nhanh với ớt chuông ngọt, hành tây, dùng kèm cơm gạo lứt dẻo thơm và salad cải xoong xanh.' 
    }, 
    cals: 510, 
    macros: { p: 42, c: 45, f: 18 }, 
    price: 79000, 
    img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80', 
    ingredients: [
      { name: { en: 'Grass-fed Beef Loin', vi: 'Thăn bò ăn cỏ' }, amt: '160g' }, 
      { name: { en: 'Steamed Brown Rice', vi: 'Cơm gạo lứt hấp' }, amt: '120g' }, 
      { name: { en: 'Bell Peppers & Onions', vi: 'Ớt chuông & Hành tây' }, amt: '100g' }, 
      { name: { en: 'Fresh Watercress', vi: 'Cải xoong tươi' }, amt: '50g' }
    ] 
  },
  { 
    id: 'M30', 
    name: { en: 'Mekong Sweet & Sour Shrimp Soup', vi: 'Canh Chua Tôm Đậu Hũ Nam Bộ' }, 
    desc: { 
      en: 'A traditional sweet and sour soup with fresh prawns, organic tofu, pineapple, tomatoes, bean sprouts, and okra, cooked in a light tamarind broth and served with a side of brown rice.', 
      vi: 'Canh chua tôm tươi đậu hũ hữu cơ, dứa, cà chua, giá đỗ và đậu bắp thơm ngon, nấu nước me chua ngọt thanh tao, ăn kèm cơm lứt.' 
    }, 
    cals: 320, 
    macros: { p: 28, c: 42, f: 6 }, 
    price: 58000, 
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', 
    ingredients: [
      { name: { en: 'Poached Prawns', vi: 'Tôm sú tươi luộc' }, amt: '100g' }, 
      { name: { en: 'Organic Tofu', vi: 'Đậu hũ hữu cơ' }, amt: '80g' }, 
      { name: { en: 'Mixed Canh Chua Veggies', vi: 'Rau canh chua hỗn hợp' }, amt: '150g' }, 
      { name: { en: 'Brown Rice Side', vi: 'Cơm gạo lứt ăn kèm' }, amt: '100g' }
    ] 
  },
  { 
    id: 'M31', 
    name: { en: 'Lotus Root Salad with Prawns & Lean Pork', vi: 'Gỏi Ngó Sen Tôm Thịt Nạc' }, 
    desc: { 
      en: 'Crispy lotus rootlets tossed with poached prawns, tender pork loin slices, fresh mint, coriander, and carrots in a tangy lime-chili dressing, topped with a sprinkle of crushed peanuts.', 
      vi: 'Ngó sen tươi giòn trộn tôm luộc ngọt lịm, thịt thăn heo nạc chín mềm, rau răm, húng quế và cà rốt, rưới nước mắm chanh tỏi ớt chua ngọt, lạc rang giòn.' 
    }, 
    cals: 290, 
    macros: { p: 26, c: 28, f: 8 }, 
    price: 49000, 
    img: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80', 
    ingredients: [
      { name: { en: 'Fresh Lotus Rootlets', vi: 'Ngó sen tươi' }, amt: '120g' }, 
      { name: { en: 'Poached Prawns & Pork Loin', vi: 'Tôm luộc & Thăn heo nạc' }, amt: '120g' }, 
      { name: { en: 'Fresh Herbs & Carrots', vi: 'Cà rốt & Rau thơm' }, amt: '60g' }, 
      { name: { en: 'Citrus Fish Sauce', vi: 'Nước chấm chanh tỏi ớt' }, amt: '30ml' }
    ] 
  }
```

- [ ] **Step 2: Commit Task 2**

```bash
git add src/App.jsx
git commit -m "feat: add 5 new healthy Vietnamese dishes (M27-M31) to menu"
```

---

### Task 3: Build and verify codebase compilation

**Files:**
- None (Build verification)

- [ ] **Step 1: Run production build**

Run command: `npm run build`
Expected output: Successful Vite compile without errors.

- [ ] **Step 2: Verify locally with development server**

Check browser to ensure no new errors are logged in console and dishes appear successfully.

---
