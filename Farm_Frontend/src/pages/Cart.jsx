import React, { useEffect, useState } from 'react';
import { getCartItems } from '../pages/SCart'; // Import your API function to fetch cart items

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems(); // Call your API function to fetch cart items
      setCartItems(response.data); // Assuming your API returns cart items in response.data
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.productId}>
            {item.productName} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;