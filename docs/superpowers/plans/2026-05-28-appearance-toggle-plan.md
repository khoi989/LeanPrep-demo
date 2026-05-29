# Appearance Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a light-mode version of LeanPrepUnifiedSuite with a dynamic toggle button inside a new folder `LeanPrepUnifiedSuiteLight`.

**Architecture:** Use global state and a root `.light-mode` CSS class to dynamically swap theme CSS custom properties on `:root`. Add a beautiful `<ThemeToggle />` component next to the exit button on the Mobile dashboard, next to search on the Desktop dashboard, and next to the notifications on the Seller dashboard.

**Tech Stack:** React 19, Framer Motion, Lucide React, CSS Custom Properties (Variables), Vite.

---

### Task 1: Duplicate Codebase and Install Dependencies

**Files:**
- Create folder: `/Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight`
- Copy from: `/Users/khoi/Documents/Demo/LeanPrepUnifiedSuite` (excluding node_modules and dist)

- [ ] **Step 1: Duplicate files using rsync**

Run: `rsync -av --exclude="node_modules" --exclude="dist" --exclude=".git" /Users/khoi/Documents/Demo/LeanPrepUnifiedSuite/ /Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight/`
Expected: Folder created with code, public assets, and config, excluding dependency weights.

- [ ] **Step 2: Install npm dependencies in the new folder**

Run: `npm install` in `/Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight`
Expected: Node modules installed successfully, package-lock.json matches React 19 specifications.

- [ ] **Step 3: Commit duplicate base**

Run:
```bash
cd /Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight
git init
git add .
git commit -m "chore: duplicate LeanPrepUnifiedSuite baseline"
```
Expected: Local repository initialized and baseline files committed.

---

### Task 2: Implement Theme Styles in index.css

**Files:**
- Modify: `/Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight/src/index.css`

- [ ] **Step 1: Add light mode custom property overrides**

Add the following under line 11 of `index.css`:
```css
:root.light-mode {
  --bg-dark: #f4f4f5;
  --bg-card: #ffffff;
  --border-color: #e4e4e7;
  --text-main: #09090b;
  --text-muted: #71717a;
}
```

- [ ] **Step 2: Add theme-specific CSS helper styles for components**

Add the following classes to the bottom of `index.css` to cover standard element overrides:
```css
/* Theme Toggle Button */
.theme-toggle-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-main);
  transition: all 0.2s ease;
}
.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
:root.light-mode .theme-toggle-btn {
  background: rgba(0, 0, 0, 0.05);
}
:root.light-mode .theme-toggle-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* Specific light mode styling overrides */
:root.light-mode body {
  background-color: #f4f4f5;
}
:root.light-mode .mobile-wrapper {
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.05);
}
@media (min-width: 450px) {
  :root.light-mode .mobile-wrapper {
    border: 8px solid #d4d4d8;
  }
}
:root.light-mode .bottom-nav {
  background: rgba(255, 255, 255, 0.85);
}
:root.light-mode .ui-selector-overlay {
  background: radial-gradient(circle at center, #ffffff, #e4e4e7);
}
:root.light-mode .selector-card {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.08);
}
:root.light-mode .option-btn {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
}
:root.light-mode .option-btn:hover {
  background: rgba(16, 185, 129, 0.08);
}
:root.light-mode .seller-view {
  background-color: var(--bg-dark);
  color: var(--text-main);
}
:root.light-mode .seller-sidebar {
  background: var(--bg-card);
  border-right: 1px solid var(--border-color);
}
:root.light-mode .seller-col {
  background: rgba(0, 0, 0, 0.02);
}
:root.light-mode .seller-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
}
:root.light-mode .seller-metric {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
}
```

- [ ] **Step 3: Commit CSS modifications**

Run:
```bash
git add src/index.css
git commit -m "feat: add light mode CSS variables and overrides"
```
Expected: Styles saved and committed.

---

### Task 3: Setup Theme State and Toggle Component in App.jsx

**Files:**
- Modify: `/Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight/src/App.jsx`

- [ ] **Step 1: Update Lucide React imports for Sun & Moon**

Modify line 3 of `App.jsx` to include `Sun` and `Moon`:
```javascript
import { ShieldCheck, Utensils, Activity, Search, Clock, CheckCircle2, Truck, ChefHat, ArrowLeft, Flame, Scale, LayoutList, Target, ShoppingBag, Plus, Minus, Edit2, X, CreditCard, Wallet, Lock, LayoutDashboard, Package, TrendingUp, Bell, FileText, Zap, ArrowRight, Settings, MessageSquare, Send, MapPin, Sun, Moon } from 'lucide-react';
```

- [ ] **Step 2: Initialize Theme State and Side Effects inside `App()`**

Under line 33 of `App.jsx` (first lines of `App` function):
```javascript
  const [theme, setTheme] = useState(() => localStorage.getItem('măm-mate_theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('măm-mate_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);
```

- [ ] **Step 3: Define the `<ThemeToggle />` Component**

Add the component definition above `function App()` around line 31:
```javascript
const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="theme-toggle-btn"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};
```

- [ ] **Step 4: Commit state and component wiring**

Run:
```bash
git add src/App.jsx
git commit -m "feat: setup theme state, useEffect, and ThemeToggle component"
```

---

### Task 4: Clean up hardcoded inline colors in App.jsx

**Files:**
- Modify: `/Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight/src/App.jsx`

- [ ] **Step 1: Replace hardcoded dark background color on line 264**

Replace:
```javascript
style={{ justifyContent: 'center', backgroundColor: '#09090b', alignItems: 'center' }}
```
with:
```javascript
style={{ justifyContent: 'center', backgroundColor: 'var(--bg-dark)', alignItems: 'center' }}
```

- [ ] **Step 2: Replace hardcoded input text color properties**

In all text input fields where `color: '#fff'` is present, change it to `color: 'var(--text-main)'`. This affects:
- Onboarding screens (search input, settings input fields).
- Dashboard search inputs.
- Chat utility prompt input.

- [ ] **Step 3: Commit inline style replacements**

Run:
```bash
git add src/App.jsx
git commit -m "refactor: clean up inline style color hardcoding for light mode support"
```

---

### Task 5: Inject Toggle Button into Mobile, Desktop, and Seller Views

**Files:**
- Modify: `/Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight/src/App.jsx`

- [ ] **Step 1: Add ThemeToggle to Mobile Dashboard**

Locate Mobile dashboard header (around lines 1345-1353):
```javascript
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <div>
                  <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.85rem' }}>Good Morning, Khoi</p>
                  <h1>Your Dashboard</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <ThemeToggle theme={theme} setTheme={setTheme} />
                  <button onClick={() => setUiMode('selector')} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', padding: '0.5rem 0.75rem', borderRadius: '10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ArrowLeft size={14} /> Exit Hub
                  </button>
                </div>
              </div>
```

- [ ] **Step 2: Add ThemeToggle to Desktop Dashboard**

Locate Desktop main header (around lines 356-371):
```javascript
                <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                  <h1>Your Dashboard</h1>
                  <div style={{ position: 'relative', width: '350px', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        placeholder="Search meals..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }} 
                      />
                    </div>
                    <button className="btn-primary" style={{ width: 'auto', padding: '0 1.25rem', borderRadius: '12px' }}>Search</button>
                  </div>
                </div>
```

- [ ] **Step 3: Add ThemeToggle to Seller Dashboard**

Locate Seller main header (around lines 968-982):
```javascript
          <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>
                {sellerTab === 'kanban' ? 'Live Kitchen Board' : sellerTab === 'inventory' ? 'Inventory Forecast' : 'Performance Analytics'}
              </h1>
              <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Real-time sync with Măm-mate Cloud</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <ThemeToggle theme={theme} setTheme={setTheme} />
              <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <Search size={18} color="var(--text-muted)" />
                <input type="text" placeholder="Search orders..." style={{ background: 'none', border: 'none', color: 'var(--text-main)', outline: 'none' }} />
              </div>
              <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', color: 'var(--text-main)' }}><Bell size={20}/></div>
            </div>
          </div>
```

- [ ] **Step 4: Commit header modifications**

Run:
```bash
git add src/App.jsx
git commit -m "feat: integrate ThemeToggle button into Mobile, Desktop, and Seller dashboards"
```

---

### Task 6: Build and Verify Dev Server

**Files:**
- Create: `/Users/khoi/Documents/Demo/LeanPrepUnifiedSuiteLight/walkthrough.md`

- [ ] **Step 1: Test the production build of the light mode project**

Run: `npm run build` inside `LeanPrepUnifiedSuiteLight`
Expected: Compilation completes without error.

- [ ] **Step 2: Start dev server for new LeanPrepUnifiedSuiteLight app**

Run: `npm run dev` inside `LeanPrepUnifiedSuiteLight`
Expected: Server starts on a secondary port (like `http://localhost:5174/LeanPrep-demo/` or `5173` if we killed the old one).

- [ ] **Step 3: Document walkthrough.md**

Create `walkthrough.md` in `LeanPrepUnifiedSuiteLight` explaining changes and visual confirmation details.
