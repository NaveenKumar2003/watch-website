import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BuyNow.css';

const watches = [
  { id: 1, image: "/watch1.jpg", name: "Titan Elite", price: 1999, gender: "Men", discount: 10, reviews: 125, stars: 4.5 },
  { id: 2, image: "/watch2.jpg", name: "Fossil Venture", price: 2499, gender: "Men", discount: 0, reviews: 80, stars: 4.0 },
  { id: 3, image: "/watch3.jpg", name: "Casio Tough Solar", price: 1799, gender: "Men", discount: 15, reviews: 200, stars: 4.7 },
  { id: 4, image: "/watch4.jpg", name: "Seiko Speedmaster", price: 2699, gender: "Men", discount: 5, reviews: 95, stars: 4.2 },
  { id: 5, image: "/watch5.jpg", name: "Citizen Armor", price: 2299, gender: "Men", discount: 0, reviews: 110, stars: 4.3 },
  { id: 6, image: "/watch6.jpg", name: "Timex Ranger", price: 1499, gender: "Men", discount: 20, reviews: 150, stars: 4.6 },
  { id: 7, image: "/watch7.jpg", name: "Tissot Legacy", price: 2899, gender: "Men", discount: 0, reviews: 70, stars: 4.1 },
  { id: 8, image: "/watch8.jpg", name: "Omega Titan", price: 4999, gender: "Men", discount: 10, reviews: 300, stars: 4.8 },
  { id: 9, image: "/watch9.jpg", name: "Tag Heuer Formula", price: 4599, gender: "Men", discount: 0, reviews: 180, stars: 4.5 },
  { id: 10, image: "/watch10.jpg", name: "Diesel Edge", price: 1999, gender: "Men", discount: 25, reviews: 210, stars: 4.4 },
  { id: 11, image: "/watch11.jpg", name: "Armani Modern", price: 3299, gender: "Men", discount: 0, reviews: 90, stars: 4.0 },
  { id: 12, image: "/watch12.jpg", name: "Skagen Minimal", price: 1899, gender: "Men", discount: 10, reviews: 130, stars: 4.3 },
  { id: 13, image: "/watch13.jpg", name: "Tommy Classic", price: 2099, gender: "Men", discount: 0, reviews: 60, stars: 3.9 },
  { id: 14, image: "/watch14.jpg", name: "Fastrack Turbo", price: 1399, gender: "Men", discount: 15, reviews: 170, stars: 4.5 },
  { id: 15, image: "/watch15.jpg", name: "Roadster Pulse", price: 1199, gender: "Men", discount: 0, reviews: 50, stars: 3.8 },
  { id: 16, image: "/watch16.jpg", name: "Invicta Blaze", price: 2699, gender: "Men", discount: 20, reviews: 100, stars: 4.6 },
  { id: 17, image: "/watch17.jpg", name: "MVMT Chrono", price: 2999, gender: "Men", discount: 0, reviews: 120, stars: 4.2 },
  { id: 18, image: "/watch18.jpg", name: "Naviforce Hero", price: 1599, gender: "Men", discount: 10, reviews: 140, stars: 4.4 },
  { id: 19, image: "/watch19.jpg", name: "Luminox Shadow", price: 3499, gender: "Men", discount: 0, reviews: 75, stars: 4.1 },
  { id: 20, image: "/watch20.jpg", name: "Curren Pro", price: 999, gender: "Men", discount: 30, reviews: 250, stars: 4.7 },
  { id: 21, image: "/gwatch1.jpg", name: "Titan Raga", price: 1899, gender: "Women", discount: 10, reviews: 190, stars: 4.5 },
  { id: 22, image: "/gwatch2.jpg", name: "Fossil Julianna", price: 2799, gender: "Women", discount: 0, reviews: 65, stars: 4.0 },
  { id: 23, image: "/gwatch3.jpg", name: "Casio Sheen", price: 1699, gender: "Women", discount: 15, reviews: 115, stars: 4.3 },
  { id: 24, image: "/gwatch4.jpg", name: "Timex Bloom", price: 999, gender: "Women", discount: 20, reviews: 230, stars: 4.6 },
  { id: 25, image: "/gwatch5.jpg", name: "Skagen Freja", price: 1499, gender: "Women", discount: 0, reviews: 85, stars: 4.1 },
  { id: 26, image: "/gwatch6.jpg", name: "Olivia Burton Luxe", price: 2299, gender: "Women", discount: 10, reviews: 105, stars: 4.4 },
  { id: 27, image: "/gwatch7.jpg", name: "Anne Klein Glimmer", price: 2599, gender: "Women", discount: 0, reviews: 70, stars: 3.9 },
  { id: 28, image: "/gwatch8.jpg", name: "Guess Sparkle", price: 1999, gender: "Women", discount: 15, reviews: 160, stars: 4.5 },
  { id: 29, image: "/gwatch9.jpg", name: "Michael Kors Shine", price: 2899, gender: "Women", discount: 0, reviews: 90, stars: 4.2 },
  { id: 30, image: "/gwatch10.jpg", name: "Sonata Radiance", price: 1199, gender: "Women", discount: 25, reviews: 180, stars: 4.7 },
  { id: 31, image: "/kwatch1.jpg", name: "Dino Time Tracker", price: 799, gender: "Kids", discount: 0, reviews: 50, stars: 4.0 },
  { id: 32, image: "/kwatch2.jpg", name: "Space Explorer", price: 899, gender: "Kids", discount: 10, reviews: 75, stars: 4.2 },
  { id: 33, image: "/kwatch3.jpg", name: "ColorPop Flash", price: 749, gender: "Kids", discount: 0, reviews: 60, stars: 3.8 },
  { id: 34, image: "/kwatch4.jpg", name: "Robo Timer", price: 699, gender: "Kids", discount: 15, reviews: 80, stars: 4.3 },
  { id: 35, image: "/kwatch5.jpg", name: "Unicorn Dreams", price: 849, gender: "Kids", discount: 0, reviews: 45, stars: 3.7 },
  { id: 36, image: "/kwatch6.jpg", name: "Rainbow Spark", price: 599, gender: "Kids", discount: 20, reviews: 90, stars: 4.5 },
  { id: 37, image: "/kwatch7.jpg", name: "Magic Glow", price: 699, gender: "Kids", discount: 0, reviews: 55, stars: 4.1 },
  { id: 38, image: "/kwatch8.jpg", name: "Mini Racer", price: 799, gender: "Kids", discount: 10, reviews: 70, stars: 4.4 },
  { id: 39, image: "/kwatch9.jpg", name: "Candy Time", price: 649, gender: "Kids", discount: 0, reviews: 40, stars: 3.6 },
  { id: 40, image: "/kwatch10.jpg", name: "Jungle Fun", price: 899, gender: "Kids", discount: 25, reviews: 100, stars: 4.8 }
];


function BuyNow({ addToCart }) {
  const { watchId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(watchId, 10);
  const watch = watches.find(w => w.id === id);

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCreditCard, setShowCreditCard] = useState(false); // State to control credit card form visibility

  if (!watch) {
    return (
      <div style={{ padding: "5rem", textAlign: "center" }}>
        <h2>Product Not Found</h2>
        <Link to="/catalog" style={{ color: "#007bff", textDecoration: "underline" }}>
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newQty = prev + delta;
      return newQty < 1 ? 1 : newQty;
    });
  };

  const totalPrice = watch.price * quantity;

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setShowCreditCard(method === "Credit Card"); // Show credit card form if selected
  };

  const handlePayNow = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert(`Payment successful!\n\nProduct: ${watch.name}\nQuantity: ${quantity}\nTotal: $${totalPrice.toFixed(2)}\nPaid with: ${paymentMethod}`);
    addToCart({ ...watch, quantity }); // Add to cart on successful payment
    navigate('/catalog');
  };

  return (
    <div className="buynow-card">
      <h1>Buy Now</h1>
      <img src={watch.image} alt={watch.name} />
      <h2>{watch.name}</h2>
      <p className="total-price">Price: ${watch.price.toFixed(2)}</p>

      <div className="quantity-controls">
        <label>Quantity:</label>
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>

      <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>

      <div className="payment-methods">
        <p>Select Payment Method:</p>
        <div>
          {["Google Pay", "PhonePe", "Credit Card", "Debit Card"].map(method => (
            <button
              key={method}
              onClick={() => handlePaymentMethodSelect(method)}
              className={paymentMethod === method ? 'selected' : ''}
            >
              <img 
                src={method === "Google Pay" ? "/public/gpay.png" : 
                     method === "PhonePe" ? "/public/phonepay.png" : 
                     method === "Credit Card" ? "/public/credit.jpg" : 
                     "/public/debit.jpg"} 
                alt={`${method} logo`} 
                style={{ width: '90px', marginRight: '8px' }} 
              />
            </button>
          ))}
        </div>
      </div>

      {showCreditCard && (
        <div className="credit-card">
          <h3>Credit Card Information</h3>
          <form>
            <label htmlFor="card-number">Card Number</label>
            <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />

            <label htmlFor="card-holder">Card Holder:</label>
            <input type="text" id="card-holder" placeholder="Your Name" />

            <div className="date-cvv">
              <div>
                <label htmlFor="validity">Expires On:</label>
                <input type="text" id="validity" placeholder="MM/YY" />
              </div>
              <div>
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" placeholder="***" />
              </div>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={handlePayNow}
        className="pay-now-button"
      >
        Pay Now
      </button>

      <div className="back-link">
        <Link to="/catalog">Back to Catalog</Link>
      </div>
    </div>
  );
}

export default BuyNow;
