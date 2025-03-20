import { useContext } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Formik } from 'formik';

const CreateEmployee = () => {
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        address: "",
        email: "",
        phone: "",
        userRole: "EMPLOYEE"
    };

    const validate = values => {
        const errors = {};

        if (!values.name.trim()) {
            errors.name = "Name is required";
        } else if(!/^[A-Za-z]+$/.test(values.name)){
            errors.name = "Invalid Name with special characters";
        }

        if (!values.address.trim()) {
            errors.address = "Address is required";
        }

        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.phone.trim()) {
            errors.phone = "Phone is required";
        } else if (!/^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/.test(values.phone)) {
            // Sri Lankan phone number pattern: starts with 0 and followed by 9 digits
            errors.phone = "Invalid phone number";
        }

        return errors;
    };

    const handleChangeName = event => {
        const input = event.target.value;
        const regex = /^[a-zA-Z]*$/;
        if (input === "" || regex.test(input)) {
            setFieldValue("name", input);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await fetch('http://localhost:4000/api/employees', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(values),
            });

            const result = await res.json();
            if (!result.error) {
                toast.success(`Created [${values.name}]`);
                resetForm();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2>Add Employees</h2>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control
                             name="name"
                            type="text"
                            placeholder="Enter Employee Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                       onKeyPress={(event) => {
        // Allow only alphabetic characters and space
                    const regex = /^[A-Za-z\s]*$/;
                    if (!regex.test(event.key)) {
                       event.preventDefault();
        }
    }}
    isInvalid={touched.name && !!errors.name}
    required
/>

                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Employee Address</Form.Label>
                            <Form.Control
                                name="address"
                                type="text"
                                placeholder="Enter Employee Address"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.address && !!errors.address}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Employee Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter Employee email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.email && !!errors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Employee Phone Number</Form.Label>
                            <Form.Control
                                name="phone"
                                type="tel"
                                placeholder="Enter Phone Number"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.phone && !!errors.phone}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userRole">
                            <Form.Label>Employee Role</Form.Label>
                            <Form.Select
                                name="userRole"
                                value={values.userRole}
                                onChange={handleChange}
                            >
                                <option value="EMPLOYEE">Employee</option>
                                <option value="EMPLOYEE_MANAGER">Employee Manager</option>
                                <option value="INVENTORY_MANAGER">Inventory Manager</option>
                                <option value="SUPPLIER_MANAGER">Supplier Manager</option>
                                <option value="DELIVERY_MANAGER">Delivery Manager</option>
                                <option value="TRANSPORT_MANAGER">Transport Manager</option>
                                <option value="PRODUCT_MANAGER">Product Manager</option>
                                <option value="PAYMENT_MANAGER">Payment Manager</option>
                                <option value="CUSTOMER_MANAGER">Customer Manager</option>
                            </Form.Select>
                        </Form.Group>
                        <Button
                            id="btn"
                            name="submit"
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Add Employee'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateEmployee;