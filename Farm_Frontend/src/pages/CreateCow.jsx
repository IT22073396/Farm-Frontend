import { useContext } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToastContext from "../context/ToastContext";

const validationSchema = Yup.object().shape({
    cow_id: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Only letters are allowed for Cow_Id').required('Cow_ID is required'),
    tag_number: Yup.string().matches(/^[a-zA-Z0-9\s\W]*$/, 'Only letters, numbers, and symbols are allowed for tag_number').required('Tag_Number is required'),
    breed: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Only letters are allowed for Breed').required('Breed is required'),
    date_of_birth: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
});

const CreateCow = () => {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const initialValues = {
        cow_id: "",
        tag_number: "",
        breed: "",
        date_of_birth: "",
        gender: ""
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await fetch('http://localhost:4000/api/cows', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(values),
            });

            const result = await res.json();
            if (!result.error) {
                toast.success(`Created [${values.cow_id}]`);
                resetForm();
                navigate("/all-cows");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while creating cow");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2>Add Cows</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Cow Id</Form.Label>
                            <Field 
                                name="cow_id" 
                                type="text" 
                                className="form-control" 
                            />
                            <ErrorMessage name="cow_id" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tag Number</Form.Label>
                            <Field 
                                name="tag_number" 
                                type="text" 
                                className="form-control" 
                            />
                            <ErrorMessage name="tag_number" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Breed</Form.Label>
                            <Field 
                                name="breed" 
                                type="text" 
                                className="form-control" 
                            />
                            <ErrorMessage name="breed" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Field 
                                name="date_of_birth" 
                                type="date" 
                                className="form-control" 
                            />
                            <ErrorMessage name="date_of_birth" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Field 
                                name="gender" 
                                as="select" 
                                className="form-control"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="text-danger" />
                        </Form.Group>
                        
                        <Button id="btn" name="submit" variant="primary" type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                            Add Cow
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateCow;
