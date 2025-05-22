// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import LoginRegister from './LoginRegister'; // Re-importing LoginRegister
import Watches from './Watches';
import About from './About';
import Catalog from './Catalog';
import BuyNow from './BuyNow';
import Dashboard from './Dashboard';

// A simple Home component for the default route
function Home() {
  return (
    <div style={{ padding: '20px',color:'orange',fontfamily: 'Lucida Handwriting',textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4" >Welcome to the Watch Website!</h1>
      <p className="text-xl text-gray-700">Explore our exquisite collection of watches.</p>
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]); // State to manage items in the cart

  // Function to add a watch to the cart or increase its quantity if already present
  const addToCart = (watch) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === watch.id);
      if (existing) {
        // If item exists, increase its quantity
        return prev.map(item =>
          item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If item is new, add it with quantity 1
      return [...prev, { ...watch, quantity: 1 }];
    });
  };

  // Function to increase the quantity of a specific item in the cart
  const increaseQuantity = (id) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Function to decrease the quantity of a specific item in the cart
  // Ensures quantity doesn't go below 1, and optionally removes item if quantity becomes 0
  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)
        .filter(item => item.quantity > 0) // Filter out items with quantity 0
    );
  };

  // Placeholder function for the "Buy Now" action
  const buyNow = (watch) => {
    alert(`Proceeding to buy ${watch.name} - Quantity: ${watch.quantity}`);
    // In a real application, this would lead to a checkout process
  };

  return (
    <Router>
      <Header /> {/* Renders the Header component on all pages */}
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/about" element={<About />} /> {/* About page route */}
        {/* Using LoginRegister for the login path */}
        <Route path="/login" element={<LoginRegister />} />
        {/* Removed the separate /register route */}
        <Route path="/buy/:watchId" element={<BuyNow addToCart={addToCart} />} /> {/* BuyNow page with dynamic watchId */}
        <Route path="/watches" element={<Watches addToCart={addToCart} />} /> {/* Watches listing page */}
        <Route path="/catalog" element={
          <Catalog
            cartItems={cartItems}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            buyNow={buyNow}
          />
        } /> {/* Catalog page, passing cart state and functions */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page route */}
      </Routes>
    </Router>
  );
}

export default App;