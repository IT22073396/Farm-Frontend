import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik'; // Import Formik
import ToastContext from "../context/ToastContext";

const CreatePayment = () => {
    const { toast } = useContext(ToastContext);
    const location = useLocation();
    const { cart } = location.state || {};

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            number: '',
            expiryDate: '',
            cvv: '',
            issuingBank: ''
        },
        validateOnChange: true,
        validateOnBlur: true,
        validate: values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Name is required';
            }
            if (!values.number) {
                errors.number = 'Card number is required';
            } else if (!/^\d{16}$/.test(values.number)) {
                errors.number = 'Please enter a valid 16-digit card number';
            }
            if (!values.expiryDate) {
                errors.expiryDate = 'Expiry date is required';
            }
            if (!values.cvv) {
                errors.cvv = 'CVV is required';
            } else if (!/^\d{3}$/.test(values.cvv)) {
                errors.cvv = 'Please enter a valid 3-digit CVV';
            }
            if (!values.issuingBank) {
                errors.issuingBank = 'Issuing bank is required';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const res = await fetch('http://localhost:4000/api/payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ ...values, cart, userId: localStorage.getItem('id'), totalPrice: 123 }),
                });
                const result = await res.json();
                if (!result.error) {
                    localStorage.setItem('orderDetails', JSON.stringify(result));
                    toast.success(`Payment Successful`);
                    localStorage.setItem('lastCart', JSON.stringify(cart));
                    localStorage.removeItem('cart');
                    formik.resetForm();
                    navigate('/order-summary', { state: { cart } });
                } else {
                    toast.error(result.error);
                }
            } catch (error) {
                console.error('Error creating payment:', error);
                toast.error('An error occurred while processing your payment');
            }
        },
    });

    return (
        <div className="container">
            <h2>Add Payment Details</h2>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>CardHolder Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter CardHolder Name" 
                        value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
                    {formik.errors.name && formik.touched.name && <Form.Text className="text-danger">{formik.errors.name}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="number">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control name="number" type="number" placeholder="Enter Card Number" 
                        value={formik.values.number} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
                    {formik.errors.number && formik.touched.number && <Form.Text className="text-danger">{formik.errors.number}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="expiryDate">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control name="expiryDate" type="date" placeholder="Enter Expiry Date" 
                        value={formik.values.expiryDate} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
                    {formik.errors.expiryDate && formik.touched.expiryDate && <Form.Text className="text-danger">{formik.errors.expiryDate}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="cvv">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control name="cvv" type="number" placeholder="Enter CVV" 
                        value={formik.values.cvv} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
                    {formik.errors.cvv && formik.touched.cvv && <Form.Text className="text-danger">{formik.errors.cvv}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="issuingBank">
                    <Form.Label>Issuing Bank </Form.Label>
                    <Form.Select name="issuingBank" 
                        value={formik.values.issuingBank} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur} 
                        required
                    >
                        <option value="">Select Issuing Bank</option>
                        <option value="Bank OF Cylone">BOC</option>
                        <option value="Hatton National Bank">HNB</option>
                        <option value="People's Bank">Pepole's Bank</option>
                        <option value="Commercial Bank">Commercial</option>
                    </Form.Select>
                    {formik.errors.issuingBank && formik.touched.issuingBank && <Form.Text className="text-danger">{formik.errors.issuingBank}</Form.Text>}
                </Form.Group>
                <Button id="btn" name="submit" variant="primary" type="submit">
                    Add Payment Details
                </Button>
            </Form>
        </div>
    );
};

export default CreatePayment;