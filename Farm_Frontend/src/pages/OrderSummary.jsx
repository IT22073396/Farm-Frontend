import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, ListGroup } from 'react-bootstrap';

const OrderSummary = () => {
    // State to hold the order details
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve order details from localStorage
        const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
        console.log("Stored Order Details:", storedOrderDetails); // Log the stored order details
        if (storedOrderDetails) {
            setOrderDetails(storedOrderDetails.payment); // Access the "payment" object from the stored data
        }
    }, []);

    const handleGoToProducts = () => {
        // Remove order details from localStorage
        localStorage.removeItem("orderDetails");
        // Navigate to the customer product page
        navigate("/customer-product");
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Order Details</h2>
            {orderDetails ? (
                <Card>
                    <Card.Body>
                        <Card.Title>Order ID: {orderDetails._id}</Card.Title>
                        <Card.Text>Total Price: ${orderDetails.cart.reduce((total, item) => total + item.total, 0)}</Card.Text> {/* Calculate total price */}
                        <Card.Text>Order Date: {new Date(orderDetails.expiryDate).toLocaleString()}</Card.Text>
                        <Card.Title className="mt-3">Products:</Card.Title>
                        <ListGroup variant="flush">
                            {orderDetails.cart.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <p>Product Name: {item.name}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price per unit: ${item.price}</p>
                                    <p>Total Price: ${item.total}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button variant="primary" className="mt-3" onClick={handleGoToProducts}>Browse More</Button>
                    </Card.Body>
                </Card>
            ) : (
                <p>No order details available</p>
            )}
        </Container>
    );
};

export default OrderSummary;
