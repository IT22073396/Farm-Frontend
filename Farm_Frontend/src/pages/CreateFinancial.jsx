import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreateFinancial = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [financialDetails, setFinancialDetails] = useState({
    id: "",
    dduration: "",
    tsale: "",
    tcost: "",
    cofPsales: ""
  });

  const validationSchema = Yup.object().shape({
    id: Yup.string().required('ID is required'),
    dduration: Yup.number().required('Day Duration is required'),
    tsale: Yup.number().required('Total Revenue is required'),
    tcost: Yup.number().required('Total Expenses is required'),
    cofPsales: Yup.number().required('Net Profit is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const res = await fetch('http://localhost:4000/api/financials', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(values),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`Created [${values.id}]`);
      resetForm();
    } else {
      toast.error(result.error);
    }
    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <h3 className="text-center mb-4">Add Financial Report Details</h3>
      <Formik
        initialValues={financialDetails}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                id="id"
                name="id"
                type="text"
                placeholder="Enter Financial ID"
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.id && !!formik.errors.id}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.id}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Day Duration</Form.Label>
              <Form.Control
                id="dduration"
                name="dduration"
                type="number"
                placeholder="Enter Day Duration"
                value={formik.values.dduration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.dduration && !!formik.errors.dduration}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.dduration}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Revenue (LKR)</Form.Label>
              <Form.Control
                id="tsale"
                name="tsale"
                type="number"
                placeholder="Enter Total Revenue"
                value={formik.values.tsale}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.tsale && !!formik.errors.tsale}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.tsale}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Expenses (LKR)</Form.Label>
              <Form.Control
                id="tcost"
                name="tcost"
                type="number"
                placeholder="Enter Total Expenses"
                value={formik.values.tcost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.tcost && !!formik.errors.tcost}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.tcost}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Net Profit (LKR)</Form.Label>
              <Form.Control
                id="cofPsales"
                name="cofPsales"
                type="number"
                placeholder="Enter Net Profit"
                value={formik.values.cofPsales}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.cofPsales && !!formik.errors.cofPsales}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.cofPsales}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button id="btn" name="submit" variant="primary" type="submit" disabled={formik.isSubmitting}>
                Add Financial Report Details
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateFinancial;
