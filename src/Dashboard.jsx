import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// Sample watches data for demo
const watches = [
  { id: 1, image: "/watch1.jpg", name: "Titan Elite", price: 1999 },
  { id: 2, image: "/watch2.jpg", name: "Fossil Venture", price: 2499 },
  { id: 3, image: "/watch3.jpg", name: "Casio Tough Solar", price: 1799 },
];

// Watches List Component with Buy Now Links
function WatchesList() {
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <h1>Watch Catalog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {watches.map(watch => (
          <li key={watch.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: 6 }}>
            <img src={watch.image} alt={watch.name} style={{ width: 150, height: 100, objectFit: 'contain', verticalAlign: 'middle' }} />
            <span style={{ marginLeft: 15, fontWeight: 'bold', fontSize: '1.2rem' }}>{watch.name}</span>
            <span style={{ marginLeft: 15, fontWeight: 'bold' }}>${watch.price.toFixed(2)}</span>
            <Link to={`/buy/${watch.id}`} style={{ marginLeft: 15, color: '#007bff', textDecoration: 'underline' }}>Buy Now</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// BuyNow Component that reads watchId route param and shows watch info or fallback
function BuyNow() {
  const { watchId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(watchId, 10);

  const watch = watches.find(w => w.id === id);

  if (!watch) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>Back to Catalog</Link>
      </div>
    );
  }

  const handleConfirmPurchase = () => {
    alert(`Thank you for purchasing ${watch.name} for $${watch.price.toFixed(2)}!`);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, boxShadow: '0 0 15px rgba(0,0,0,0.1)', borderRadius: 8, textAlign: 'center' }}>
      <h1>Buy Now</h1>
      <img src={watch.image} alt={watch.name} style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 8 }} />
      <h2>{watch.name}</h2>
      <p style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Price: ${watch.price.toFixed(2)}</p>
      <button
        onClick={handleConfirmPurchase}
        style={{
          padding: '12px 25px',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px'
        }}
      >Confirm Purchase</button>
      <div style={{ marginTop: 15 }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>Back to Catalog</Link>
      </div>
    </div>
  );
}

// Main App with routing and BrowserRouter wrapper
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WatchesList />} />
        <Route path="/buy/:watchId" element={<BuyNow />} />
        <Route path="*" element={
          <div style={{ padding: 20, textAlign: 'center' }}>
            <h2>Page Not Found</h2>
            <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>Back to Catalog</Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}

