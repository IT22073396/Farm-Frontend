import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner, Alert, Card } from "react-bootstrap";

const EditProducts = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState({
        name: "",
        productId: "",
        quantity: "",
        price: "",
        description: "",
        imageUrl: "",
    });
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requestInProgress, setRequestInProgress] = useState(false);

    // Debug initial state
    console.log("Initializing EditProducts with ID:", id);
    console.log("Current user:", user);
    console.log("Initial product state:", productDetails);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductDetails(prev => ({ ...prev, [name]: value }));
        console.log("Field updated:", name, value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setRequestInProgress(true);
        setError(null);
        console.log("Submitting form with data:", productDetails);

        const formData = new FormData();
        formData.append("name", productDetails.name);
        formData.append("productId", productDetails.productId);
        formData.append("quantity", productDetails.quantity);
        formData.append("price", productDetails.price);
        formData.append("description", productDetails.description);
        if (productImage) {
            formData.append("image", productImage);
            console.log("Including image in update");
        }

        try {
            const response = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            });

            console.log("Update response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
                throw new Error(errorData.message || "Failed to update product");
            }

            const result = await response.json();
            console.log("Update successful:", result);

            toast.success(`Product "${productDetails.name}" updated successfully`);
            navigate("/allproducts");
        } catch (err) {
            console.error("Update error:", err);
            setError(err.message);
            toast.error(err.message);
        } finally {
            setRequestInProgress(false);
        }
    };

    useEffect(() => {
        if (!id) {
            console.error("No product ID provided");
            toast.error("No product selected");
            navigate("/allproducts");
            return;
        }

        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            console.log(`Fetching product with ID: ${id}`);

            try {
                const response = await fetch(`http://localhost:4000/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log("Fetch response status:", response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Backend error:", errorData);
                    throw new Error(errorData.message || "Failed to fetch product");
                }

                const result = await response.json();
                console.log("Fetched product data:", result);

                if (!result) {
                    throw new Error("Product data not found");
                }

                setProductDetails({
                    name: result.name || "",
                    productId: result.productId || "",
                    quantity: result.quantity || "",
                    price: result.price || "",
                    description: result.description || "",
                    imageUrl: result.imageUrl || "",
                });

                console.log("Product state updated:", {
                    ...result,
                    imageUrl: result.imageUrl || ""
                });
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
                toast.error(err.message);
                navigate("/allproducts");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        return () => {
            console.log("Cleaning up EditProducts");
        };
    }, [id, navigate, toast]);

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading product...</span>
                </Spinner>
                <p className="mt-3">Loading product details...</p>
                <div className="debug-info mt-3">
                    <Card body className="text-start small">
                        <strong>Debug Information:</strong>
                        <div>Product ID: {id}</div>
                        <div>Token: {localStorage.getItem("token") ? "Present" : "Missing"}</div>
                    </Card>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <Alert variant="danger">
                    <Alert.Heading>Error Loading Product</Alert.Heading>
                    <p>{error}</p>
                    <div className="debug-info mt-3">
                        <Card body className="text-start small">
                            <strong>Debug Information:</strong>
                            <div>Product ID: {id}</div>
                            <div>Token: {localStorage.getItem("token") ? "Present" : "Missing"}</div>
                            <div>User: {user ? user.email : "Not authenticated"}</div>
                        </Card>
                    </div>
                    <Button 
                        variant="primary" 
                        onClick={() => window.location.reload()}
                        className="mt-3 me-2"
                    >
                        Retry
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => navigate("/allproducts")}
                        className="mt-3"
                    >
                        Back to Products
                    </Button>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Edit Product</h2>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="Enter Product Name"
                        value={productDetails.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                        name="productId"
                        type="text"
                        placeholder="Enter Product ID"
                        value={productDetails.productId}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        name="quantity"
                        type="number"
                        placeholder="Quantity"
                        value={productDetails.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        name="price"
                        type="text"
                        placeholder="Enter Price"
                        value={productDetails.price}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        as="textarea"
                        rows={5}
                        placeholder="Enter description"
                        value={productDetails.description}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    {productDetails.imageUrl && (
                        <div className="mb-2">
                            <img
                                src={`http://localhost:4000/${productDetails.imageUrl}`}
                                alt={productDetails.name}
                                style={{ width: '200px', height: 'auto' }}
                                className="img-thumbnail d-block"
                            />
                            <small className="text-muted">Current image</small>
                        </div>
                    )}
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                setProductImage(e.target.files[0]);
                                console.log("New image selected:", e.target.files[0].name);
                            }
                        }}
                    />
                    <Form.Text className="text-muted">
                        {productImage ? `New image: ${productImage.name}` : "No new image selected"}
                    </Form.Text>
                </Form.Group>

                <div className="d-flex gap-3 mb-4">
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={requestInProgress}
                    >
                        {requestInProgress ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Saving...
                            </>
                        ) : "Save Changes"}
                    </Button>
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => navigate("/allproducts")}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default EditProducts;