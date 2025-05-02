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
    cow_id: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Only letters are allowed for Cow_Id').required('Cow_ID is required'),
    tag_number: Yup.string().matches(/^[a-zA-Z0-9\s\W]*$/, 'Only letters, numbers, and symbols are allowed for tag_number').required('Tag_Numberis required'),
    breed: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Only letters are allowed for Breed').required('breed is required'),
    date_of_birth: Yup.date().required('DOB is required'),
    gender: Yup.string().required('Gender is required'),
    
});

const EditCows = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);

    const [cowDetails, setCowDetails] = useState({
      cow_id: "",
      tag_number: "",
      breed: "",
      date_of_birth: "",
      gender: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await fetch(`http://localhost:4000/api/cows/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(values),
            });

            const result = await res.json();
            if (!result.error) {
                toast.success(`Updated [${values.cow_id}]`);
                navigate("/allcows");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while updating cows");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        async function fetchCows() {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:4000/api/cows/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();

                setCowDetails({
                    cow_id: result.cow_id,
                    tag_number: result.tag_number,
                    breed: result.breed,
                    date_of_birth: result.date_of_birth,
                    gender: result.gender,
                    
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchCows();
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
                    <h2>Edit Cows</h2>
                    <Formik
                        enableReinitialize
                        initialValues={cowDetails}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {formik => (
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cow ID</Form.Label>
                                    <Field 
                                        name="cow_id" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[a-zA-Z\s]*$/)} 
                                    />
                                    <ErrorMessage name="cow_id" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tag Number</Form.Label>
                                    <Field 
                                        name="tag_number" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[a-zA-Z0-9\s\W]*$/)} 
                                    />
                                    <ErrorMessage name="tag_number" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Breed</Form.Label>
                                    <Field 
                                        name="breed" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[a-zA-Z\s]*$/)} 
                                    />
                                    <ErrorMessage name="breed" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Field 
                                        name="date_of_birth" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[0-9.]*$/)} 
                                    />
                                    <ErrorMessage name="date_of_birth" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Gender</Form.Label>
                                    <Field 
                                        name="gender" 
                                        type="text" 
                                        className="form-control" 
                                        onKeyPress={(event) => handleKeyPress(event, /^[0-9]*$/)} 
                                    />
                                    <ErrorMessage name="gender" component="div" className="text-danger" />
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

export default EditCows;
