import { useContext, useEffect, useState, useMemo } from "react";
import { Button, Table, Modal, Spinner, Form, Badge, Stack } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ToastContext from "../context/ToastContext";
import ProductPDFReport from './ProductPDFReport';

const AllProducts = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortConfig, setSortConfig] = useState({ 
    key: 'productId', 
    direction: 'asc' 
  });

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/products', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const result = await res.json();
      if (!result.error) {
        setProducts(result.products || []);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort and filter products
  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchInput) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  }, [products, searchInput, sortConfig]);

  // Delete product
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
        if (!result.error) {
          toast.success("Product deleted successfully");
          setShowModal(false);
          fetchProducts();
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        toast.error("Failed to delete product");
        console.error(err);
      }
    }
  };

  // Handle search submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Filtering is handled in the memoized sortedAndFilteredProducts
  };

  // Reset search
  const resetSearch = () => {
    setSearchInput("");
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management</h2>
        <Badge bg="secondary">
          Total Products: {products.length}
        </Badge>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form onSubmit={handleSearchSubmit} className="flex-grow-1 me-3">
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Search products by name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Search
            </Button>
            {searchInput && (
              <Button variant="outline-secondary" onClick={resetSearch}>
                Clear
              </Button>
            )}
          </div>
        </Form>

        <Stack direction="horizontal" gap={2}>
          <Button 
            variant="outline-secondary" 
            onClick={fetchProducts}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <PDFDownloadLink 
            document={<ProductPDFReport products={sortedAndFilteredProducts} />} 
            fileName="products_report.pdf"
            className="btn btn-primary"
          >
            {({ loading }) => loading ? 'Generating PDF...' : 'Export PDF'}
          </PDFDownloadLink>
          <Link to="/createproducts" className="btn btn-success">Add New Product</Link>
        </Stack>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th 
                onClick={() => requestSort('productId')}
                style={{ cursor: 'pointer' }}
                className="sortable-header"
              >
                Product ID
                {sortConfig.key === 'productId' && (
                  <span className="ms-2">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th>Name</th>
              <th>Image</th>
              <th>Price (LKR)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <Spinner animation="border" />
                  <p className="mt-2">Loading products...</p>
                </td>
              </tr>
            ) : sortedAndFilteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  {searchInput ? 
                    "No products match your search criteria" : 
                    "No products available"}
                </td>
              </tr>
            ) : (
              sortedAndFilteredProducts.map((product) => (
                <tr 
                  key={product._id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>
                    {product.imageUrl && (
                      <img 
                        src={`http://localhost:4000/${product.imageUrl}`} 
                        alt={product.name}
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          objectFit: 'cover' 
                        }}
                        className="img-thumbnail"
                      />
                    )}
                  </td>
                  <td>{product.price.toLocaleString()}</td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    {product.description}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Product Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Product Details: {selectedProduct?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div className="row">
              <div className="col-md-4 text-center">
                {selectedProduct.imageUrl && (
                  <img 
                    src={`http://localhost:4000/${selectedProduct.imageUrl}`} 
                    alt={selectedProduct.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: '200px' }}
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <h5>Basic Information</h5>
                  <hr className="mt-1" />
                  <p><strong>Product ID:</strong> {selectedProduct.productId}</p>
                  <p><strong>Name:</strong> {selectedProduct.name}</p>
                  <p><strong>Price:</strong> LKR {selectedProduct.price.toLocaleString()}</p>
                  <p>
                    <strong>Quantity:</strong> 
                    <span className={selectedProduct.quantity <= 5 ? 'text-danger fw-bold ms-2' : 'ms-2'}>
                      {selectedProduct.quantity}
                    </span>
                  </p>
                </div>
                <div>
                  <h5>Description</h5>
                  <hr className="mt-1" />
                  <p>{selectedProduct.description}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Link 
            to={`/editproducts/${selectedProduct?._id}`}
            className="btn btn-primary"
            state={{ product: selectedProduct }}
          >
            Edit Product
          </Link>
          <Button 
            variant="danger" 
            onClick={() => deleteProduct(selectedProduct?._id)}
          >
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllProducts;