import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";

const ContactTransport = () => {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        address: Yup.string().required("Address is required"),
        productName: Yup.string().required("Product name is required"),
        productQuantity: Yup.number().required("Product quantity is required").min(1, "Quantity must be at least 1"),
        pickUpDate: Yup.date().required("Pick Up Date is required"),
        pickUpTime: Yup.string().required("Pick Up Time is required"),
    });

    // Handle form submission
    const handleSubmit = async (values, { resetForm }) => {
        const response = await fetch("http://localhost:4000/api/transportmailsupp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(values),
        });

        const result = await response.json();
        if (!result.error) {
            toast.success("Mail sent successfully");
            resetForm(); // Reset form fields
        } else {
            toast.error(result.error);
        }
    };

    return (
        <>
            <h2>Contact Transport Manager</h2>
            <Formik
                initialValues={{
                    address: "",
                    productName: "",
                    productQuantity: "",
                    pickUpDate: "",
                    pickUpTime: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <FormikForm>
                        {/* Address */}
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Field
                                as={Form.Control}
                                name="address"
                                type="text"
                                placeholder="Enter address"
                            />
                            <ErrorMessage name="address" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Product Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Field
                                as={Form.Control}
                                name="productName"
                                type="text"
                                placeholder="Enter product name"
                            />
                            <ErrorMessage name="productName" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Product Quantity */}
                        <Form.Group className="mb-3">
                            <Form.Label>Product Quantity</Form.Label>
                            <Field
                                as={Form.Control}
                                name="productQuantity"
                                type="number"
                                placeholder="Enter product quantity"
                            />
                            <ErrorMessage name="productQuantity" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Pick Up Date */}
                        <Form.Group className="mb-3">
                            <Form.Label>Pick Up Date</Form.Label>
                            <Field
                                as={Form.Control}
                                name="pickUpDate"
                                type="date"
                            />
                            <ErrorMessage name="pickUpDate" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Pick Up Time */}
                        <Form.Group className="mb-3">
                            <Form.Label>Pick Up Time</Form.Label>
                            <Field
                                as={Form.Control}
                                name="pickUpTime"
                                type="time"
                            />
                            <ErrorMessage name="pickUpTime" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Submit button */}
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Send mail
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </>
    );
};

export default ContactTransport;
