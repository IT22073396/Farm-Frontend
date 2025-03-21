import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";

const CreateSupplier = () => {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Supplier Name is required")
            .matches(/^[a-zA-Z\s]+$/, "Supplier Name can only contain letters and spaces"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        registeredDate: Yup.date().required("Registered Date is required"),
        location: Yup.string().required("Location is required"),
    });

    // Handle form submission
    const handleSubmit = async (values, { resetForm }) => {
        const response = await fetch('http://localhost:4000/api/suppliers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(values),
        });

        const result = await response.json();
        if (!result.error) {
            toast.success(`Created [${values.name}]`);
            resetForm(); // Reset form fields
        } else {
            toast.error(result.error);
        }
    };

    const handleNameKeyPress = (e) => {
        const char = String.fromCharCode(e.charCode);
        if (!/^[a-zA-Z\s]+$/.test(char)) {
            e.preventDefault(); // Prevent invalid character input
        }
    };

    return (
        <>
            <h2>Add Suppliers</h2>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    registeredDate: "",
                    location: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <FormikForm>
                        {/* Supplier Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Supplier Name</Form.Label>
                            <Field
                                as={Form.Control}
                                name="name"
                                type="text"
                                placeholder="Enter Supplier Name"
                                onKeyPress={handleNameKeyPress} // Add onKeyPress event handler
                            />
                            <ErrorMessage name="name" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Supplier Email */}
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Supplier Email Address</Form.Label>
                            <Field
                                as={Form.Control}
                                name="email"
                                type="email"
                                placeholder="Enter Supplier email"
                            />
                            <ErrorMessage name="email" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Registered Date */}
                        <Form.Group className="mb-3" controlId="registeredDate">
                            <Form.Label>Registered Date to Our Company</Form.Label>
                            <Field
                                as={Form.Control}
                                name="registeredDate"
                                type="date"
                                placeholder="Enter Registered Date"
                            />
                            <ErrorMessage name="registeredDate" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Supplier Location */}
                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Supplier Location</Form.Label>
                            <Field
                                as={Form.Control}
                                name="location"
                                type="text"
                                placeholder="Enter Supplier Location"
                            />
                            <ErrorMessage name="location" component={Form.Text} className="text-danger" />
                        </Form.Group>

                        {/* Submit button */}
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                            Add Supplier
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </>
    );
};

export default CreateSupplier;
