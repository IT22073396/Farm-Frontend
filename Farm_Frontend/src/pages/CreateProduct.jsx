import { useContext, useRef } from "react";
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
    const fileInputRef = useRef(null);

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
        quantity: Yup.number()
            .required("Quantity is required")
            .min(0, "Quantity cannot be negative")
            .integer("Quantity must be a whole number"),
        price: Yup.number()
            .required("Price is required")
            .min(0, "Price cannot be negative"),
        description: Yup.string().required("Description is required"),
        image: Yup.mixed()
            .required("Image is required")
            .test("fileSize", "File too large (max 5MB)", (value) => {
                if (!value) return true;
                return value.size <= 5 * 1024 * 1024; // 5MB
            })
            .test("fileType", "Unsupported file format", (value) => {
                if (!value) return true;
                return ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(value.type);
            })
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('productId', values.productId);
        formData.append('quantity', values.quantity);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('image', values.image); // File should be appended like this

        try {
            const res = await fetch('http://localhost:4000/api/products', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    // Don't set Content-Type manually, browser handles it for FormData
                },
                body: formData
            });

            const result = await res.json();
            
            if (!res.ok) {
                throw new Error(result.error || "Failed to create product");
            }

            toast.success(`Product "${values.name}" created successfully!`);
            resetForm();
            navigate("/allproducts"); // Redirect after success
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Product</h2>
            
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting, values }) => (
                    <Form encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <Field 
                                name="name" 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter product name" 
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="productId" className="form-label">Product ID</label>
                            <Field 
                                name="productId" 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter product ID" 
                            />
                            <ErrorMessage name="productId" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <Field 
                                name="quantity" 
                                type="number" 
                                className="form-control" 
                                placeholder="Enter quantity" 
                            />
                            <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field 
                                name="price" 
                                type="number" 
                                step="0.01"
                                className="form-control" 
                                placeholder="Enter price" 
                            />
                            <ErrorMessage name="price" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Field 
                                name="description" 
                                as="textarea" 
                                rows={5} 
                                className="form-control" 
                                placeholder="Enter product description" 
                            />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Product Image</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="form-control"
                                ref={fileInputRef}
                                onChange={(event) => {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                }}
                            />
                            {values.image && (
                                <div className="mt-2">
                                    <small>Selected: {values.image.name}</small>
                                </div>
                            )}
                            <ErrorMessage name="image" component="div" className="text-danger" />
                        </div>

                        <div className="d-grid gap-2">
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating..." : "Create Product"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateProduct;
