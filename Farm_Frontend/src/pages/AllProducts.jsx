import { useContext, useEffect, useState } from "react";
import { Button, Table, Modal, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ToastContext from "../context/ToastContext";
import ProductPDFReport from './ProductPDFReport';

const AllProducts = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:4000/api/products', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch products");
            }

            // Handle both array response and object with products property
            const receivedProducts = Array.isArray(data) ? data : data.products || data.data || [];
            setProducts(receivedProducts);
            
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/products/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                
                const result = await res.json();
                
                if (!res.ok) {
                    throw new Error(result.error || "Delete failed");
                }

                toast.success("Product deleted");
                fetchProducts(); // Refresh the list
            } catch (err) {
                toast.error(err.message);
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product?.name?.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Product Inventory</h2>
            
            <div className="mb-3 d-flex">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button 
                    variant="secondary" 
                    onClick={() => setSearchInput("")}
                    className="ms-2"
                >
                    Clear
                </Button>
            </div>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Loading products...</p>
                </div>
            ) : error ? (
                <Alert variant="danger">
                    Error: {error}
                    <Button variant="primary" onClick={fetchProducts} className="ms-3">
                        Retry
                    </Button>
                </Alert>
            ) : filteredProducts.length === 0 ? (
                <Alert variant="info">
                    {searchInput ? "No matching products found" : "No products available"}
                </Alert>
            ) : (
                <>
                    <p>Showing {filteredProducts.length} products</p>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.productId}</td>
                                    <td>{product.quantity}</td>
                                    <td>LKR {product.price}</td>
                                    <td>
                                        {product.imageUrl && (
                                            <img
                                                src={`http://localhost:4000${product.imageUrl}`}
                                                alt={product.name}
                                                style={{ width: '80px', height: 'auto' }}
                                                className="img-thumbnail"
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            onClick={() => setShowModal(product)}
                                        >
                                            View
                                        </Button>
                                        <Link
                                            to={`/editproducts/${product._id}`}
                                            className="btn btn-warning btn-sm ms-2"
                                        >
                                            Edit
                                        </Link>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="ms-2"
                                            onClick={() => deleteProduct(product._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="mt-3">
                        <PDFDownloadLink 
                            document={<ProductPDFReport products={filteredProducts} />} 
                            fileName="products_report.pdf"
                            className="btn btn-primary"
                        >
                            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF Report')}
                        </PDFDownloadLink>
                    </div>
                </>
            )}

            {/* Product Details Modal */}
            <Modal show={!!showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{showModal?.name} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showModal && (
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Description:</strong> {showModal.description}</p>
                                <p><strong>Product ID:</strong> {showModal.productId}</p>
                                <p><strong>Quantity:</strong> {showModal.quantity}</p>
                                <p><strong>Price:</strong> LKR {showModal.price}</p>
                            </div>
                            <div className="col-md-6">
                                {showModal.imageUrl && (
                                    <img
                                        src={`http://localhost:4000${showModal.imageUrl}`}
                                        alt={showModal.name}
                                        className="img-fluid rounded"
                                        style={{ maxHeight: "300px" }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Link
                        to={`/editproducts/${showModal?._id}`}
                        className="btn btn-primary"
                    >
                        Edit Product
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AllProducts;