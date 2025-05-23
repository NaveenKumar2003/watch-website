import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Catalog({ cartItems = [], increaseQuantity, decreaseQuantity, buyNow }) {
  const { watchId } = useParams();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleTotalBuyNow = () => {
    const totalAmount = calculateTotal();
    alert(`Proceeding to payment for total amount: $${totalAmount}`);
    // Here you can implement the logic to navigate to a payment page or handle payment
  };

  if (!watchId) {
    // Show cart with quantity controls and Buy Now button
    return (
      <div style={{ color:'white',paddingTop: '80px', maxWidth: '900px', margin: 'auto', padding: '20px' }}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/watches">Browse Watches</Link></p>
        ) : (
          cartItems.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                color:'black',
                gap: '15px',
                width:'450px',
                boxShadow:'white',
                backgroundColor:'white',
                marginBottom: '15px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 80, height: 80, colorP:'red',objectFit: 'contain', borderRadius: 5 }}
              />
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p>Unit Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <div>
                  
                  <button onClick={() => decreaseQuantity(item.id)} boxShadow='blue'>-</button>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <p><strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong></p>
              </div>
              <button
                style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                onClick={() => buyNow(item)}
              >
                Buy Now
              </button>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <h3>Total Amount: ${calculateTotal()}</h3>
            <button
              style={{ padding: '10px 15px', backgroundColor: '#008000', color: 'black', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
              onClick={handleTotalBuyNow}
            >
              Total Buy Now
            </button>
          </div>
        )}
      </div>
    );
  }

  // Optional: show product detail for watchId if needed
  return (
    <div style={{ paddingTop: '80px', textAlign: 'center' }}>
      <h2>Product detail page is under construction.</h2>
      <Link to="/catalog">Back to Cart</Link>
    </div>
  );
}

export default Catalog;