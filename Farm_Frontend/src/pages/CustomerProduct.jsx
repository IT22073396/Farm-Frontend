import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ToastContext from "../context/ToastContext";
import { Card, Spinner, Form, Row, Col } from "react-bootstrap";

const CustomerProduct = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const [products, setProducts] = useState([]); // Default to empty array
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
            return;
        }

        setLoading(true);
        fetchProducts();

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/products', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });

            const result = await res.json();
            console.log("🟡 API Response:", result); // <-- Debug log

            // Flexible handling based on shape of API response
            if (Array.isArray(result)) {
                setProducts(result); // Direct array response
            } else if (Array.isArray(result.products)) {
                setProducts(result.products); // Expected shape
            } else if (Array.isArray(result.data)) {
                setProducts(result.data); // Alternate API shape
            } else {
                toast.error(result.error || "Unexpected response structure");
            }

        } catch (err) {
            toast.error("Failed to fetch products");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product, quantity) => {
        const existingItem = cart.find(item => item._id === product._id);
        if (existingItem) {
            const updatedCart = cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
        toast.success("Added to Cart");
    };

    const updateQuantity = (productId, quantity, fromCart) => {
        if (fromCart) {
            const updatedCart = cart.map(item =>
                item._id === productId ? { ...item, quantity } : item
            );
            setCart(updatedCart);
        } else {
            const updatedProducts = products.map(product =>
                product._id === productId ? { ...product, quantity } : product
            );
            setProducts(updatedProducts);
        }
    };

    const filteredProducts = products?.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="container">
            <h2 className="mb-4">Welcome, {user?.name}</h2>

            <Form.Group controlId="search" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>

            <p className="mb-4">Here are some products for you:</p>

            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Col key={product._id}>
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:4000/${product.imageUrl || "default-image.jpg"}`}
                                        alt={product.name}
                                        onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>Price: ${product.price}</Card.Text>
                                        <Form.Group controlId={`quantity-${product._id}`} className="mb-3">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control
                                                type="number"
                                                defaultValue="1"
                                                min="1"
                                                onChange={(e) =>
                                                    updateQuantity(
                                                        product._id,
                                                        parseInt(e.target.value),
                                                        false
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                addToCart(
                                                    product,
                                                    parseInt(
                                                        document.getElementById(`quantity-${product._id}`).value
                                                    )
                                                )
                                            }
                                        >
                                            Add to Cart
                                        </Button>
                                        <Link
                                            to={`/product-details/${product._id}`}
                                            className="btn btn-primary ms-2"
                                        >
                                            View Details
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p>No products found.</p>
                        </Col>
                    )}
                </Row>
            )}
        </div>
    );
};

export default CustomerProduct;
