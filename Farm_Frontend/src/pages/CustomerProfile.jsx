import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomerProfile = () => {
    const navigate = useNavigate();
    const { user, updateUserProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        } else {
            // Populate the form data with user details when user is available
            setFormData({
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Validate input on change
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        let errorMessage = "";
        switch (name) {
            case "name":
                errorMessage = value.length < 3 ? "Name must be at least 3 characters long" : "";
                break;
            case "email":
                errorMessage = !/\S+@\S+\.\S+/.test(value) ? "Enter a valid email address" : "";
                break;
            case "address":
                errorMessage = value.length < 5 ? "Address must be at least 5 characters long" : "";
                break;
            case "phone":
                errorMessage = !/^\d{10}$/.test(value) ? "Enter a valid 10-digit phone number" : "";
                break;
            default:
                break;
        }
        setFormErrors({
            ...formErrors,
            [name]: errorMessage
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate all fields before submitting
            let isValid = true;
            Object.keys(formData).forEach((key) => {
                validateInput(key, formData[key]);
                if (formErrors[key]) isValid = false;
            });

            if (isValid) {
                const updatedUserResponse = await updateUserProfile(formData);
                const { token, user: updatedUser } = updatedUserResponse.data;

                // Update the stored token and user data in the context
                setAuthData({ token, user: updatedUser });

                console.log("Profile updated successfully!");
                // Optionally, you can display a success message or redirect the user
            } else {
                console.error("Form contains errors");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h3 className="mb-4">Customer Profile</h3>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                isInvalid={!!formErrors.name}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                isInvalid={!!formErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                isInvalid={!!formErrors.address}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                isInvalid={!!formErrors.phone}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
                        </Form.Group>
                        <div style={{margin:"20px 0"}}></div>
                        <Button variant="primary" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                    <Link to="/reset-password-page" className="mt-2 d-block">Reset Password</Link>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CustomerProfile;
