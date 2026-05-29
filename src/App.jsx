import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Utensils, Activity, Search, Clock, CheckCircle2, Truck, ChefHat, ArrowLeft, Flame, Scale, LayoutList, Target, ShoppingBag, Plus, Minus, Edit2, X, CreditCard, Wallet, Lock, LayoutDashboard, Package, TrendingUp, Bell, FileText, Zap, ArrowRight, Settings, MessageSquare, Send, MapPin, Sun, Moon } from 'lucide-react';
import './index.css';

const MENU_ITEMS = [
  { id: 'M1', name: 'Lemon Herb Chicken', desc: 'Juicy, oven-roasted chicken breast marinated in fresh lemon and herbs, served over a bed of fluffy quinoa and steamed broccoli.', cals: 450, macros: { p: 45, c: 35, f: 12 }, price: 12.99, img: '🍗', ingredients: [{ name: 'Premium Chicken Breast', amt: '170g' }, { name: 'Organic Quinoa', amt: '90g' }, { name: 'Fresh Broccoli', amt: '150g' }, { name: 'Olive Oil & Herbs', amt: '15ml' }] },
  { id: 'M2', name: 'Spicy Salmon Bowl', desc: 'Wild-caught salmon glazed in a spicy-sweet soy reduction, paired with jasmine rice and roasted edamame.', cals: 520, macros: { p: 40, c: 45, f: 18 }, price: 14.99, img: '🍱', ingredients: [{ name: 'Wild-Caught Salmon', amt: '140g' }, { name: 'Jasmine Rice', amt: '120g' }, { name: 'Edamame', amt: '75g' }, { name: 'Spicy Soy Glaze', amt: '30ml' }] },
  { id: 'M3', name: 'Keto Steak & Eggs', desc: 'Grass-fed flank steak seared to perfection alongside two pasture-raised eggs and avocado.', cals: 600, macros: { p: 55, c: 5, f: 38 }, price: 15.99, img: '🥩', ingredients: [{ name: 'Grass-fed Flank Steak', amt: '170g' }, { name: 'Pasture-Raised Eggs', amt: '2 large' }, { name: 'Hass Avocado', amt: '100g' }, { name: 'Grass-fed Butter', amt: '15g' }] },
  { id: 'M4', name: 'Vegan Buddha Bowl', desc: 'A vibrant mix of roasted chickpeas, sweet potatoes, and kale drizzled with a creamy tahini dressing.', cals: 400, macros: { p: 15, c: 55, f: 14 }, price: 11.99, img: '🥗', ingredients: [{ name: 'Roasted Chickpeas', amt: '80g' }, { name: 'Sweet Potatoes', amt: '130g' }, { name: 'Fresh Kale', amt: '100g' }, { name: 'Tahini Dressing', amt: '30g' }] },
  { id: 'M5', name: 'Turkey Meatballs & Zoodles', desc: 'Lean ground turkey meatballs simmered in a rich marinara sauce, served over fresh zucchini noodles.', cals: 380, macros: { p: 42, c: 15, f: 16 }, price: 13.99, img: '🍝', ingredients: [{ name: 'Lean Turkey Meatballs', amt: '140g' }, { name: 'Zucchini Noodles', amt: '150g' }, { name: 'Marinara Sauce', amt: '120ml' }, { name: 'Parmesan Cheese', amt: '10g' }] },
  { id: 'M6', name: 'Mediterranean Shrimp Salad', desc: 'Grilled shrimp over mixed greens with feta, Kalamata olives, cucumbers, and a light vinaigrette.', cals: 350, macros: { p: 38, c: 12, f: 18 }, price: 15.49, img: '🍤', ingredients: [{ name: 'Grilled Shrimp', amt: '170g' }, { name: 'Mixed Greens', amt: '60g' }, { name: 'Kalamata Olives', amt: '30g' }, { name: 'Feta Cheese', amt: '30g' }] },
  { id: 'M7', name: 'Protein Power Pancakes', desc: 'Fluffy whey protein pancakes topped with fresh berries, sliced banana, and sugar-free syrup.', cals: 500, macros: { p: 45, c: 50, f: 10 }, price: 10.99, img: '🥞', ingredients: [{ name: 'Protein Pancake Mix', amt: '60g' }, { name: 'Fresh Berries', amt: '75g' }, { name: 'Sliced Banana', amt: '60g' }, { name: 'Sugar-Free Syrup', amt: '30ml' }] },
  { id: 'M8', name: 'BBQ Jackfruit Wrap', desc: 'Smoky BBQ pulled jackfruit wrapped in a spinach tortilla with crunchy cabbage slaw.', cals: 420, macros: { p: 8, c: 65, f: 12 }, price: 11.49, img: '🌯', ingredients: [{ name: 'Pulled Jackfruit', amt: '150g' }, { name: 'Spinach Tortilla', amt: '1 wrap' }, { name: 'Cabbage Slaw', amt: '50g' }, { name: 'BBQ Sauce', amt: '30g' }] },
  { id: 'M9', name: 'Teriyaki Tofu Stir-Fry', desc: 'Crispy tofu cubes tossed with broccoli, bell peppers, and snap peas in a savory teriyaki glaze.', cals: 450, macros: { p: 25, c: 45, f: 20 }, price: 12.49, img: '🥘', ingredients: [{ name: 'Extra Firm Tofu', amt: '170g' }, { name: 'Mixed Veggies', amt: '200g' }, { name: 'Teriyaki Sauce', amt: '30ml' }, { name: 'Sesame Seeds', amt: '5g' }] },
  { id: 'M10', name: 'Grilled Mahi Mahi', desc: 'Wild-caught Mahi Mahi grilled with lemon and dill, served alongside roasted asparagus spears.', cals: 320, macros: { p: 48, c: 8, f: 10 }, price: 16.99, img: '🐟', ingredients: [{ name: 'Mahi Mahi Filet', amt: '170g' }, { name: 'Asparagus', amt: '130g' }, { name: 'Lemon Wedge', amt: '1 slice' }, { name: 'Olive Oil', amt: '8ml' }] },
  { id: 'M11', name: 'Black Bean Chili', desc: 'Hearty and spicy black bean and sweet potato chili, topped with a dollop of Greek yogurt.', cals: 380, macros: { p: 18, c: 60, f: 8 }, price: 10.49, img: '🍲', ingredients: [{ name: 'Black Beans', amt: '170g' }, { name: 'Diced Sweet Potato', amt: '65g' }, { name: 'Chili Tomato Base', amt: '240ml' }, { name: 'Plain Greek Yogurt', amt: '30g' }] },
  { id: 'M12', name: 'Chicken Pesto Penne', desc: 'Whole wheat penne pasta tossed in a creamy basil pesto sauce with grilled chicken breast strips.', cals: 550, macros: { p: 45, c: 55, f: 18 }, price: 13.49, img: '🍝', ingredients: [{ name: 'Grilled Chicken', amt: '140g' }, { name: 'Whole Wheat Penne', amt: '100g' }, { name: 'Basil Pesto', amt: '30g' }, { name: 'Cherry Tomatoes', amt: '40g' }] },
  { id: 'M13', name: 'Berry Protein Parfait', desc: 'Layers of non-fat Greek yogurt, mixed berries, and a crunchy almond granola.', cals: 250, macros: { p: 22, c: 30, f: 5 }, price: 6.99, img: '🍧', ingredients: [{ name: 'Non-fat Greek Yogurt', amt: '240g' }, { name: 'Mixed Berries', amt: '75g' }, { name: 'Almond Granola', amt: '30g' }, { name: 'Honey', amt: '7g' }] },
];

const WEEK_DATA = [ { day: 'M', val: 1850 }, { day: 'T', val: 2100 }, { day: 'W', val: 1900 }, { day: 'T', val: 2050 }, { day: 'F', val: 2400 }, { day: 'S', val: 1200 }, { day: 'S', val: 0 } ];

const MOCK_SELLER_ORDERS = [
  { id: 'ORD-1042', item: 'Lemon Herb Chicken', macros: '450 kcal', status: 'incoming', time: '10:30 AM', qty: 3, progress: 0 },
  { id: 'ORD-1043', item: 'Spicy Salmon Bowl', macros: '520 kcal', status: 'incoming', time: '10:32 AM', qty: 1, progress: 0 },
  { id: 'ORD-1044', item: 'Vegan Buddha Bowl', macros: '380 kcal', status: 'cooking', time: '10:15 AM', qty: 2, progress: 35 },
  { id: 'ORD-1045', item: 'Keto Steak & Eggs', macros: '600 kcal', status: 'ready', time: '10:05 AM', qty: 1, progress: 70 },
  { id: 'ORD-1046', item: 'Lemon Herb Chicken', macros: '450 kcal', status: 'delivered', time: '09:50 AM', qty: 5, progress: 100 },
];

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

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('măm-mate_theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('măm-mate_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const [onboardStep, setOnboardStep] = useState(() => JSON.parse(localStorage.getItem('măm-mate_onboardStep')) || 0);
  const [userProfile, setUserProfile] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('măm-mate_userProfile')) || { 
      goal: '', 
      diet: '', 
      cals: 2200, 
      eaten: 1200,
      p: 105,
      c: 120,
      f: 45,
      name: 'Khoi',
      age: 25,
      gender: 'Male',
      weight: 75,
      exercise: '3-5 days/week'
    };
    // Force reset eaten and macros on refresh for demo stability
    return { ...saved, eaten: 0, p: 0, c: 0, f: 0 };
  });

  const [tab, setTab] = useState('home');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('măm-mate_cart')) || []);
  const [activeOrder, setActiveOrder] = useState(() => JSON.parse(localStorage.getItem('măm-mate_activeOrder')) || null);
  const [orderStage, setOrderStage] = useState(() => Number(localStorage.getItem('măm-mate_orderStage')) || 0);
  const [isEditingCals, setIsEditingCals] = useState(false);
  const [newCals, setNewCals] = useState(2200);
  const [searchQuery, setSearchQuery] = useState('');
  const [uiMode, setUiMode] = useState(() => localStorage.getItem('măm-mate_uiMode') || 'selector'); 
  const [sellerTab, setSellerTab] = useState('kanban');
  const [sellerOrders, setSellerOrders] = useState(MOCK_SELLER_ORDERS);
  const [showPOModal, setShowPOModal] = useState(false);  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sellerSettings, setSellerSettings] = useState({
    location: 'Măm-mate Central Kitchen - NY',
    capacity: '1500',
    hours: '04:00 AM - 10:00 PM',
    partners: 'Uber Direct & DoorDash Drive'
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', text: "Hello Khoi! I've analyzed your progress. Your current daily target is 2200 kcal. Based on your 'Build Muscle' goal, would you like to adjust this for a cleaner bulk?" },
    { role: 'user', text: "Yes, I feel like 2200 might be a bit low. What do you recommend?" },
    { role: 'ai', text: "Given your activity level, I suggest increasing to 2500 kcal, focusing on an extra 30g of protein. This will optimize muscle protein synthesis without excessive fat gain. Shall I update your dashboard?" }
  ]);
  const [showLiveMap, setShowLiveMap] = useState(false);
  const [streakDays, setStreakDays] = useState(7);

  // Calculate Recommendations
  useEffect(() => {
    if (userProfile.weight && userProfile.age) {
      // Basic Mifflin-St Jeor (simplified for demo)
      let bmr = 10 * userProfile.weight + 6.25 * 175 - 5 * userProfile.age;
      bmr = userProfile.gender === 'Male' ? bmr + 5 : bmr - 161;
      
      const activityMap = {
        'Sedentary': 1.2,
        '1-3 days/week': 1.375,
        '3-5 days/week': 1.55,
        '6-7 days/week': 1.725
      };
      
      const tdee = bmr * (activityMap[userProfile.exercise] || 1.2);
      
      // Adjust based on goal
      let target = tdee;
      if (userProfile.goal === 'Lose Weight') target -= 500;
      if (userProfile.goal === 'Build Muscle') target += 300;
      
      setUserProfile(prev => ({ ...prev, cals: Math.round(target) }));
    }
  }, [userProfile.weight, userProfile.age, userProfile.gender, userProfile.exercise, userProfile.goal]);

  // Persistence logic
  useEffect(() => {
    localStorage.setItem('măm-mate_onboardStep', JSON.stringify(onboardStep));
    localStorage.setItem('măm-mate_userProfile', JSON.stringify(userProfile));
    localStorage.setItem('măm-mate_cart', JSON.stringify(cart));
    localStorage.setItem('măm-mate_activeOrder', JSON.stringify(activeOrder));
    localStorage.setItem('măm-mate_orderStage', orderStage.toString());
    localStorage.setItem('măm-mate_uiMode', uiMode);
  }, [onboardStep, userProfile, cart, activeOrder, orderStage, uiMode]);

  // Cart operations
  const addToCart = (meal) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === meal.id);
      if (existing) return prev.map(i => i.id === meal.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...meal, qty: 1 }];
    });
    setSelectedMeal(null);
    if (uiMode === 'mobile') setTab('cart');
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === id) return { ...i, qty: Math.max(0, i.qty + delta) };
        return i;
      }).filter(i => i.qty > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCals = cart.reduce((sum, item) => sum + (item.cals * item.qty), 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const processPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setIsCheckingOut(false);
        const totalMacros = cart.reduce((acc, item) => ({
          p: acc.p + (item.macros.p * item.qty),
          c: acc.c + (item.macros.c * item.qty),
          f: acc.f + (item.macros.f * item.qty)
        }), { p: 0, c: 0, f: 0 });
        setActiveOrder({ items: cart, totalCals: cartCals, totalMacros });
        setCart([]);
        setOrderStage(0);
        setTab('tracker');
      }, 2000);
    }, 2500);
  };

  useEffect(() => {
    let timer;
    if (activeOrder && orderStage < 4) {
      timer = setTimeout(() => {
        setOrderStage(prev => prev + 1);
        if (orderStage === 3) {
          // Add calories and macros to eaten totals
          setUserProfile(prev => ({ 
            ...prev, 
            eaten: prev.eaten + activeOrder.totalCals,
            p: prev.p + activeOrder.totalMacros.p,
            c: prev.c + activeOrder.totalMacros.c,
            f: prev.f + activeOrder.totalMacros.f
          }));
        }
      }, 3500); 
    }
    return () => clearTimeout(timer);
  }, [activeOrder, orderStage]);

  const pct = Math.min((userProfile.eaten / userProfile.cals) * 100, 100);
  const offset = 314 - (314 * pct) / 100;

  // Auto-moving orders simulation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSellerOrders(prev => {
        return prev.map(order => {
          if (order.status === 'cooking') {
            const newProgress = (order.progress || 0) + 2;
            if (newProgress >= 100) return { ...order, status: 'ready', progress: 0 };
            return { ...order, progress: newProgress };
          }
          if (order.status === 'ready') {
            const newProgress = (order.progress || 0) + 1;
            if (newProgress >= 100) return { ...order, status: 'delivered', progress: 0 };
            return { ...order, progress: newProgress };
          }
          return order;
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const moveOrder = (id, newStatus) => {
    setSellerOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  // UI Selector
  if (uiMode === 'selector') {
    return (
      <div className="ui-selector-overlay">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="selector-card"
        >
          <ChefHat size={64} color="var(--accent-primary)" style={{ margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Măm-mate</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Select your interface to begin the demo</p>
          
          <div className="selector-options">
            <motion.div 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="option-btn" onClick={() => setUiMode('mobile')}
            >
              <Activity size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>Mobile App</h2>
              <p style={{ fontSize: '0.85rem' }}>Personalized experience</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="option-btn" onClick={() => setUiMode('desktop')}
            >
              <ShoppingBag size={48} color="var(--accent-secondary)" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>Desktop Web</h2>
              <p style={{ fontSize: '0.85rem' }}>Full nutrition hub</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="option-btn" onClick={() => setUiMode('seller')}
            >
              <ChefHat size={48} color="var(--accent-warning)" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>Seller Dashboard</h2>
              <p style={{ fontSize: '0.85rem' }}>Kitchen Management</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Shared Onboarding
  if (onboardStep < 3) {
    return (
      <div className={uiMode === 'mobile' ? "mobile-wrapper" : "desktop-container"} style={{ justifyContent: 'center', backgroundColor: 'var(--bg-dark)', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          {onboardStep === 0 && (
            <motion.div key="s0" className="onboard-screen" style={uiMode === 'desktop' ? { width: '450px', position: 'relative', borderRadius: '32px', height: 'auto', padding: '3rem' } : {}} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>What's your primary goal?</h1>
              <p style={{ marginBottom: '2rem' }}>We'll customize your meal plan and macro targets based on this.</p>
              
              {['Lose Weight', 'Maintain Fitness', 'Build Muscle'].map(opt => (
                <div key={opt} className={`onboard-option ${userProfile.goal === opt ? 'selected' : ''}`} onClick={() => setUserProfile({...userProfile, goal: opt})}>
                  <Target size={24} color={userProfile.goal === opt ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{opt}</span>
                </div>
              ))}
              <div style={uiMode === 'mobile' ? { flex: 1 } : { marginTop: '2rem' }} />
              <button className="btn-primary" disabled={!userProfile.goal} onClick={() => setOnboardStep(1)}>Continue</button>
            </motion.div>
          )}

          {onboardStep === 1 && (
            <motion.div key="s1" className="onboard-screen" style={uiMode === 'desktop' ? { width: '450px', position: 'relative', borderRadius: '32px', height: 'auto', padding: '3rem' } : {}} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => setOnboardStep(0)}><ArrowLeft /></button>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Any dietary preferences?</h1>
              <p style={{ marginBottom: '2rem' }}>Our cloud kitchen can adapt to your lifestyle.</p>
              
              {['Standard', 'Keto / Low Carb', 'Vegan / Plant-Based'].map(opt => (
                <div key={opt} className={`onboard-option ${userProfile.diet === opt ? 'selected' : ''}`} onClick={() => setUserProfile({...userProfile, diet: opt})}>
                  <Utensils size={24} color={userProfile.diet === opt ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{opt}</span>
                </div>
              ))}
              <div style={uiMode === 'mobile' ? { flex: 1 } : { marginTop: '2rem' }} />
              <button className="btn-primary" disabled={!userProfile.diet} onClick={() => {
                setOnboardStep(2);
                setTimeout(() => {
                  setUserProfile(p => ({ ...p, cals: p.goal === 'Lose Weight' ? 1800 : p.goal === 'Build Muscle' ? 2800 : 2200 }));
                  setOnboardStep(3);
                }, 2000);
              }}>Continue</button>
            </motion.div>
          )}

          {onboardStep === 2 && (
            <motion.div key="s2" className="onboard-screen" style={uiMode === 'desktop' ? { width: '450px', position: 'relative', borderRadius: '32px', height: 'auto', padding: '3rem' } : {}} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} style={{ marginBottom: '2rem' }}>
                <Activity size={48} color="var(--accent-primary)" />
              </motion.div>
              <h2>Calculating your macros...</h2>
              <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>Using Măm-mate AI to build your perfect profile.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Main App
  if (uiMode === 'desktop') {
    return (
      <div className="desktop-container">
        <div className="desktop-sidebar">
          <div className="sidebar-logo" style={{ marginBottom: '2.5rem' }}>
            <ChefHat size={32} color="var(--accent-primary)" />
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Măm-mate</span>
          </div>
          
          <div className={`desktop-nav-item ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>
            <Activity size={20} /> Dashboard
          </div>
          <div className={`desktop-nav-item ${tab === 'menu' ? 'active' : ''}`} onClick={() => setTab('menu')}>
            <Utensils size={20} /> Kitchen Menu
          </div>
          <div className={`desktop-nav-item ${tab === 'advice' ? 'active' : ''}`} onClick={() => setTab('advice')}>
            <MessageSquare size={20} /> AI Advice
          </div>
          <div className={`desktop-nav-item ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>
            <Settings size={20} /> My Profile
          </div>
          <div className={`desktop-nav-item ${tab === 'tracker' ? 'active' : ''}`} onClick={() => setTab('tracker')}>
            <Truck size={20} /> Tracker
          </div>

          <div style={{ flex: 1 }} />
          
          <button className="desktop-nav-item" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#ff4444' }} onClick={() => setUiMode('selector')}>
            <ArrowLeft size={20} /> Exit to Hub
          </button>
        </div>

        <div className="desktop-main">
          <AnimatePresence mode="wait">
            {tab === 'home' && (
              <motion.div key="d-home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
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
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', color: '#fff', outline: 'none' }} 
                      />
                    </div>
                    <button className="btn-primary" style={{ width: 'auto', padding: '0 1.25rem', borderRadius: '12px' }}>Search</button>
                  </div>
                </div>

                <div className="desktop-stats-row">
                  <div className="dash-card" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div className="progress-ring" style={{ width: '160px', height: '160px' }}>
                      <svg viewBox="0 0 120 120">
                        <circle className="bg" cx="60" cy="60" r="50"></circle>
                        <circle className="fg" cx="60" cy="60" r="50" style={{ strokeDashoffset: (314 - (314 * pct) / 100) }}></circle>
                      </svg>
                      <div className="progress-content">
                        <span className="num" style={{ fontSize: '1.75rem' }}>{Math.max(0, userProfile.cals - userProfile.eaten)}</span>
                        <span className="label">Remaining</span>
                      </div>
                    </div>
                    <div className="macros-summary" style={{ margin: 0, flex: 1 }}>
                      <h3 style={{ marginBottom: '1.5rem' }}>Macro Breakdown</h3>
                      
                      <div style={{ marginBottom: '1.25rem' }}>
                        <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                          <span>Protein ({userProfile.p} / {Math.round((userProfile.cals * 0.3) / 4)}g)</span>
                          <span style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>{Math.round((userProfile.p / ((userProfile.cals * 0.3) / 4)) * 100)}%</span>
                        </div>
                        <div className="macro-bar-bg" style={{ height: '8px' }}>
                          <div className="macro-bar-fg" style={{ width: `${Math.min(100, (userProfile.p / ((userProfile.cals * 0.3) / 4)) * 100)}%`, background: 'var(--accent-secondary)' }}></div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                          <span>Carbs ({userProfile.c} / {Math.round((userProfile.cals * 0.4) / 4)}g)</span>
                          <span style={{ fontWeight: 600, color: '#f59e0b' }}>{Math.round((userProfile.c / ((userProfile.cals * 0.4) / 4)) * 100)}%</span>
                        </div>
                        <div className="macro-bar-bg" style={{ height: '8px' }}>
                          <div className="macro-bar-fg" style={{ width: `${Math.min(100, (userProfile.c / ((userProfile.cals * 0.4) / 4)) * 100)}%`, background: '#f59e0b' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                          <span>Fats ({userProfile.f} / {Math.round((userProfile.cals * 0.3) / 9)}g)</span>
                          <span style={{ fontWeight: 600, color: '#ef4444' }}>{Math.round((userProfile.f / ((userProfile.cals * 0.3) / 9)) * 100)}%</span>
                        </div>
                        <div className="macro-bar-bg" style={{ height: '8px' }}>
                          <div className="macro-bar-fg" style={{ width: `${Math.min(100, (userProfile.f / ((userProfile.cals * 0.3) / 9)) * 100)}%`, background: '#ef4444' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dash-card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Weekly Consistency</h3>
                    <div className="weekly-chart" style={{ height: '120px' }}>
                      {WEEK_DATA.map((d, i) => {
                        const isToday = i === 5;
                        const cals = isToday ? userProfile.eaten : d.val;
                        const realH = (isToday && cals === 0) ? 85 : (cals / userProfile.cals) * 100;
                        return (
                          <div key={i} className="bar-col" style={{ width: '10%' }}>
                            <div className="bar-track" style={{ height: '80px' }}>
                              <div className="bar-fill" style={{ height: `${Math.min(100, realH)}%`, background: isToday ? 'var(--accent-primary)' : 'var(--border-color)' }}></div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: isToday ? '#fff' : 'var(--text-muted)', fontWeight: isToday ? 800 : 400 }}>{d.day}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex-between" style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', background: 'var(--accent-warning)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Flame size={18} color="#000" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{streakDays} Day Streak!</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>You've hit your target 7 days in a row</div>
                        </div>
                      </div>
                      <TrendingUp size={20} color="var(--accent-primary)" />
                    </div>
                  </div>
                </div>

                <h2>Ready to Cook</h2>
                <div className="desktop-menu-grid">
                  {MENU_ITEMS.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                    <div key={item.id} className="meal-card" onClick={() => setSelectedMeal(item)}>
                      <div className="meal-img" style={{ height: '200px' }}>{item.img}</div>
                      <div className="meal-content">
                        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                          <h3 style={{ margin: 0 }}>{item.name}</h3>
                          <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>${item.price}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span className="macro-pill"><Flame size={12} color="var(--accent-warning)" /> {item.cals}</span>
                          <span className="macro-pill">{item.macros.p}g P / {item.macros.c}g C</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 'menu' && (
              <motion.div key="d-menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                  <h1>Explore Kitchen</h1>
                  <div style={{ position: 'relative', width: '350px', display: 'flex', gap: '0.75rem' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        placeholder="Search meals..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', color: '#fff', outline: 'none' }} 
                      />
                    </div>
                    <button className="btn-primary" style={{ width: 'auto', padding: '0 1.25rem', borderRadius: '12px' }}>Search</button>
                  </div>
                </div>
                <div className="desktop-menu-grid" style={{ marginTop: '2rem' }}>
                  {MENU_ITEMS.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                    <div key={item.id} className="meal-card" onClick={() => setSelectedMeal(item)}>
                      <div className="meal-img" style={{ height: '220px' }}>{item.img}</div>
                      <div className="meal-content">
                        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                          <h3>{item.name}</h3>
                          <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>${item.price}</span>
                        </div>
                        <p style={{ marginBottom: '1rem' }}>{item.desc}</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span className="macro-pill"><Flame size={12} color="var(--accent-warning)" /> {item.cals}</span>
                          <span className="macro-pill">{item.macros.p}g P / {item.macros.c}g C</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 'profile' && (
              <motion.div key="d-profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                <h1>My Profile & Goals</h1>
                <div className="desktop-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                  <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Personal Information</h3>
                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                      <div className="input-group">
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
                        <input type="text" value={userProfile.name} onChange={e => setUserProfile({...userProfile, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Age</label>
                          <input type="number" value={userProfile.age} onChange={e => setUserProfile({...userProfile, age: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Gender</label>
                          <select value={userProfile.gender} onChange={e => setUserProfile({...userProfile, gender: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Weight (kg)</label>
                          <input type="number" value={userProfile.weight} onChange={e => setUserProfile({...userProfile, weight: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Exercise Frequency</label>
                          <select value={userProfile.exercise} onChange={e => setUserProfile({...userProfile, exercise: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }}>
                            <option>Sedentary</option>
                            <option>1-3 days/week</option>
                            <option>3-5 days/week</option>
                            <option>6-7 days/week</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <Zap size={24} color="var(--accent-primary)" />
                      <h3 style={{ margin: 0 }}>AI Recommendations</h3>
                    </div>
                    
                    <p style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>Based on your profile, Măm-mate AI recommends the following daily targets for your <strong>{userProfile.goal || 'selected goal'}</strong>:</p>
                    
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                      <div className="flex-between">
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{userProfile.cals} kcal</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Calorie Target</div>
                        </div>
                        <TrendingUp size={24} color="var(--accent-primary)" />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                          <div style={{ fontWeight: 700, color: 'var(--accent-secondary)' }}>{Math.round((userProfile.cals * 0.3) / 4)}g</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>PROTEIN</div>
                        </div>
                        <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                          <div style={{ fontWeight: 700, color: '#f59e0b' }}>{Math.round((userProfile.cals * 0.4) / 4)}g</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>CARBS</div>
                        </div>
                        <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                          <div style={{ fontWeight: 700, color: '#ef4444' }}>{Math.round((userProfile.cals * 0.3) / 9)}g</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>FATS</div>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '1rem' }}>
                        *Calculated using Mifflin-St Jeor formula adjusted for activity factor and {userProfile.goal.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 'advice' && (
              <motion.div key="d-advice" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
                <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                  <h1>AI Nutritional Advice</h1>
                  <div className="macro-pill" style={{ padding: '0.5rem 1rem' }}><Zap size={16} color="var(--accent-primary)" /> Powered by Măm-mate AI</div>
                </div>
                <div className="glass-panel" style={{ flex: 1, borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {aiMessages.map((msg, i) => (
                      <div key={i} style={{ 
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        background: msg.role === 'user' ? 'var(--accent-primary)' : (theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'),
                        color: msg.role === 'user' ? '#000' : 'var(--text-main)',
                        padding: '1.25rem',
                        borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      }}>
                        {msg.text}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="Ask about your diet, macros, or meal timing..." style={{ flex: 1, background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#fff', outline: 'none' }} />
                    <button className="btn-primary" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}><Send size={24}/></button>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 'tracker' && (
              <motion.div key="d-tracker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                <h1>Live Tracking</h1>
                <div className="desktop-tracker-card" style={{ marginTop: '2rem' }}>
                  {!activeOrder ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                      <Truck size={64} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                      <h3>No active orders</h3>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                      <div>
                        <h2 style={{ marginBottom: '2rem' }}>Status: {['Preparing', 'Cooking', 'Ready', 'Out for Delivery', 'Delivered'][orderStage]}</h2>
                        <div className="tracker-steps">
                          <TrackStep active={orderStage >= 0} icon={<Clock size={18}/>} title="Order Confirmed" desc="Kitchen has received your order." />
                          <TrackStep active={orderStage >= 1} icon={<ChefHat size={18}/>} title="In the Kitchen" desc="Our chefs are preparing your meal to the exact gram." />
                          <TrackStep active={orderStage >= 2} icon={<CheckCircle2 size={18}/>} title="Quality Check" desc="Macros verified and meal packaged." />
                          <TrackStep active={orderStage >= 3} icon={<Truck size={18}/>} title="Out for Delivery" desc="A driver is heading to your location." />
                          <TrackStep active={orderStage >= 4} icon={<ShoppingBag size={18}/>} title="Delivered" desc="Enjoy your macro-certified meal!" />
                        </div>
                        {orderStage === 3 && (
                          <button className="btn-primary" style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }} onClick={() => setShowLiveMap(true)}>
                            <MapPin size={20} /> View Live Tracking Map
                          </button>
                        )}
                        {orderStage >= 4 && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                            <CheckCircle2 size={40} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Delivered & Logged!</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{activeOrder.totalCals} kcal and exact macros have been synced to your Dashboard.</p>
                            <button onClick={() => { setActiveOrder(null); setTab('home'); }} className="btn-primary" style={{ maxWidth: '300px', margin: '0 auto' }}>View Dashboard</button>
                          </motion.div>
                        )}
                      </div>
                      <div className="glass-panel" style={{ borderRadius: '24px', padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Order Details</h3>
                        {activeOrder.items.map(item => (
                          <div key={item.id} className="flex-between" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                            <span>{item.qty}x {item.name}</span>
                            <span>${(item.price * item.qty).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="desktop-cart-panel">
          <h2 style={{ marginBottom: '2rem' }}>Cart</h2>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '5rem', color: 'var(--text-muted)' }}>
                <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <p>Select meals to build your week.</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-img">{item.img}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>${item.price}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button className="nav-item" style={{ padding: '4px' }} onClick={() => updateQty(item.id, -1)}><Minus size={14}/></button>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.qty}</span>
                    <button className="nav-item" style={{ padding: '4px' }} onClick={() => updateQty(item.id, 1)}><Plus size={14}/></button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <div className="flex-between" style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn-primary" onClick={handleCheckout}>Confirm Order</button>
            </div>
          )}
        </div>

        {/* Meal Details Modal */}
        <AnimatePresence>
          {selectedMeal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => setSelectedMeal(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                style={{ background: 'var(--bg-card)', width: '900px', borderRadius: '32px', overflow: 'hidden', display: 'flex', maxHeight: '80vh' }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ width: '400px', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10rem' }}>
                  {selectedMeal.img}
                </div>
                <div style={{ flex: 1, padding: '3rem', position: 'relative' }}>
                  <button style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setSelectedMeal(null)}><X size={24}/></button>
                  <h1>{selectedMeal.name}</h1>
                  <p style={{ fontSize: '1.1rem', margin: '1.5rem 0 2rem' }}>{selectedMeal.desc}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'var(--bg-dark)', padding: '1.5rem 1rem', borderRadius: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{selectedMeal.cals}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>KCAL</div>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '1.5rem 1rem', borderRadius: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>{selectedMeal.macros.p}g</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PROTEIN</div>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '1.5rem 1rem', borderRadius: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{selectedMeal.macros.c}g</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CARBS</div>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '1.5rem 1rem', borderRadius: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>{selectedMeal.macros.f}g</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FATS</div>
                    </div>
                  </div>

                  <h3>Macro-Certified Ingredients</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    {selectedMeal.ingredients.map((ing, i) => (
                      <div key={i} className="flex-between" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '12px' }}>
                        <span>{ing.name}</span>
                        <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{ing.amt}</span>
                      </div>
                    ))}
                  </div>

                  <button className="btn-primary" style={{ marginTop: '3rem' }} onClick={() => addToCart(selectedMeal)}>Add to Cart - ${selectedMeal.price}</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout Modal */}
        <AnimatePresence>
          {isCheckingOut && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                style={{ background: 'var(--bg-card)', width: '100%', maxWidth: '450px', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}
              >
                {isProcessingPayment ? (
                  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} style={{ marginBottom: '2rem' }}>
                      <Activity size={64} color="var(--accent-primary)" />
                    </motion.div>
                    <h2>Verifying with Bank...</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Processing your macro-certified order.</p>
                  </div>
                ) : paymentSuccess ? (
                  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} style={{ marginBottom: '2rem' }}>
                      <div style={{ width: '80px', height: '80px', background: 'var(--accent-primary)', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={48} color="#000" />
                      </div>
                    </motion.div>
                    <h2>Payment Successful!</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Your kitchen prep has been prioritized.</p>
                  </div>
                ) : (
                  <>
                    <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Lock size={18} color="var(--accent-primary)" />
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Secure Checkout</h2>
                      </div>
                      <button onClick={() => setIsCheckingOut(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20}/></button>
                    </div>
                    
                    <div style={{ padding: '2rem' }}>
                      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Order Total</span>
                          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)' }}>
                          Includes {cart.reduce((s,i) => s+i.qty, 0)} macro-balanced meals
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Select Payment Method</h3>
                      <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                        <div className={`onboard-option ${paymentMethod === 'card' ? 'selected' : ''}`} style={{ margin: 0, padding: '1rem' }} onClick={() => setPaymentMethod('card')}>
                          <CreditCard size={20} color={paymentMethod === 'card' ? "var(--accent-primary)" : "#fff"} />
                          <div style={{ flex: 1, marginLeft: '1rem' }}>
                            <div style={{ fontWeight: 600 }}>Credit Card</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>•••• •••• •••• 4242</div>
                          </div>
                        </div>
                        <div className={`onboard-option ${paymentMethod === 'apple' ? 'selected' : ''}`} style={{ margin: 0, padding: '1rem' }} onClick={() => setPaymentMethod('apple')}>
                          <Wallet size={20} color={paymentMethod === 'apple' ? "var(--accent-primary)" : "#fff"} />
                          <div style={{ flex: 1, marginLeft: '1rem' }}>
                            <div style={{ fontWeight: 600 }}>Apple Pay</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pay with Touch ID / Face ID</div>
                          </div>
                        </div>
                      </div>

                      <button className="btn-primary" onClick={processPayment}>
                        Pay Now
                      </button>
                      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                        Your payment information is encrypted and secure.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Live Map Modal */}
      <AnimatePresence>
        {showLiveMap && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: uiMode === 'mobile' ? '1rem' : '4rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              style={{ background: 'var(--bg-card)', width: '100%', maxWidth: '1000px', height: '100%', maxHeight: '800px', borderRadius: '32px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
            >
              <button onClick={() => setShowLiveMap(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24}/></button>
              
              <div style={{ height: '100%', position: 'relative', background: '#1a1a1a' }}>
                {/* Arrived Notification */}
                <motion.div 
                  initial={{ opacity: 0, y: -20, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  transition={{ delay: 20 }}
                  style={{ position: 'absolute', top: '2rem', left: '50%', background: 'var(--accent-primary)', color: '#000', padding: '1rem 2rem', borderRadius: '40px', fontWeight: 800, fontSize: '1.25rem', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)', zIndex: 100, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                >
                  <span>Your Order has Arrived! 🍱</span>
                  <button onClick={() => setShowLiveMap(false)} style={{ background: '#000', color: '#fff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>Close Tracker</button>
                </motion.div>
                {/* Simulated Map SVG */}
                <svg width="100%" height="100%" viewBox="0 0 1000 800" style={{ opacity: 0.6 }}>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                  </pattern>
                  <rect width="1000" height="800" fill="url(#grid)" />
                  {/* Streets */}
                  <path d="M 0 400 L 1000 400 M 500 0 L 500 800 M 200 0 L 200 800 M 800 0 L 800 800 M 0 200 L 1000 200 M 0 600 L 1000 600" stroke="rgba(255,255,255,0.1)" strokeWidth="20" fill="none" />
                  
                  {/* Delivery Route */}
                  <motion.path 
                    d="M 200 600 L 500 600 L 500 400 L 800 400" 
                    stroke="var(--accent-primary)" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="10,10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                  />

                  {/* Destination */}
                  <g transform="translate(800, 400)">
                    <circle r="12" fill="var(--accent-secondary)" style={{ opacity: 0.3 }}>
                      <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r="6" fill="var(--accent-secondary)" />
                    <text y="-25" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">HOME</text>
                  </g>

                  {/* Delivery Man */}
                  <motion.g 
                    initial={{ x: 200, y: 600 }}
                    animate={{ x: [200, 500, 500, 800], y: [600, 600, 400, 400] }}
                    transition={{ duration: 20, ease: "linear" }}
                  >
                    <circle r="15" fill="var(--accent-primary)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-primary))' }} />
                    <Truck size={18} x="-9" y="-9" color="#000" />
                    <text y="-25" textAnchor="middle" fill="var(--accent-primary)" fontSize="14" fontWeight="800">COURIER</text>
                  </motion.g>
                </svg>

                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                  <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', borderRadius: '20px', background: 'rgba(0,0,0,0.8)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Estimated Arrival</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>8 - 12 Minutes</div>
                  </div>
                  <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', borderRadius: '20px', background: 'rgba(0,0,0,0.8)', display: uiMode === 'mobile' ? 'none' : 'block' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Driver</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Marco "The Macro" Polo</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    );
  }

  // Seller Dashboard View
  if (uiMode === 'seller') {
    return (
      <div className="seller-view">
        <div className="seller-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', padding: '0 0.5rem' }}>
            <ChefHat size={32} color="var(--accent-primary)" />
            <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Măm-mate Dash</span>
          </div>
          <div className={`desktop-nav-item ${sellerTab === 'kanban' ? 'active' : ''}`} onClick={() => setSellerTab('kanban')}>
            <LayoutDashboard size={20} /> Kitchen Board
          </div>
          <div className={`desktop-nav-item ${sellerTab === 'inventory' ? 'active' : ''}`} onClick={() => setSellerTab('inventory')}>
            <Package size={20} /> Inventory
          </div>
          <div className={`desktop-nav-item ${sellerTab === 'performance' ? 'active' : ''}`} onClick={() => setSellerTab('performance')}>
            <TrendingUp size={20} /> Analytics
          </div>
          <div className={`desktop-nav-item ${sellerTab === 'settings' ? 'active' : ''}`} onClick={() => setSellerTab('settings')}>
            <Settings size={20} /> Settings
          </div>
          
          <button className="desktop-nav-item" style={{ marginTop: 'auto', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#ff4444' }} onClick={() => setUiMode('selector')}>
            <ArrowLeft size={20} /> Exit Dashboard
          </button>
        </div>

        <div className="seller-main">
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
              <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex' }}><Bell size={20}/></div>
            </div>
          </div>

          {sellerTab === 'kanban' && (
            <div className="seller-kanban">
              {['incoming', 'cooking', 'ready', 'delivered'].map(status => (
                <div key={status} className="seller-col">
                  <h3 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {status === 'incoming' && <ArrowRight size={14} />}
                      {status === 'cooking' && <Zap size={14} color="var(--accent-warning)" />}
                      {status === 'ready' && <CheckCircle2 size={14} color="var(--accent-primary)" />}
                      {status === 'delivered' && <Truck size={14} color="var(--accent-secondary)" />}
                      {status === 'ready' ? 'Ready for Delivery' : status === 'delivered' ? 'Delivery' : status}
                    </div>
                    <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '6px' }}>
                      {sellerOrders.filter(o => o.status === status).length}
                    </span>
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {sellerOrders.filter(o => o.status === status).map(order => (
                      <motion.div key={order.id} layout className="seller-card" style={{ padding: '1.5rem' }}>
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                          <span style={{ color: 'var(--accent-secondary)', fontWeight: 700, fontSize: '0.9rem' }}>{order.id}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Clock size={12} /> {order.time}
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{order.qty}x {order.item}</div>
                        
                        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem' }}>
                          <span style={{ background: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{order.macros}</span>
                        </div>

                        {(status === 'cooking' || status === 'ready') && (
                          <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '1.25rem', overflow: 'hidden' }}>
                            <motion.div 
                              style={{ height: '100%', background: status === 'cooking' ? 'var(--accent-warning)' : 'var(--accent-primary)' }}
                              animate={{ width: `${order.progress || 0}%` }}
                            />
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          {status === 'incoming' && (
                            <button className="btn-primary" style={{ padding: '0.6rem', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={() => moveOrder(order.id, 'cooking')}>
                              Start Prep <ArrowRight size={14} />
                            </button>
                          )}
                          {status === 'cooking' && (
                            <>
                              <button style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.8rem' }} onClick={() => moveOrder(order.id, 'incoming')}>Undo</button>
                              <button className="btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={() => moveOrder(order.id, 'ready')}>
                                Mark Ready <ArrowRight size={14} />
                              </button>
                            </>
                          )}
                          {status === 'ready' && (
                            <>
                              <button style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.8rem' }} onClick={() => moveOrder(order.id, 'cooking')}>Undo</button>
                              <button className="btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={() => moveOrder(order.id, 'delivered')}>
                                Dispatch <ArrowRight size={14} />
                              </button>
                            </>
                          )}
                          {status === 'delivered' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                              <CheckCircle2 size={16} /> Delivered Successfully
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {sellerTab === 'inventory' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
              <div>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Package size={24} color="var(--accent-primary)" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>AI Inventory Procurement</h3>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Based on user meal plan selections for the upcoming week, we recommend ordering by Thursday 5PM.</p>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }} onClick={() => setShowPOModal(true)}>Generate Purchase Order</button>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '1rem' }}>Ingredient</th>
                        <th>Stock on Hand</th>
                        <th>7-Day Forecast</th>
                        <th>Deficit (To Order)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Premium Chicken Breast', stock: '12 kg', forecast: '68 kg', deficit: '56 kg', status: 'critical' },
                        { name: 'Wild-Caught Salmon', stock: '5 kg', forecast: '25 kg', deficit: '20 kg', status: 'low' },
                        { name: 'Grass-fed Flank Steak', stock: '8 kg', forecast: '35 kg', deficit: '27 kg', status: 'low' },
                        { name: 'Organic Quinoa', stock: '4 kg', forecast: '18 kg', deficit: '14 kg', status: 'low' },
                        { name: 'Fresh Broccoli', stock: '15 kg', forecast: '33 kg', deficit: '18 kg', status: 'optimal' },
                        { name: 'Extra Firm Tofu', stock: '3 kg', forecast: '15 kg', deficit: '12 kg', status: 'critical' },
                        { name: 'Sweet Potatoes', stock: '22 kg', forecast: '40 kg', deficit: '18 kg', status: 'optimal' },
                        { name: 'Zucchini Noodles', stock: '5 kg', forecast: '20 kg', deficit: '15 kg', status: 'low' }
                      ].map((ing, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                          <td style={{ padding: '1.25rem', fontWeight: 600 }}>{ing.name}</td>
                          <td>{ing.stock}</td>
                          <td>{ing.forecast}</td>
                          <td style={{ color: 'var(--accent-warning)', fontWeight: 700 }}>{ing.deficit}</td>
                          <td>
                            <span style={{ 
                              padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase',
                              background: ing.status === 'critical' ? 'rgba(239, 68, 68, 0.1)' : ing.status === 'low' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                              color: ing.status === 'critical' ? '#ef4444' : ing.status === 'low' ? '#f59e0b' : 'var(--accent-primary)'
                            }}>
                              {ing.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Value on Hand</p>
                  <h2 style={{ margin: '0.5rem 0', fontSize: '1.75rem' }}>$3,240.50</h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>Optimal Range</p>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Wastage Rate (Weekly)</p>
                  <h2 style={{ margin: '0.5rem 0', fontSize: '1.75rem' }}>1.2%</h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>Industry avg: 4-10%</p>
                </div>
              </div>
            </div>
          )}

          {sellerTab === 'performance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gross Revenue (MTD)</p>
                  <h2 style={{ margin: '0.5rem 0', fontSize: '2.5rem' }}>$42,850</h2>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600 }}>+15.2% vs last month</p>
                </div>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Avg. Prep & Cook Time</p>
                  <h2 style={{ margin: '0.5rem 0', fontSize: '2.5rem' }}>14.2 min</h2>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#10b981', fontWeight: 600 }}>-1.5 min from target</p>
                </div>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Macro Accuracy Rate</p>
                  <h2 style={{ margin: '0.5rem 0', fontSize: '2.5rem' }}>99.8%</h2>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Based on digital scale logs</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ marginBottom: '2rem' }}>Top Selling Meals (This Week)</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                      { rank: 1, name: 'Lemon Herb Chicken', orders: 342, rev: '$4,442' },
                      { rank: 2, name: 'Spicy Salmon Bowl', orders: 289, rev: '$4,332' },
                      { rank: 3, name: 'Keto Steak & Eggs', orders: 215, rev: '$3,437' },
                      { rank: 4, name: 'Vegan Buddha Bowl', orders: 198, rev: '$2,374' }
                    ].map(m => (
                      <div key={m.rank} className="flex-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{m.rank}</span>
                          <span style={{ fontWeight: 700 }}>{m.name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{m.orders} orders</span>
                          <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{m.rev}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '2rem' }}>Customer Retention</h3>
                  <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 2rem' }}>
                    <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--accent-secondary)" strokeWidth="12" strokeDasharray="314" strokeDashoffset="70" strokeLinecap="round" />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>78%</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>SUBSCRIBED</div>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target: 80% • <span style={{ color: 'var(--accent-primary)' }}>+2% this week</span></p>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)', position: 'relative' }}>
                <div className="flex-between" style={{ alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                  <h3 style={{ margin: 0 }}>Daily Order Volume (Last 7 Days)</h3>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'Arial, sans-serif', opacity: 0.8 }}>
                    Weekly Avg: 387
                  </span>
                </div>
                <div style={{ position: 'relative', height: '200px', padding: '0 2rem', marginTop: '1rem' }}>
                  {/* SVG Line Overlay */}
                  <svg viewBox="0 0 520 120" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', width: 'calc(100% - 4rem)', height: '150px', overflow: 'visible', zIndex: 0, pointerEvents: 'none' }}>
                    {/* Constant Average Line at 387 */}
                    <line 
                      x1="0" y1="43" x2="520" y2="43" 
                      stroke="var(--accent-primary)" 
                      strokeWidth="2" 
                      strokeDasharray="6 4" 
                      style={{ opacity: 0.5 }}
                    />
                  </svg>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '150px', position: 'relative', zIndex: 1 }}>
                    {[
                      { day: 'Mon', val: 310 }, { day: 'Tue', val: 420 }, { day: 'Wed', val: 385 },
                      { day: 'Thu', val: 490 }, { day: 'Fri', val: 580 }, { day: 'Sat', val: 240 }, { day: 'Sun', val: 290 }
                    ].map((d, idx) => {
                      const avg = 387; 
                      const isBelow = d.val < avg;
                      return (
                        <div key={idx} style={{ textAlign: 'center', width: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: isBelow ? 'var(--text-muted)' : 'var(--accent-primary)' }}>{d.val}</div>
                          <div style={{ 
                            width: '32px',
                            height: `${(d.val / 600) * 120}px`, 
                            background: isBelow ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.8)', 
                            borderRadius: '6px 6px 0 0',
                            transition: 'all 0.3s ease'
                          }}></div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontWeight: 600 }}>{d.day}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {sellerTab === 'settings' && (
            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border-color)', maxWidth: '900px' }}>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Kitchen Profile</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div className="onboard-option" style={{ margin: 0, padding: '1rem 1.5rem', display: 'block', height: 'auto', border: 'none', background: theme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)' }}>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Location Name</p>
                  <input type="text" value={sellerSettings.location} onChange={e => setSellerSettings({...sellerSettings, location: e.target.value})} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1rem', width: '100%', outline: 'none' }} />
                </div>
                <div className="onboard-option" style={{ margin: 0, padding: '1rem 1.5rem', display: 'block', height: 'auto', border: 'none', background: theme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)' }}>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Max Capacity (Meals/Day)</p>
                  <input type="number" value={sellerSettings.capacity} onChange={e => setSellerSettings({...sellerSettings, capacity: e.target.value})} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1rem', width: '100%', outline: 'none' }} />
                </div>
                <div className="onboard-option" style={{ margin: 0, padding: '1rem 1.5rem', display: 'block', height: 'auto', border: 'none', background: theme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)' }}>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Operating Hours</p>
                  <input type="text" value={sellerSettings.hours} onChange={e => setSellerSettings({...sellerSettings, hours: e.target.value})} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1rem', width: '100%', outline: 'none' }} />
                </div>
                <div className="onboard-option" style={{ margin: 0, padding: '1rem 1.5rem', display: 'block', height: 'auto', border: 'none', background: theme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)' }}>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Auto-Dispatch Delivery Partners</p>
                  <input type="text" value={sellerSettings.partners} onChange={e => setSellerSettings({...sellerSettings, partners: e.target.value})} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1rem', width: '100%', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => { setIsSavingSettings(true); setTimeout(() => setIsSavingSettings(false), 1500); }}>
                  {isSavingSettings ? 'Saving...' : 'Save Changes'}
                </button>
                <button className="onboard-option" style={{ margin: 0, width: 'auto', padding: '0 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', fontWeight: 700 }} onClick={() => setSellerSettings({ location: 'Măm-mate Central Kitchen - NY', capacity: '1500', hours: '04:00 AM - 10:00 PM', partners: 'Uber Direct & DoorDash Drive' })}>
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showPOModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 6000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '32px', width: '100%', maxWidth: '800px', border: '1px solid var(--border-color)', position: 'relative' }}>
                <button onClick={() => setShowPOModal(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24}/></button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                  <FileText size={32} color="var(--accent-primary)" />
                  <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Generate Purchase Order</h1>
                </div>

                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  The AI has compiled the exact ingredient amounts needed to fulfill the forecasted meals for next week while maintaining zero waste.
                </p>

                <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '2.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '1rem 0' }}>Ingredient</th>
                        <th>Quantity Needed</th>
                        <th>Preferred Supplier</th>
                        <th style={{ textAlign: 'right' }}>Est. Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Premium Chicken Breast', qty: '56 kg', supplier: 'Farm Fresh Meats Inc.', cost: '$369.52' },
                        { name: 'Wild-Caught Salmon', qty: '20 kg', supplier: 'Oceanic Seafoods', cost: '$427.05' },
                        { name: 'Grass-fed Flank Steak', qty: '27 kg', supplier: 'Ranch Direct', cost: '$580.40' },
                        { name: 'Organic Quinoa', qty: '14 kg', supplier: 'Valley Grains', cost: '$85.50' },
                        { name: 'Fresh Broccoli', qty: '18 kg', supplier: 'Local Green Farms', cost: '$62.00' },
                        { name: 'Extra Firm Tofu', qty: '12 kg', supplier: 'Soy Masters', cost: '$35.20' },
                        { name: 'Sweet Potatoes', qty: '18 kg', supplier: 'Root Farms', cost: '$24.50' },
                        { name: 'Zucchini Noodles', qty: '15 kg', supplier: 'Fresh Veggies Co.', cost: '$45.00' }
                      ].map((item, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.95rem' }}>
                          <td style={{ padding: '1.25rem 0', fontWeight: 500 }}>{item.name}</td>
                          <td style={{ color: 'var(--accent-warning)', fontWeight: 700 }}>{item.qty}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{item.supplier}</td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex-between" style={{ padding: '1.5rem 0', borderTop: '2px solid var(--border-color)', marginBottom: '3rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total Estimated Cost:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>$1,629.17</span>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <button className="onboard-option" style={{ margin: 0, flex: 1, height: '56px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }} onClick={() => setShowPOModal(false)}>Cancel</button>
                  <button className="btn-primary" style={{ flex: 2, height: '56px' }} onClick={() => setShowPOModal(false)}>Confirm & Send to Suppliers</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="mobile-wrapper">
      <div className="scroll-area">
        <AnimatePresence mode="wait">
          
          {tab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

              <div className="dash-card">
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Target size={18} color="var(--accent-primary)"/> Daily Summary
                  </h3>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => { setNewCals(userProfile.cals); setIsEditingCals(true); }}>
                    <Edit2 size={16} />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="progress-ring">
                    <svg viewBox="0 0 120 120">
                      <circle className="bg" cx="60" cy="60" r="50"></circle>
                      <circle className="fg" cx="60" cy="60" r="50" style={{ strokeDashoffset: offset }}></circle>
                    </svg>
                    <div className="progress-content">
                      <span className="num" style={{ fontSize: '1.25rem' }}>{Math.max(0, userProfile.cals - userProfile.eaten)}</span>
                      <span className="label">of {userProfile.cals} kcal</span>
                    </div>
                  </div>
                  
                  <div className="macros-summary" style={{ flex: 1 }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div className="flex-between" style={{ marginBottom: '0.35rem', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Protein</span>
                        <span style={{ fontWeight: 700 }}>{userProfile.p} / {Math.round((userProfile.cals * 0.3) / 4)}g</span>
                      </div>
                      <div className="macro-bar-bg" style={{ height: '6px' }}><div className="macro-bar-fg" style={{ width: `${Math.min(100, (userProfile.p / ((userProfile.cals * 0.3) / 4)) * 100)}%`, background: '#3b82f6' }}></div></div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div className="flex-between" style={{ marginBottom: '0.35rem', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Carbs</span>
                        <span style={{ fontWeight: 700 }}>{userProfile.c} / {Math.round((userProfile.cals * 0.4) / 4)}g</span>
                      </div>
                      <div className="macro-bar-bg" style={{ height: '6px' }}><div className="macro-bar-fg" style={{ width: `${Math.min(100, (userProfile.c / ((userProfile.cals * 0.4) / 4)) * 100)}%`, background: '#f59e0b' }}></div></div>
                    </div>
                    <div>
                      <div className="flex-between" style={{ marginBottom: '0.35rem', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Fats</span>
                        <span style={{ fontWeight: 700 }}>{userProfile.f} / {Math.round((userProfile.cals * 0.3) / 9)}g</span>
                      </div>
                      <div className="macro-bar-bg" style={{ height: '6px' }}><div className="macro-bar-fg" style={{ width: `${Math.min(100, (userProfile.f / ((userProfile.cals * 0.3) / 9)) * 100)}%`, background: '#ef4444' }}></div></div>
                    </div>
                  </div>
                </div>
                
                <div className="weekly-chart">
                  {WEEK_DATA.map((d, i) => {
                    const isToday = i === 5;
                    const cals = isToday ? userProfile.eaten : d.val;
                    const realH = (isToday && cals === 0) ? 85 : (cals / userProfile.cals) * 100;
                    return (
                      <div key={i} className="bar-col">
                        <div className="bar-track">
                          <div className="bar-fill" style={{ height: `${Math.min(100, realH)}%`, background: isToday ? 'var(--accent-primary)' : 'var(--border-color)' }}></div>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: isToday ? '#fff' : 'var(--text-muted)', fontWeight: isToday ? 800 : 400 }}>{d.day}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-between" style={{ marginTop: '1rem', padding: '0.85rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Flame size={18} color="var(--accent-warning)" />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{streakDays} Day Streak!</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Meeting targets daily</span>
                </div>
              </div>

              <div className="flex-between" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                <h2>Suggested For You</h2>
                <span onClick={() => setTab('menu')} style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>See All</span>
              </div>
              
              <div className="meal-card" onClick={() => setSelectedMeal(MENU_ITEMS[0])}>
                <div className="meal-img" style={{ height: '120px' }}>{MENU_ITEMS[0].img}</div>
                <div className="meal-content">
                  <h3>{MENU_ITEMS[0].name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <span className="macro-pill"><Flame size={12} color="var(--accent-warning)" /> {MENU_ITEMS[0].cals} kcal</span>
                    <span className="macro-pill" style={{ color: 'var(--accent-secondary)' }}><Scale size={12} /> {MENU_ITEMS[0].macros.p}g P</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex-between" style={{ alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                <h1 style={{ margin: 0, whiteSpace: 'nowrap' }}>Menu</h1>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search dishes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '0.6rem 1rem 0.6rem 2.2rem', 
                      background: 'rgba(255,255,255,0.05)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }} 
                  />
                </div>
              </div>
              <div className="guarantee-banner">
                <ShieldCheck size={28} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>Macro Certified Meals</h3>
                  <p style={{ fontSize: '0.8rem', color: '#ccc' }}>All meals are cooked in our owned cloud kitchen. We guarantee precise macros to the exact gram.</p>
                </div>
              </div>

              {MENU_ITEMS.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                <div key={item.id} className="meal-card" onClick={() => setSelectedMeal(item)}>
                  <div className="meal-img">{item.img}</div>
                  <div className="meal-content">
                    <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                      <span style={{ fontWeight: 600 }}>${item.price}</span>
                    </div>
                    <p style={{ marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span className="macro-pill"><Flame size={12} color="var(--accent-warning)" /> {item.cals}</span>
                      <span className="macro-pill">{item.macros.p}g P / {item.macros.c}g C / {item.macros.f}g F</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'cart' && (
            <motion.div key="cart" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <h1>Cart</h1>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                  <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>Your cart is empty.</p>
                  <button className="btn-primary" onClick={() => setTab('menu')} style={{ marginTop: '2rem' }}>Browse Menu</button>
                </div>
              ) : (
                <>
                  <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-img">{item.img}</div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--accent-primary)' }}>${item.price}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#222', borderRadius: '8px', padding: '0.25rem' }}>
                          <button style={{ background: 'none', border: 'none', color: '#fff', padding: '0.25rem', cursor: 'pointer' }} onClick={() => updateQty(item.id, -1)}><Minus size={16}/></button>
                          <span style={{ fontSize: '0.9rem', width: '16px', textAlign: 'center' }}>{item.qty}</span>
                          <button style={{ background: 'none', border: 'none', color: '#fff', padding: '0.25rem', cursor: 'pointer' }} onClick={() => updateQty(item.id, 1)}><Plus size={16}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="dash-card">
                    <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                      <span>Free</span>
                    </div>
                    <div className="flex-between" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button className="btn-primary" onClick={handleCheckout} style={{ marginTop: '1rem' }}>
                    Confirm Order
                  </button>
                </>
              )}
            </motion.div>
          )}

          {tab === 'tracker' && (
            <motion.div key="tracker" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <h1>Live Tracking</h1>
              <p>Directly synced with Măm-mate Cloud Kitchen</p>

              {!activeOrder ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                  <Truck size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>No active deliveries.</p>
                </div>
              ) : (
                <div className="tracker-container">
                  <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Weekly Prep Order</h3>
                      <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.85rem' }}>Guaranteed {activeOrder.totalCals} kcal</p>
                    </div>
                    <div style={{ fontSize: '2rem' }}>📦</div>
                  </div>

                  <div className="tracking-timeline">
                    <TrackStep 
                      active={orderStage >= 0} 
                      icon={<LayoutList size={16} />} 
                      title="Order Received" 
                      desc="Sent to Măm-mate OS Kitchen Board." 
                    />
                    <TrackStep 
                      active={orderStage >= 1} 
                      icon={<Scale size={16} />} 
                      title="Prep & Weigh Station" 
                      desc="Ingredients precisely measured to the gram." 
                    />
                    <TrackStep 
                      active={orderStage >= 2} 
                      icon={<Flame size={16} />} 
                      title="Cooking" 
                      desc="Chefs are preparing your meals." 
                    />
                    <TrackStep 
                      active={orderStage >= 3} 
                      icon={<Truck size={16} />} 
                      title="Out for Delivery" 
                      desc={orderStage >= 3 ? "Native dispatcher is on the way." : "Awaiting dispatch."} 
                    />
                  </div>
                  
                  {orderStage === 3 && (
                    <button className="btn-primary" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={() => setShowLiveMap(true)}>
                      <MapPin size={18} /> View Live Map
                    </button>
                  )}

                  {orderStage >= 4 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
                      <CheckCircle2 size={24} color="var(--accent-primary)" style={{ margin: '0 auto 0.5rem' }} />
                      <h4 style={{ color: 'var(--accent-primary)' }}>Delivered & Logged!</h4>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{activeOrder.totalCals} kcal and exact macros have been synced to your Dashboard.</p>
                      <button onClick={() => { setActiveOrder(null); setTab('home'); }} className="btn-primary" style={{ marginTop: '1rem', padding: '0.75rem' }}>View Dashboard</button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {tab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1>My Profile</h1>
              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', marginTop: '1.5rem' }}>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  <div className="input-group">
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Name</label>
                    <input type="text" value={userProfile.name} onChange={e => setUserProfile({...userProfile, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Age</label>
                      <input type="number" value={userProfile.age} onChange={e => setUserProfile({...userProfile, age: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Gender</label>
                      <select value={userProfile.gender} onChange={e => setUserProfile({...userProfile, gender: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Weight (kg)</label>
                      <input type="number" value={userProfile.weight} onChange={e => setUserProfile({...userProfile, weight: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Exercise</label>
                      <select value={userProfile.exercise} onChange={e => setUserProfile({...userProfile, exercise: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '12px' }}>
                        <option>Sedentary</option>
                        <option>1-3 days/week</option>
                        <option>3-5 days/week</option>
                        <option>6-7 days/week</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', marginTop: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={18} color="var(--accent-primary)" /> AI Targets
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{userProfile.cals} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kcal/day</span></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-secondary)' }}>{Math.round((userProfile.cals * 0.3) / 4)}g</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>PROTEIN</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#f59e0b' }}>{Math.round((userProfile.cals * 0.4) / 4)}g</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>CARBS</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#ef4444' }}>{Math.round((userProfile.cals * 0.3) / 9)}g</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>FATS</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'advice' && (
            <motion.div key="advice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ marginBottom: '1.5rem' }}>AI Advice</h1>
              <div className="glass-panel" style={{ flex: 1, borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {aiMessages.map((msg, i) => (
                    <div key={i} style={{ 
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      background: msg.role === 'user' ? 'var(--accent-primary)' : (theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'),
                      color: msg.role === 'user' ? '#000' : 'var(--text-main)',
                      padding: '1rem',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      fontSize: '0.9rem',
                      lineHeight: 1.4
                    }}>
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '0.75rem' }}>
                  <input type="text" placeholder="Message AI..." style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
                  <button className="btn-primary" style={{ width: '45px', height: '45px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={20}/></button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isEditingCals && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', width: '100%', border: '1px solid var(--border-color)' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Daily Calorie Target</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Set your new calorie goal.</p>
              <input type="number" value={newCals} onChange={e => setNewCals(Number(e.target.value))} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '8px', fontSize: '1.1rem' }} />
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white', flex: 1 }} onClick={() => setIsEditingCals(false)}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => { setUserProfile({...userProfile, cals: newCals}); setIsEditingCals(false); }}>Save</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMeal && (
          <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="detail-view"
          >
            <button className="back-btn" onClick={() => setSelectedMeal(null)}><ArrowLeft size={20} /></button>
            <div className="detail-header-img">{selectedMeal.img}</div>
            
            <div style={{ padding: '1.5rem' }}>
              <div className="flex-between">
                <h1>{selectedMeal.name}</h1>
                <h2 style={{ color: 'var(--accent-primary)', margin: 0 }}>${selectedMeal.price}</h2>
              </div>
              <p style={{ fontSize: '1rem', marginTop: '1rem', color: '#ccc' }}>{selectedMeal.desc}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', marginTop: '2rem', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-card)', padding: '1rem 0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{selectedMeal.cals}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>KCAL</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1rem 0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>{selectedMeal.macros.p}g</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PROTEIN</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1rem 0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f59e0b' }}>{selectedMeal.macros.c}g</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CARBS</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1rem 0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444' }}>{selectedMeal.macros.f}g</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>FATS</div>
                </div>
              </div>

              <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="var(--accent-primary)" /> Exact Ingredients
              </h3>
              <ul className="ingredient-list">
                {selectedMeal.ingredients.map((ing, i) => (
                  <li key={i} className="ingredient-item">
                    <span className="name">{ing.name}</span>
                    <span className="amt">{ing.amt}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="btn-sticky">
              <button className="btn-primary" onClick={() => addToCart(selectedMeal)}>
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCheckingOut && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: 'var(--bg-card)', width: '100%', maxWidth: '450px', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}
            >
              {isProcessingPayment ? (
                <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} style={{ marginBottom: '2rem' }}>
                    <Activity size={64} color="var(--accent-primary)" />
                  </motion.div>
                  <h2>Verifying with Bank...</h2>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Processing your macro-certified order.</p>
                </div>
              ) : paymentSuccess ? (
                <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} style={{ marginBottom: '2rem' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--accent-primary)', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={48} color="#000" />
                    </div>
                  </motion.div>
                  <h2>Payment Successful!</h2>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Your kitchen prep has been prioritized.</p>
                </div>
              ) : (
                <>
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Lock size={18} color="var(--accent-primary)" />
                      <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Secure Checkout</h2>
                    </div>
                    <button onClick={() => setIsCheckingOut(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20}/></button>
                  </div>
                  
                  <div style={{ padding: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                      <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Order Total</span>
                        <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)' }}>
                        Includes {cart.reduce((s,i) => s+i.qty, 0)} macro-balanced meals
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Select Payment Method</h3>
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                      <div className={`onboard-option ${paymentMethod === 'card' ? 'selected' : ''}`} style={{ margin: 0, padding: '1rem' }} onClick={() => setPaymentMethod('card')}>
                        <CreditCard size={20} color={paymentMethod === 'card' ? "var(--accent-primary)" : "#fff"} />
                        <div style={{ flex: 1, marginLeft: '1rem' }}>
                          <div style={{ fontWeight: 600 }}>Credit Card</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>•••• •••• •••• 4242</div>
                        </div>
                      </div>
                      <div className={`onboard-option ${paymentMethod === 'apple' ? 'selected' : ''}`} style={{ margin: 0, padding: '1rem' }} onClick={() => setPaymentMethod('apple')}>
                        <Wallet size={20} color={paymentMethod === 'apple' ? "var(--accent-primary)" : "#fff"} />
                        <div style={{ flex: 1, marginLeft: '1rem' }}>
                          <div style={{ fontWeight: 600 }}>Apple Pay</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pay with Touch ID / Face ID</div>
                        </div>
                      </div>
                    </div>

                    <button className="btn-primary" onClick={processPayment}>
                      Pay Now
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                      Your payment information is encrypted and secure.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bottom-nav">
        <div className={`nav-item ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>
          <Activity size={24} />
          <span>Dash</span>
        </div>
        <div className={`nav-item ${tab === 'menu' ? 'active' : ''}`} onClick={() => setTab('menu')}>
          <Utensils size={24} />
          <span>Menu</span>
        </div>
        <div className={`nav-item ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>
          <Settings size={24} />
          <span>Profile</span>
        </div>
        <div className={`nav-item ${tab === 'cart' ? 'active' : ''}`} style={{ position: 'relative' }} onClick={() => setTab('cart')}>
          <ShoppingBag size={24} />
          <span>Cart</span>
          {cart.length > 0 && <div className="badge">{cart.reduce((s,i) => s + i.qty, 0)}</div>}
        </div>
        <div className={`nav-item ${tab === 'advice' ? 'active' : ''}`} onClick={() => setTab('advice')}>
          <MessageSquare size={24} />
          <span>AI Advice</span>
        </div>
        <div className={`nav-item ${tab === 'tracker' ? 'active' : ''}`} onClick={() => setTab('tracker')}>
          <Truck size={24} />
          <span>Tracker</span>
        </div>
      </div>

      {/* Live Map Modal */}
      <AnimatePresence>
        {showLiveMap && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: uiMode === 'mobile' ? '1rem' : '4rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              style={{ background: 'var(--bg-card)', width: '100%', maxWidth: '1000px', height: '100%', maxHeight: '800px', borderRadius: '32px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
            >
              <button onClick={() => setShowLiveMap(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24}/></button>
              
              <div style={{ height: '100%', position: 'relative', background: '#1a1a1a' }}>
                {/* Arrived Notification */}
                <motion.div 
                  initial={{ opacity: 0, y: -20, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  transition={{ delay: 20 }}
                  style={{ position: 'absolute', top: '2rem', left: '50%', background: 'var(--accent-primary)', color: '#000', padding: '1rem 2rem', borderRadius: '40px', fontWeight: 800, fontSize: '1.25rem', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)', zIndex: 100, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                >
                  <span>Your Order has Arrived! 🍱</span>
                  <button onClick={() => setShowLiveMap(false)} style={{ background: '#000', color: '#fff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>Close Tracker</button>
                </motion.div>
                {/* Simulated Map SVG */}
                <svg width="100%" height="100%" viewBox="0 0 1000 800" style={{ opacity: 0.6 }}>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                  </pattern>
                  <rect width="1000" height="800" fill="url(#grid)" />
                  {/* Streets */}
                  <path d="M 0 400 L 1000 400 M 500 0 L 500 800 M 200 0 L 200 800 M 800 0 L 800 800 M 0 200 L 1000 200 M 0 600 L 1000 600" stroke="rgba(255,255,255,0.1)" strokeWidth="20" fill="none" />
                  
                  {/* Delivery Route */}
                  <motion.path 
                    d="M 200 600 L 500 600 L 500 400 L 800 400" 
                    stroke="var(--accent-primary)" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="10,10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                  />

                  {/* Destination */}
                  <g transform="translate(800, 400)">
                    <circle r="12" fill="var(--accent-secondary)" style={{ opacity: 0.3 }}>
                      <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r="6" fill="var(--accent-secondary)" />
                    <text y="-25" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">HOME</text>
                  </g>

                  {/* Delivery Man */}
                  <motion.g 
                    initial={{ x: 200, y: 600 }}
                    animate={{ x: [200, 500, 500, 800], y: [600, 600, 400, 400] }}
                    transition={{ duration: 20, ease: "linear" }}
                  >
                    <circle r="15" fill="var(--accent-primary)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-primary))' }} />
                    <Truck size={18} x="-9" y="-9" color="#000" />
                    <text y="-25" textAnchor="middle" fill="var(--accent-primary)" fontSize="14" fontWeight="800">COURIER</text>
                  </motion.g>
                </svg>

                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                  <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', borderRadius: '20px', background: 'rgba(0,0,0,0.8)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Estimated Arrival</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>8 - 12 Minutes</div>
                  </div>
                  <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', borderRadius: '20px', background: 'rgba(0,0,0,0.8)', display: uiMode === 'mobile' ? 'none' : 'block' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Driver</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Marco "The Macro" Polo</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TrackStep({ active, icon, title, desc }) {
  return (
    <div className={`track-step ${active ? 'active' : ''}`}>
      <div className="step-icon">
        {icon}
      </div>
      <div className="step-content">
        <div className="step-title">{title}</div>
        <div style={{ fontSize: '0.85rem', color: active ? '#ccc' : 'var(--text-muted)' }}>{desc}</div>
      </div>
    </div>
  );
}

export default App;
