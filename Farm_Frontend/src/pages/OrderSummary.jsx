import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, ListGroup, Row, Col, Badge } from 'react-bootstrap';

const OrderSummary = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
        console.log("Stored Order Details:", storedOrderDetails);
        if (storedOrderDetails) {
            setOrderDetails(storedOrderDetails.payment);
        }
    }, []);

    const handleGoToProducts = () => {
        localStorage.removeItem("orderDetails");
        navigate("/customer-product");
    };

    return (
        <Container className="mt-5">
            <h2
    className="mb-4"
    style={{
        fontWeight: "600",
        fontSize: "30px",
        marginBottom: "3px",
        color: "#ffffff",
        fontStyle: "italic",
        textDecoration: "underline",
        padding: "10px",
        background: "linear-gradient(90deg, #ff8a00, #e52e71)",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        display: "block",
        width: "63%",
        marginLeft: "auto",
        marginRight: "auto", // Horizontally center the block element
        textAlign: "center",
    }}
>
    Order Details
</h2>


            {orderDetails ? (
                <div className="d-flex justify-content-center">
                    <Card style={{ width: '50rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
                        <Card.Body>
                            {/* Order Info Section */}
                            <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px', paddingBottom: '10px' }}>
                                <h5>
                                    Order ID: <Badge bg="secondary">{orderDetails._id}</Badge>
                                </h5>
                                <p style={{ fontSize: '1.1rem', marginTop: '10px' }}>
                                    <strong>Total Price:</strong> <span style={{ color: '#FF5722' }}>LKR {orderDetails.cart.reduce((total, item) => total + item.total, 0)}</span>
                                </p>
                                <p><strong>Order Date:</strong> {new Date(orderDetails.expiryDate).toLocaleString()}</p>
                            </div>

                            {/* Products List Section */}
                            <h5 className="mb-3" style={{ fontWeight: 'bold' }}>Products Purchased</h5>
                            <ListGroup variant="flush">
                                {orderDetails.cart.map((item, index) => (
                                    <ListGroup.Item key={index} style={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff" }}>
                                        <Row>
                                            <Col md={6}>
                                                <p style={{ marginBottom: "5px" }}><strong>Product:</strong> {item.name}</p>
                                                <p style={{ marginBottom: "0px" }}><strong>Quantity:</strong> {item.quantity}</p>
                                            </Col>
                                            <Col md={6} className="text-md-end">
                                                <p style={{ marginBottom: "5px" }}><strong>Unit Price:</strong> LKR {item.price}</p>
                                                <p style={{ marginBottom: "0px" }}><strong>Total:</strong> <span style={{ color: "#FF5722" }}>LKR {item.total}</span></p>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            {/* Button */}
                            <div className="d-flex justify-content-center">
                                <Button variant="warning" className="mt-4 px-4 py-2" onClick={handleGoToProducts} style={{ fontWeight: 'bold', borderRadius: '25px' }}>
                                    Browse More Products
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ) : (
                <p className="text-center">No order details available</p>
            )}
        </Container>
    );
};

export default OrderSummary;
