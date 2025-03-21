// SCart.jsx
import React from "react";
import { ListGroup, Button } from "react-bootstrap";

// Define and export the getCartItems function
export const getCartItems = async () => {
  try {
    // Implement your logic to fetch cart items from the backend
    const response = await fetch("YOUR_API_ENDPOINT_HERE");
    const data = await response.json();
    return data; // Assuming your API returns cart items in JSON format
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Define the SCart component
const SCart = ({ cart, removeFromCart }) => {
  return (
    <div>
      <h3>Cart</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item._id}>
              <span>{item.name}</span>
              <span className="ms-auto">
                Quantity: {item.quantity}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </Button>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SCart;
