import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ToastContext from "../context/ToastContext";
import { Card, Form, ListGroup } from "react-bootstrap";

const CartPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        !user && navigate("/login", { replace: true });

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        setLoading(false);
    }, [navigate, user]);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Removed from Cart");
    };

    const updateQuantity = (productId, quantity) => {
        const updatedCart = cart.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Quantity updated");
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleBuy = () => {
        const products = cart.map(item => ({ productId: item.productId, quantity: item.quantity, name: item.name, price: item.price, total: item.price *  item.quantity}));
        if (cart.length > 0) {
            navigate(`/checkout`, { state: { cart: products } });
        } else {
            toast.error("Your cart is empty");
        }
    };

    return (
        <div className="container">
            <h2>Your Cart</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ListGroup>
                        {cart.map((item) => (
                            <ListGroup.Item key={item.productId}>
                                <span>{item.name}</span>
                                <Form.Group controlId={`quantity-${item.productId}`} className="ms-2">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                                    />
                                </Form.Group>
                                <span>
                                    ${item.price * item.quantity}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="ms-2"
                                        onClick={() => removeFromCart(item.productId)}
                                    >
                                        Remove
                                    </Button>
                                </span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <p>Total Price: ${getTotalPrice()}</p>
                    <Button variant="success" onClick={handleBuy}>Buy</Button>
                </>
            )}
        </div>
    );
};

export default CartPage;
