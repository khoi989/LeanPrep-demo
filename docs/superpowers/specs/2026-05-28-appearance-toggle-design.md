# Design Spec: Light/Dark Mode Appearance Toggle for LeanPrepUnifiedSuite

This document details the visual and architectural specification for adding a global Light Mode theme and dynamic appearance toggles to the dashboards of the Mobile, Desktop, and Seller interfaces in the `LeanPrepUnifiedSuiteLight` app.

---

## 1. Goal
Create a new version of the `LeanPrepUnifiedSuite` application under a new folder `LeanPrepUnifiedSuiteLight` that introduces a premium light mode styling and a beautifully animated button in the top-right header of all three dashboard views (Mobile, Desktop, and Seller Dashboard) to toggle globally between dark and light appearance.

---

## 2. Color Design System

We will leverage the existing HSL/Hex token-based system by overriding the `:root` variables under `:root.light-mode`. 

### CSS Custom Variables Mapping

| CSS Variable | Dark Mode (Current) | Light Mode (New) | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-dark` | `#09090b` (Zinc 950) | `#f4f4f5` (Zinc 100) | Core page background |
| `--bg-card` | `#18181b` (Zinc 900) | `#ffffff` (White) | Dashboard panels & cards background |
| `--border-color` | `#27272a` (Zinc 800) | `#e4e4e7` (Zinc 200) | Grid lines, boundaries, borders |
| `--text-main` | `#f8fafc` (Slate 50) | `#09090b` (Zinc 950) | Primary headers & body text |
| `--text-muted` | `#a1a1aa` (Zinc 400) | `#71717a` (Zinc 600) | Subtitles, labels, descriptions |
| `--accent-primary` | `#10b981` (Emerald) | `#10b981` (Emerald) | Primary actions, streaks, indicators |

---

## 3. UI Component Specifications

### A. The `<ThemeToggle />` Component
A round, interactive icon button created using Framer Motion micro-animations:
* **Icon Selection**: A Lucide `Sun` icon when in Dark Mode (prompting the user to switch to light), and a `Moon` icon when in Light Mode.
* **Hover Animation**: Scales to `1.1` and slightly increases opacity/brightness.
* **Tap Animation**: Scales down to `0.9` for a responsive mechanical-click feel.
* **Styling**: Sleek glassmorphism (`backdrop-filter: blur(10px)`) that looks premium in both environments.

### B. Dashboard Placement Integration

#### **1. Mobile Dashboard (Home Tab)**
* **Location**: Next to the "Exit Hub" button in the Dashboard header.
* **Alignment**: Styled within the header's flexbox `flex-between` layout, maintaining visual balance without disrupting layout proportions.

#### **2. Desktop Dashboard (Home Tab)**
* **Location**: Next to the Search button/input bar in the Dashboard header.
* **Alignment**: Fits cleanly on the right side of the main layout, ensuring zero alignment shifts or wrapping.

#### **3. Seller Dashboard (Live Kitchen Board)**
* **Location**: Next to the Bell icon in the header.
* **Alignment**: Perfectly centered inside a glass border panel, matching existing seller buttons.

---

## 4. Implementation Details

1. **State Persistence**: A single React `theme` state (`'dark' | 'light'`) will be initialized with a function checking `localStorage.getItem('măm-mate_theme') || 'dark'`.
2. **Side Effects**: A `useEffect` hook will watch the `theme` state, write it back to `localStorage`, and append or remove the `.light-mode` class on the `document.documentElement` (`<html>` element).
3. **App.jsx Style Cleanups**: Hardcoded inline colors that override variables (e.g. `backgroundColor: '#09090b'` or settings inputs' `color: '#fff'`) will be updated to dynamic CSS custom properties (e.g., `'var(--bg-dark)'`, `'var(--text-main)'`) so they change adaptively.

---

## 5. Verification Plan

### Automated Verification
* Run Vite build command to verify that all React components, framing, and stylesheet bundle without any linting or compiling errors.
* Launch a dev server and inspect in Playwright browser to test toggling the theme state and assert that colors load correctly.

### Manual Verification
* Visually check the transitions in Mobile, Desktop, and Seller interfaces when clicking the toggle button to ensure readability and high contrast.
