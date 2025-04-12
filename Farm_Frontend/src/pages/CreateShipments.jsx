import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import ToastContext from "../context/ToastContext";

const CreateShipments = () => {
    const { toast } = useContext(ToastContext); // Use useContext to access the toast function

    const [shipDetails, setShipDetails] = useState({
        routePrefix: "",
        routeSuffix: "",
        supplier: "",
        date: "",
        vehicle: "",
        max_distance: "",
        speed_limit: "",
        arrival: "",
        driver: "",
        note: "",
    });

    const validatePrefixSuffix = (values) => {
        const errors = {};

        // Validate if data is entered for the vehicle number prefix
        if (!values.routePrefix.trim()) {
            errors.routePrefix = "Route prefix is required";
        }

        // Validate if data is entered for the vehicle number suffix
        if (!values.routeSuffix.trim()) {
            errors.routeSuffix = "route suffix is required";
        }

        return errors;
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const errors = validatePrefixSuffix(values);

            // Check if there are errors related to prefix and suffix
            if (Object.keys(errors).length > 0) {
                console.log("Please fill in the route prefix and suffix.");
                return;
            }

            // Ensure speed_limit is sent as a string
            values.speed_limit = values.speed_limit.toString();

            // Concatenate the prefix and suffix to get the complete route
            const route = `${values.routePrefix}-${values.routeSuffix}`;

            // Remove routePrefix and routeSuffix from the values object
            const { routePrefix, routeSuffix, ...formData } = values;

            const requestBody = { ...formData, route }; // Include the concatenated route in the request body

            const res = await fetch('http://localhost:4000/api/shipments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(requestBody),
            });

            const result = await res.json();
            if (!result.error) {
                // Handle success
                toast.success(`Shipment added successfully!`);
                console.log(`Created [${route}]`);
                resetForm();
            } else {
                // Handle error
                console.error(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2>Add Shipment</h2>
            <ToastContainer
                position="bottom-right" // Set position to bottom right
                autoClose={5000} // Auto close toast after 5 seconds
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Formik
                initialValues={shipDetails}
                validate={values => {
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
         <Form.Group className="mb-3">
                            <Form.Label>Route</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control
                                    name="routePrefix"
                                    type="text"
                                    placeholder="FROM"
                                    value={values.routePrefix}
                                    onChange={(e) => {
                                        let newValue = e.target.value.replace(/[^A-Za-z]/g, '');
                                        newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
                                        handleChange({
                                            target: {
                                                name: "routePrefix",
                                                value: newValue
                                            }
                                        });
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.routePrefix && !!errors.routePrefix}
                                    style={{ marginRight: '5px' }}
                                    title="Please enter in one word starting with a capital letter"
                                />
                                <Form.Control
                                    name="routeSuffix"
                                    type="text"
                                    placeholder="TO"
                                    value={values.routeSuffix}
                                    onChange={(e) => {
                                        let newValue = e.target.value.replace(/[^A-Za-z]/g, '');
                                        newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
                                        handleChange({
                                            target: {
                                                name: "routeSuffix",
                                                value: newValue
                                            }
                                        });
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.routeSuffix && !!errors.routeSuffix}
                                    style={{ marginLeft: '5px' }}
                                    title="Please enter in one word"
                                />
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {errors.routePrefix && errors.routePrefix}
                                {errors.routeSuffix && errors.routeSuffix}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control
                                name="supplier"
                                type="text"
                                placeholder="Enter Supplier"
                                value={values.supplier}
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/[^A-Za-z\s]/g, '');
                                    handleChange({
                                        target: {
                                            name: "supplier",
                                            value: newValue
                                        }
                                    });
                                }}
                                onBlur={handleBlur}
                                isInvalid={touched.supplier && !!errors.supplier}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.supplier}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                name="date"
                                type="date"
                                value={values.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.date && !!errors.date}
                                min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                        </Form.Group>

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

                        <Form.Group className="mb-3">
                            <Form.Label>Max Distance (km)</Form.Label>
                            <Form.Control
                                name="max_distance"
                                type="number"
                                placeholder="Enter Max Distance"
                                value={values.max_distance}
                                onChange={(e) => {
                                    const newValue = e.target.value.slice(0, 4);
                                    handleChange({
                                        target: {
                                            name: "max_distance",
                                            value: newValue
                                        }
                                    });
                                }}
                                onBlur={handleBlur}
                                isInvalid={touched.max_distance && !!errors.max_distance}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.max_distance}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Speed Limit (km/h)</Form.Label>
                            <Form.Control
                                name="speed_limit"
                                type="number"
                                placeholder="Enter Speed Limit"
                                value={values.speed_limit}
                                onChange={(e) => {
                                    let newValue = parseInt(e.target.value, 10);
                                    newValue = Math.min(Math.max(0, newValue), 100);
                                    handleChange({
                                        target: {
                                            name: "speed_limit",
                                            value: newValue
                                        }
                                    });
                                }}
                                onBlur={handleBlur}
                                isInvalid={touched.speed_limit && !!errors.speed_limit}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.speed_limit}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Arrival</Form.Label>
                            <Form.Control
                                name="arrival"
                                type="date"
                                value={values.arrival}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.arrival && !!errors.arrival}
                                min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.arrival}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Driver</Form.Label>
                            <Form.Control
                                name="driver"
                                type="text"
                                placeholder="Enter Driver"
                                value={values.driver}
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/[^A-Za-z\s]/g, '');
                                    handleChange({
                                        target: {
                                            name: "driver",
                                            value: newValue
                                        }
                                    });
                                }}
                                onBlur={handleBlur}
                                isInvalid={touched.driver && !!errors.driver}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.driver}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Note</Form.Label>
                            <Form.Control
                                name="note"
                                type="text"
                                placeholder="Enter Note"
                                value={values.note}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.note && !!errors.note}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.note}
                            </Form.Control.Feedback>
                        </Form.Group>                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting' : 'Add Shipment'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateShipments;



































