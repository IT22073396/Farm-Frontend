import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ToastContext from "../context/ToastContext";
import { Card, Spinner, Form, Row, Col } from "react-bootstrap";
import '../css/CustomerProduct.css'; // Import custom CSS file

const CustomerProduct = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const [products, setProducts] = useState([]);
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
            console.log("🟡 API Response:", result);

            if (Array.isArray(result)) {
                setProducts(result);
            } else if (Array.isArray(result.products)) {
                setProducts(result.products);
            } else if (Array.isArray(result.data)) {
                setProducts(result.data);
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
        <div className="container customer-product-container">
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
                        filteredProducts.map((product) => {
                            const imageUrl = product.imageUrl.startsWith('http') 
                                ? product.imageUrl 
                                : `http://localhost:4000${product.imageUrl.startsWith('/') ? '' : '/'}${product.imageUrl}`;

                            return (
                                <Col key={product._id}>
                                    <Card className="h-100 product-card">
                                        <div className="product-image-container">
                                            <Card.Img
                                                variant="top"
                                                src={imageUrl}
                                                alt={product.name}
                                                className="product-image"
                                                onError={(e) => { 
                                                    console.error('Image load failed:', e.target.src);
                                                    e.target.src = "/placeholder.jpg"; 
                                                }}
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column card-body-flex">
                                            <Card.Title className="product-title">{product.name}</Card.Title>
                                            <Card.Text className="product-price">Price: LKR {product.price}</Card.Text>
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
                                            <div className="mt-auto card-buttons">
                                                <Button
                                                    variant="primary"
                                                    className="me-2"
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
                                                    className="btn btn-outline-primary"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
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