import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreateFinancial = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);
    const navigate = useNavigate();

    const [financialDetails, setFinancialDetails] = useState({
        id:"",
        dduration:"",
        tsale:"",
        tcost:"",
        cofPsales:""
    });

    const validationSchema = Yup.object().shape({
        id: Yup.string().required('ID is required'),
        dduration: Yup.number().required('Day Duration is required'),
        tsale: Yup.number().required('Total Sales is required'),
        tcost: Yup.number().required('Total Cost is required'),
        cofPsales: Yup.number().required('Count of Product Sales is required'),
    });

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFinancialDetails({...financialDetails, [name]: value});
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const res = await fetch('http://localhost:4000/api/financials',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(values),
        });

        const result = await res.json();
        if(!result.error){
            toast.success(`Created [${values.name}]`);
            resetForm();
        } else {
            toast.error(result.error);
        }
        setSubmitting(false);
    }

    return(
        <>
            <h2>Add Financial Report Details</h2>
            <Formik
                initialValues={financialDetails}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control id="id" name="id" type="text" 
                                placeholder="Enter Financial ID"  value={formik.values.id} onChange={formik.handleChange} onBlur={formik.handleBlur}  required/>
                            <ErrorMessage name="id" component="div" className="error" />
                        </Form.Group>
                    
                        <Form.Group className="mb-3">
                            <Form.Label>Day Duration</Form.Label>
                            <Form.Control id="dduration" name="dduration" type="number" 
                                placeholder="Enter Day Duration"  value={formik.values.dduration} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                            <ErrorMessage name="dduration" component="div" className="error" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="tsale">
                            <Form.Label>Total Sales(USD)</Form.Label>
                            <Form.Control id="tsale" name="tsale" type="number" 
                                placeholder="Enter Total Sales" value={formik.values.tsale} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                            <ErrorMessage name="tsale" component="div" className="error" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="tcost">
                            <Form.Label>Total Cost(USD)</Form.Label>
                            <Form.Control id="tcost" name="tcost" type="number" 
                                placeholder="Enter Total Cost" value={formik.values.tcost} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                            <ErrorMessage name="tcost" component="div" className="error" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cofPsales">
                            <Form.Label>Count of Product Sales</Form.Label>
                            <Form.Control id="cofPsales" name="cofPsales" type="number" 
                                placeholder="Enter Count of Product Sales" value={formik.values.cofPsales} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                            <ErrorMessage name="cofPsales" component="div" className="error" />
                        </Form.Group>

                        <Button id="btn" name="submit" variant="primary" type="submit" disabled={formik.isSubmitting}>
                            Add Financial Report Details
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateFinancial;
