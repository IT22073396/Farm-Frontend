import React, { useContext, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import '../css/CreateProduct.css';

// Contexts
import { AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp"
];
const API_ENDPOINT = "http://localhost:4000/api/products";

const CreateProduct = () => {
  const { toast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

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
      .test("fileSize", "File too large (max 5MB)", (value) => 
        !value || value.size <= MAX_FILE_SIZE
      )
      .test("fileType", "Unsupported file format", (value) => 
        !value || SUPPORTED_FORMATS.includes(value.type)
      )
  });

  const handleSubmit = useCallback(async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to create product");
      }

      toast.success(`Product "${values.name}" created successfully!`);
      resetForm();
      navigate("/allproducts");
    } catch (error) {
      console.error("Product creation error:", error);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }, [toast, navigate]);

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, setFieldValue) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (SUPPORTED_FORMATS.includes(file.type)) {
        setFieldValue("image", file);
      }
    }
  };

  // Reusable Field Components
  const TextField = ({ name, label, placeholder, type = "text", ...props }) => (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        {...props}
      />
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );

  const TextAreaField = ({ name, label, placeholder, rows = 5 }) => (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        name={name}
        as="textarea"
        rows={rows}
        className="form-control textarea"
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );

  const FileUploadField = ({ setFieldValue, values }) => (
    <div className="form-group">
      <label htmlFor="image" className="form-label">
        Product Image
      </label>
      <div 
        className={`file-upload-wrapper ${isDragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, setFieldValue)}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="file-input"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFieldValue("image", e.target.files[0]);
            }
          }}
        />
        {values.image ? (
          <div className="file-upload-info">
            <span className="file-name">{values.image.name}</span>
          </div>
        ) : (
          <div className="file-upload-info">
            <div className="upload-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#3498db"/>
              </svg>
            </div>
            <span className="upload-text">Drag & drop your image here or click to browse</span>
            <span className="file-requirements">Supports: JPEG, PNG, GIF, WEBP (Max 5MB)</span>
          </div>
        )}
      </div>
      <ErrorMessage name="image" component="div" className="error-message" />
    </div>
  );

  return (
    <div className="create-product-container">
      <div className="product-form-card">
        <h2 className="form-title">Add New Product</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form encType="multipart/form-data" className="product-form">
              <TextField
                name="name"
                label="Product Name"
                placeholder="Enter product name"
              />

              <TextField
                name="productId"
                label="Product ID"
                placeholder="Enter product ID"
              />

              <div className="form-row">
                <div className="form-col">
                  <TextField
                    name="quantity"
                    label="Quantity"
                    placeholder="0"
                    type="number"
                  />
                </div>
                <div className="form-col">
                  <TextField
                    name="price"
                    label="Price ($)"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                  />
                </div>
              </div>

              <TextAreaField
                name="description"
                label="Description"
                placeholder="Enter detailed product description..."
              />

              <FileUploadField
                setFieldValue={setFieldValue}
                values={values}
              />

              <div className="form-actions">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Product"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default React.memo(CreateProduct);