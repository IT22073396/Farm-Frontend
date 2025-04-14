import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaHome, FaPhone, FaKey } from "react-icons/fa";

const CustomerProfile = () => {
    const navigate = useNavigate();
    const { user, updateUserProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        } else {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                address: user.address || "",
                phone: user.phone || ""
            });
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear success message when editing
        if (successMessage) setSuccessMessage("");
        
        // Validate input
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        let errorMessage = "";
        switch (name) {
            case "name":
                errorMessage = value.trim().length < 3 ? "Name must be at least 3 characters" : "";
                break;
            case "email":
                errorMessage = !/^\S+@\S+\.\S+$/.test(value) ? "Please enter a valid email" : "";
                break;
            case "address":
                errorMessage = value.trim().length < 5 ? "Address must be at least 5 characters" : "";
                break;
            case "phone":
                errorMessage = !/^\d{10}$/.test(value) ? "Please enter a 10-digit phone number" : "";
                break;
            default:
                break;
        }
        setFormErrors(prev => ({
            ...prev,
            [name]: errorMessage
        }));
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        } else if (formData.name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Please enter a valid email";
            isValid = false;
        }

        if (!formData.address.trim()) {
            errors.address = "Address is required";
            isValid = false;
        } else if (formData.address.trim().length < 5) {
            errors.address = "Address must be at least 5 characters";
            isValid = false;
        }

        if (!formData.phone) {
            errors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Please enter a 10-digit phone number";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            await updateUserProfile(formData);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 5000);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">
                                <FaUser className="me-2" />
                                Customer Profile
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            {successMessage && (
                                <Alert variant="success" className="mb-4">
                                    {successMessage}
                                </Alert>
                            )}
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        <FaUser className="me-2 text-muted" />
                                        Full Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your full name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.name}
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        <FaEnvelope className="me-2 text-muted" />
                                        Email Address
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.email}
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        <FaHome className="me-2 text-muted" />
                                        Address
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter your address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.address}
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        <FaPhone className="me-2 text-muted" />
                                        Phone Number
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.phone}
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid gap-2 mt-4">
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        size="lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Updating..." : "Update Profile"}
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-4">
                                <Link 
                                    to="/reset-password-page" 
                                    className="text-decoration-none"
                                >
                                    <FaKey className="me-2" />
                                    Reset Password
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerProfile;