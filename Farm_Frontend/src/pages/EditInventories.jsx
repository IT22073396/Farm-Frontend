import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const validationSchema = Yup.object().shape({
    productname: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Only letters are allowed for Product Name').required('Product Name is required'),
    sku: Yup.string().matches(/^[a-zA-Z0-9\s\W]*$/, 'Only letters, numbers, and symbols are allowed for SKU').required('Product SKU is required'),
    quantity: Yup.number().typeError('Quantity must be a number').required('Product Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
    unitprice: Yup.number().typeError('Unit Price must be a number').required('Unit Price is required').positive('Price must be positive'),
    itemno: Yup.number().typeError('Item Number must be a number').required('Item Number is required').positive('Item Number must be positive').integer('Item Number must be an integer'),
    suppliername: Yup.string().matches(/^[a-zA-Z0-9\s\W]*$/, 'Only letters, numbers, and symbols are allowed for Supplier Name').required('Supplier Name is required'),
});

const EditInventories = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);

    const [inventoryDetails, setInventoryDetails] = useState({
        productname: "",
        sku: "",
        quantity: "",
        unitprice: "",
        itemno: "",
        suppliername: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await fetch(`http://localhost:4000/api/inventories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(values),
            });

            const result = await res.json();
            if (!result.error) {
                toast.success(`Updated [${values.productname}]`);
                navigate("/allinventories");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while updating inventory");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        async function fetchInventories() {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:4000/api/inventories/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();

                setInventoryDetails({
                    productname: result.productname,
                    sku: result.sku,
                    quantity: result.quantity,
                    unitprice: result.unitprice,
                    itemno: result.itemno,
                    suppliername: result.suppliername,
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchInventories();
    }, [id]);

    // Input validation for key press event
    const handleKeyPress = (event, pattern) => {
        if (!pattern.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <>
            {loading ? <Spinner animation="border" /> : (
                <>
                    <h2>Edit Inventories</h2>
                    <Formik
                        enableReinitialize
                        initialValues={inventoryDetails}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {formik => (
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Name</Form.Label>
                                    <Field 
                                        name="productname" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[a-zA-Z\s]*$/)} 
                                    />
                                    <ErrorMessage name="productname" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product SKU</Form.Label>
                                    <Field 
                                        name="sku" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[a-zA-Z0-9\s\W]*$/)} 
                                    />
                                    <ErrorMessage name="sku" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Quantity</Form.Label>
                                    <Field 
                                        name="quantity" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[0-9]*$/)} 
                                    />
                                    <ErrorMessage name="quantity" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Enter Unit Price</Form.Label>
                                    <Field 
                                        name="unitprice" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[0-9.]*$/)} 
                                    />
                                    <ErrorMessage name="unitprice" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Enter Item Number</Form.Label>
                                    <Field 
                                        name="itemno" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[0-9]*$/)} 
                                    />
                                    <ErrorMessage name="itemno" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Enter Supplier Name</Form.Label>
                                    <Field 
                                        name="suppliername" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[a-zA-Z0-9\s\W]*$/)} 
                                    />
                                    <ErrorMessage name="suppliername" component="div" className="text-danger" />
                                </Form.Group>
                                <Button id="btn" name="submit" variant="primary" type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                                    Save Changes
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </>
            )}
        </>
    );
};

export default EditInventories;
