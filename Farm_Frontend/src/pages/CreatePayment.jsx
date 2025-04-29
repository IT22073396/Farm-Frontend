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
                errors.number = '      |   Card number is required';
            } else if (!/^\d{16}$/.test(values.number)) {
                errors.number = 'Please enter a valid 16-digit card number';
            }
            if (!values.expiryDate) {
                errors.expiryDate = 'Expiry date is required';
              } else {
                const today = new Date();
                const [year, month] = values.expiryDate.split('-').map(Number);
                const selectedDate = new Date(year, month - 1); // JS months are 0-indexed
              
                if (selectedDate < new Date(today.getFullYear(), today.getMonth())) {
                  errors.expiryDate = 'Expiry date cannot be in the past';
                }
              }
            if (values.expiryDate && !/^\d{4}-\d{2}$/.test(values.expiryDate)) {
                errors.expiryDate = 'Please enter a valid expiry date in MM/YY format';
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
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f7f7f7' }}>
          <div className="container" style={{ maxWidth: '600px', background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 className="text-center mb-4" 
          style={{ 
            textAlign: "center", // Aligns the text to the center
            fontWeight: "600",
            fontSize: "30px",
            marginBottom: "3px",
            color: "rgb(255, 255, 255)", // Text color white for contrast
            fontStyle: "italic",
            textDecoration: "underline",
            padding: "10px",
            backgroundColor: "#f5a623", // Added background color (you can change this)
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            display: "inline-block",
            width: "100%", // Ensures full width for centering
            position: "relative",
            top: "50%", // Centers vertically
            transform: "translateY(-50%)", // Centers vertically with translation
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",

          }}>Payment Details</h2>

              
              <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-4" controlId="name">
                      <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>Cardholder Name</Form.Label>
                      <div className="d-flex align-items-center" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                          <Form.Control 
                              name="name" 
                              type="text" 
                              placeholder="Enter Cardholder Name" 
                              value={formik.values.name} 
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur} 
                              required 
                              style={{
                                  border: 'none', 
                                  padding: '12px', 
                                  borderRadius: '8px 0 0 8px',
                                  fontSize: '16px'
                              }}
                          />
                          <span style={{ padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '0 8px 8px 0', fontSize: '20px' }}>
                              <i className="bi bi-person" /> {/* Optional Icon */}
                          </span>
                      </div>
                      {formik.errors.name && formik.touched.name && <Form.Text className="text-danger">{formik.errors.name}</Form.Text>}
                  </Form.Group>
  
                  <Form.Group className="mb-4" controlId="number">
                      <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>Card Number</Form.Label>
                      <div className="d-flex align-items-center" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                      <div>
                        <Form.Control 
                            name="number" 
                            type="text"
                            placeholder="Enter Card Number" 
                            value={formik.values.number} 
                            onChange={(e) => {
                            const onlyNums = e.target.value.replace(/\D/g, ''); // Only digits
                            if (onlyNums.length <= 16) {
                                formik.setFieldValue('number', onlyNums);
                            }
                            }} 
                            onBlur={formik.handleBlur} 
                            required 
                            style={{
                            border: 'none', 
                            padding: '12px', 
                            borderRadius: '8px 0 0 8px',
                            fontSize: '16px'
                            }}
                        />
                        </div>
                      </div>

                      <small style={{ fontSize: '14px', color: 'rgb(2, 150, 29)' }}>
                            {formik.values.number.length}/16 digits entered
                      </small>

                            


                      {formik.errors.number && formik.touched.number && <Form.Text className="text-danger">{formik.errors.number}</Form.Text>}
                  </Form.Group>
  
                  <div className="d-flex justify-content-between mb-4">
                      <Form.Group className="w-45" controlId="expiryDate">
                          <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>Expiry Date</Form.Label>
                          <Form.Control 
                            name="expiryDate" 
                            type="month" 
                            placeholder="MM/YY" 
                            min={new Date().toISOString().slice(0, 7)}
                            value={formik.values.expiryDate} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            required 
                            style={{
                                padding: '12px', 
                                fontSize: '16px',
                                border: '1px solid #ddd', 
                                borderRadius: '8px',
                            }}
                            />

                          {formik.errors.expiryDate && formik.touched.expiryDate && <Form.Text className="text-danger">{formik.errors.expiryDate}</Form.Text>}
                      </Form.Group>
  
                      <Form.Group className="w-45" controlId="cvv">
                          <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>CVV</Form.Label>
                          <Form.Control 
                                name="cvv" 
                                type="text" 
                                placeholder="CVV" 
                                value={formik.values.cvv} 
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                    if (onlyNums.length <= 3) {
                                    formik.setFieldValue('cvv', onlyNums);
                                    }
                                }} 
                                onBlur={formik.handleBlur} 
                                required 
                                style={{
                                    padding: '12px', 
                                    fontSize: '16px',
                                    border: '1px solid #ddd', 
                                    borderRadius: '8px',
                                }}
                                />
                            <small style={{ fontSize: '14px', color: 'rgb(2, 150, 29)'  }}>
                                {formik.values.cvv.length}/3 digits entered
                            </small>
                            <span style={{ padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '0 8px 8px 0', fontSize: '20px' }}>
                                {/* <i className="bi bi-lock" /> Optional Icon */}
                            </span>

                          {formik.errors.cvv && formik.touched.cvv && <Form.Text className="text-danger">{formik.errors.cvv}</Form.Text>}
                      </Form.Group>
                  </div>
  
                  <Form.Group className="mb-4" controlId="issuingBank">
                      <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>Issuing Bank</Form.Label>
                      <Form.Select 
                          name="issuingBank" 
                          value={formik.values.issuingBank} 
                          onChange={formik.handleChange} 
                          onBlur={formik.handleBlur} 
                          required 
                          style={{
                              padding: '12px', 
                              fontSize: '16px',
                              border: '1px solid #ddd', 
                              borderRadius: '8px',
                          }}
                      >
                          <option value="">Select Issuing Bank</option>
                          <option value="Bank OF Cylone">Bank OF Cylone</option>
                          <option value="Hatton Natinal Bank">Hatton National Bank PLC (HNB)</option>
                          <option value="People's Bank">People's Bank</option>
                          <option value="Commercial Bank">Commercial Bank of Ceylon PLC</option>
                          <option value="Sampath Bank PLC">Sampath Bank PLC</option>
                          <option value="Seylan Bank PLC">Seylan Bank PLC</option>
                          <option value="Nations Trust Bank PLC">Nations Trust Bank PLC (NTB)</option>
                          <option value="Pan Asia Banking Corporation PLC">Pan Asia Banking Corporation PLC</option>
                          <option value="DFCC Bank PLC">DFCC Bank PLC</option>
                          <option value="Union Bank of Colombo PLC">Union Bank of Colombo PLC</option>
                          <option value="Amana Bank PLC">Amana Bank PLC</option>
                          <option value="Cargills Bank">Cargills Bank</option>
                          <option value="LB Finance PLC">LB Finance PLC</option>
                          <option value="HNB Finance PLC">HNB Finance PLC</option>
                          <option value="Seylan Developments PLC">Seylan Developments PLC</option>
                      </Form.Select>
                      {formik.errors.issuingBank && formik.touched.issuingBank && <Form.Text className="text-danger">{formik.errors.issuingBank}</Form.Text>}
                  </Form.Group>
  
                  <Button id="btn" name="submit" variant="primary" type="submit" style={{
                      width: '100%', 
                      padding: '15px', 
                      fontSize: '18px', 
                      backgroundColor: '#007bff', 
                      borderColor: '#007bff', 
                      borderRadius: '8px',
                  }}>
                      Confirm Payment
                  </Button>
              </Form>
          </div>
      </div>
  );
  
}  

export default CreatePayment;