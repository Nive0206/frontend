import React from "react";
import "./Cart.css"; // If you have a Cart-specific CSS file

const Cart = () => {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <p>Your cart is empty. Add some products to see them here.</p>
      {/* You can display cart items here */}
    </div>
  );
};

export default Cart;
