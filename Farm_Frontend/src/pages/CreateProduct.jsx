import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import ToastContext from "../context/ToastContext";

const CreateProduct = () => {
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const initialValues = {
        name: "",
        productId: "",
        quantity: 0,
        price: "",
        description: "",
        image: null
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Product Name is required"),
        productId: Yup.string().required("Product ID is required"),
        quantity: Yup.number().required("Quantity is required").min(0, "Quantity cannot be negative"),
        price: Yup.number().required("Price is required").min(0, "Price cannot be negative"),
        description: Yup.string().required("Description is required"),
        image: Yup.mixed().required("Image is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('productId', values.productId);
        formData.append('quantity', values.quantity);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('image', values.image);

        try {
            const res = await fetch('http://localhost:4000/api/products', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData
            });

            const result = await res.json();
            if (!result.error) {
                toast.success(`Created [${values.name}]`);
                // Reset form values
                setSubmitting(false);
            } else {
                toast.error(result.error);
                setSubmitting(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to create product");
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2>Add Products</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name">Product Name</label>
                            <Field name="name" type="text" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productId">Product ID</label>
                            <Field name="productId" type="text" className="form-control" />
                            <ErrorMessage name="productId" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity">Quantity</label>
                            <Field name="quantity" type="number" className="form-control" />
                            <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Price</label>
                            <Field name="price" type="number" className="form-control" />
                            <ErrorMessage name="price" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <Field name="description" as="textarea" rows={5} className="form-control" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image">Product Image</label>
                            <Field name="image" type="file" accept="image/*" className="form-control" />
                            <ErrorMessage name="image" component="div" className="text-danger" />
                        </div>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>Add Product</Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateProduct;
