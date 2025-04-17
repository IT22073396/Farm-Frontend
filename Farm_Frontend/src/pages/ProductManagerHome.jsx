import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import '../css/ProductManeger.css';

// Import images
import createIcon from "../assets/addProductImage.png";
import allProductsIcon from "../assets/allProducts.jpg";
import addLeaveIcon from "../assets/add.png";

const ProductManagerHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        !user && navigate("/login", { replace: true });
    }, [user, navigate]);

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Welcome, {user?.name}!</h2>
            
            <Row className="justify-content-center g-4">
                {/* Add Product Card */}
                <Col md={4} className="d-flex">
                    <Card className="w-100 shadow-sm hover-effect">
                        <div className="card-img-container">
                            <Card.Img 
                                variant="top" 
                                src={createIcon} 
                                className="card-img-fit"
                            />
                        </div>
                        <Card.Body className="text-center d-flex flex-column">
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="mt-auto"
                                as={Link} 
                                to="/createproducts"
                            >
                                Add Product
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* All Products Card */}
                <Col md={4} className="d-flex">
                    <Card className="w-100 shadow-sm hover-effect">
                        <div className="card-img-container">
                            <Card.Img 
                                variant="top" 
                                src={allProductsIcon} 
                                className="card-img-fit"
                            />
                        </div>
                        <Card.Body className="text-center d-flex flex-column">
                            <Button 
                                variant="secondary" 
                                size="lg" 
                                className="mt-auto"
                                as={Link} 
                                to="/allproducts"
                            >
                                All Products
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Add Leave Card */}
                <Col md={4} className="d-flex">
                    <Card className="w-100 shadow-sm hover-effect">
                        <div className="card-img-container">
                            <Card.Img 
                                variant="top" 
                                src={addLeaveIcon} 
                                className="card-img-fit"
                            />
                        </div>
                        <Card.Body className="text-center d-flex flex-column">
                            <Button 
                                variant="info" 
                                size="lg" 
                                className="mt-auto"
                                as={Link} 
                                to="/createleave"
                            >
                                Add Leave
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductManagerHome;