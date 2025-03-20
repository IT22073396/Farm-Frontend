import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d+$/;
    return re.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let error = '';

    switch (name) {
      case 'name':
        error = value.trim() ? '' : 'Name is required';
        break;
      case 'address':
        error = value.trim() ? '' : 'Address is required';
        break;
      case 'email':
        error = validateEmail(value) ? '' : 'Invalid email address';
        break;
      case 'phone':
        error = validatePhone(value) ? '' : 'Invalid phone number';
        break;
      case 'password':
        error = validatePassword(value) ? '' : 'Password must be at least 8 characters long';
        break;
      case 'confirmPassword':
        error = value === credentials.password ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, phone, password, confirmPassword } = credentials;

    if (!email || !phone || !password || !confirmPassword || !credentials.name || !credentials.address) {
      toast.error("Please enter all the required fields!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  const handleKeyPress1 = (event) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };


  const handleKeyPress = (event) => {
    const regex = /^\d+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <h3>Create your Account</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter Name"
            onKeyPress={handleKeyPress1}
            value={credentials.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Home Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter address"
            value={credentials.address}
            onChange={handleInputChange}
            required
          />
          {errors.address && <Form.Text className="text-danger">{errors.address}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
            onKeyPress={handleKeyPress}
            value={credentials.phone}
            onChange={handleInputChange}
            required
          />
          {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Enter Password"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}
        </Form.Group>

        <Button id="btn" name="submit" variant="primary" type="submit">
          Register
        </Button>
        <Form.Group>
          <p>Already Have an Account? <Link to="/login">Login</Link></p>
        </Form.Group>
      </Form>
    </>
  );
};

export default Register;
