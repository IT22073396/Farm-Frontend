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
        <div style={{
            padding: "40px 20px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h2
                className="fw-bold fst-italic text-decoration-underline"
                style={{
                    textAlign: "center", // Aligns the text to the center
                    fontWeight: "600",
                    fontSize: "30px",
                    marginBottom: "3px",
                    color: "rgb(255, 255, 255)", // Text color white for contrast
                    fontStyle: "italic",
                    textDecoration: "underline",
                    padding: "10px",
                    backgroundColor: "#f5a623", // Added background color (you can change this)
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    display: "inline-block",
                    width: "40%", // Ensures full width for centering
                    position: "relative",
                    top: "50%", // Centers vertically
                    transform: "translateY(-50%)", // Centers vertically with translation
                    background: "linear-gradient(90deg, #ff8a00, #e52e71)",

                }}
            >
                Your Cart
            </h2>
    
            {loading ? (
                <p style={{
                    fontSize: "22px",
                    color: "#888"
                }}>
                    Loading...
                </p>
            ) : (
                <>
                    <ListGroup style={{
                        width: "100%",
                        maxWidth: "500px"
                    }}>
                        {cart.map((item) => (
                            <ListGroup.Item
                                key={item.productId}
                                className="d-flex flex-column align-items-start"
                                style={{
                                    background: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    marginBottom: "20px",
                                    padding: "20px",
                                    boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                                    transition: "transform 0.2s, box-shadow 0.2s"
                                }}
                            >
                                <span style={{
                                    fontSize: "18px",
                                    color: "#333"
                                }}>
                                    <strong>{item.name}</strong>
                                </span>
    
                                <Form.Group
                                    controlId={`quantity-${item.productId}`}
                                    className="my-2 w-100"
                                >
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                                        style={{
                                            marginTop: "10px",
                                            padding: "5px 10px",
                                            fontSize: "16px"
                                        }}
                                    />
                                </Form.Group>
    
                                <div className="d-flex justify-content-between align-items-center w-100 mt-2" style={{ marginTop: "15px" }}>
                                    <span style={{
                                        fontSize: "18px",
                                        color: "#e53935",
                                        fontWeight: "bold"
                                    }}>
                                        LKR : {item.price * item.quantity}
                                    </span>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(item.productId)}
                                        style={{
                                            backgroundColor: "#ff1744",
                                            border: "none"
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
    
                    <p style={{
                        fontSize: "20px",
                        color: "#000",
                        fontWeight: "bold",
                        marginTop: "20px"
                    }}>
                        Total Price: LKR : {getTotalPrice()}
                    </p>
    
                    <Button
                        variant="success"
                        onClick={handleBuy}
                        style={{
                            marginTop: "20px",
                            width: "200px",
                            fontSize: "18px",
                            backgroundColor: "#43a047",
                            border: "none"
                        }}
                    >
                        Buy
                    </Button>
                </>
            )}
        </div>
    );
    
};    

export default CartPage;
