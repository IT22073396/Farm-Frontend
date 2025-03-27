import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTransport = () => {
    const [vehicleDetails, setVehicleDetails] = useState({
        vehicle: "",
        vnumberPrefix: "",
        vnumberSuffix: "",
        model: "",
        status: "",
        last_inspection: "",
        next_inspection: "",
    });

    const validatePrefixSuffix = (values) => {
        const errors = {};

        // Validate if data is entered for the vehicle number prefix
        if (!values.vnumberPrefix.trim()) {
            errors.vnumberPrefix = "Vehicle number prefix is required";
        }

        // Validate if data is entered for the vehicle number suffix
        if (!values.vnumberSuffix.trim()) {
            errors.vnumberSuffix = "Vehicle number suffix is required";
        }

        return errors;
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const errors = validatePrefixSuffix(values);

            // Check if there are errors related to prefix and suffix
            if (Object.keys(errors).length > 0) {
                toast.error("Please fill in the vehicle number prefix and suffix.");
                return;
            }

            // Concatenate the prefix and suffix to get the complete vehicle number
            const vnumber = (values.vnumberPrefix + values.vnumberSuffix).toUpperCase();

            // Remove vnumberPrefix and vnumberSuffix from the values object
            const { vnumberPrefix, vnumberSuffix, ...formData } = values;

            const res = await fetch('http://localhost:4000/api/vehicles', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ ...formData, vnumber }), // Include only the concatenated vehicle number in the request
            });

            const result = await res.json();
            if (!result.error) {
                // Handle success
                toast.success(`Vehicle "${values.vehicle}" added successfully!`);
                console.log(`Created [${values.vehicle}]`);
                resetForm();
            } else {
                // Handle error
                console.error(result.error);
                toast.error(`Failed to add vehicle: ${result.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`An error occurred: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2>Add Vehicles</h2>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Formik
                initialValues={vehicleDetails}
                validate={(values) => {
                    const errors = {};

                    // Validate if data is entered
                    Object.keys(values).forEach(key => {
                        // Check if the value is a string and not empty
                        if (typeof values[key] === 'string' && !values[key].trim()) {
                            errors[key] = `${key} is required`;
                        }
                    });

                    // Validate prefix and suffix
                    Object.assign(errors, validatePrefixSuffix(values));

                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <Form onSubmit={handleSubmit}>
                        {/* Vehicle Type */}
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="vehicle"
                                value={values.vehicle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.vehicle && !!errors.vehicle}
                            >
                                <option value="">- Select Vehicle -</option>
                                <option value="van">Van</option>
                                <option value="car">Car</option>
                                <option value="truck">Truck</option>
                                <option value="lorry">Lorry</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.vehicle}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Vehicle Number */}
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle Number</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control
                                    name="vnumberPrefix"
                                    type="text"
                                    placeholder="-AAA-/-00-"
                                    value={values.vnumberPrefix}
                                    onChange={(e) => {
                                        const newValue = e.target.value.toUpperCase();
                                        if (/^[A-Za-z]{0,3}$/.test(newValue)) {
                                            handleChange({
                                                target: {
                                                    name: "vnumberPrefix",
                                                    value: newValue.slice(0, 3)
                                                }
                                            });
                                        } else if (/^[0-9]{0,2}$/.test(newValue)) {
                                            handleChange({
                                                target: {
                                                    name: "vnumberPrefix",
                                                    value: newValue.slice(0, 2)
                                                }
                                            });
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.vnumberPrefix && !!errors.vnumberPrefix}
                                    style={{ marginRight: '5px' }}
                                    title="Please enter 2 or 3 English capital letters or 2 numbers"
                                />

                                <Form.Control
                                    name="vnumberSuffix"
                                    type="number"
                                    placeholder="-0001-"
                                    value={values.vnumberSuffix}
                                    onChange={(e) => {
                                        const newValue = e.target.value.slice(0, 4);
                                        handleChange({
                                            target: {
                                                name: "vnumberSuffix",
                                                value: newValue
                                            }
                                        });
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.vnumberSuffix && !!errors.vnumberSuffix}
                                    style={{ marginLeft: '5px' }}
                                    pattern="^[0-9]{4}$"
                                    title="Please enter 4 digits"
                                />
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {errors.vnumberPrefix && errors.vnumberPrefix}
                                {errors.vnumberSuffix && errors.vnumberSuffix}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Vehicle Model */}
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle Model</Form.Label>
                            <Form.Control
                                name="model"
                                type="text"
                                placeholder="Enter Vehicle Model"
                                value={values.model}
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/[^A-Za-z\s]/g, '');
                                    handleChange({
                                        target: {
                                            name: "model",
                                            value: newValue
                                        }
                                    });
                                }}
                                onBlur={handleBlur}
                                isInvalid={touched.model && !!errors.model}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.model}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Vehicle Status */}
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.status && !!errors.status}
                            >
                                <option value="">-Select Status-</option>
                                <option value="good">Good</option>
                                <option value="bad">Bad</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.status}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Last Inspection */}
                        <Form.Group className="mb-3">
                            <Form.Label>Last Inspection</Form.Label>
                            <Form.Control
                                name="last_inspection"
                                type="date"
                                value={values.last_inspection}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.last_inspection && !!errors.last_inspection}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.last_inspection}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Next Inspection */}
                        <Form.Group className="mb-3">
                            <Form.Label>Next Inspection</Form.Label>
                            <Form.Control
                                name="next_inspection"
                                type="date"
                                value={values.next_inspection}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.next_inspection && !!errors.next_inspection}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.next_inspection}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting' : 'Add Vehicle'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateTransport;
