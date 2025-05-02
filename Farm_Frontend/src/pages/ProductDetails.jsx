import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Spinner, Button, Container, Row, Col } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        const result = await res.json();
        if (!result.error) {
          setProduct(result);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-4">Product not found</p>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm rounded-3">
            <Card.Header as="h5" className="bg-primary text-white">
              {product.name}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {product.description}
              </Card.Text>
              <Link to="/customer-product">
                <Button variant="outline-primary" className="mt-3">Browse More</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
