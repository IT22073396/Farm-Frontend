import React, { useContext, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreatePayslip = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const email = queryParams.get("email");
    const { toast } = useContext(ToastContext);
    const [payslipDetails, setPayslipDetails] = useState({
        id: id,
        email: email,
        name: name,
        date: "",
        allowances: "",
        deductions: "",
        otherAllowances: "",
        otherDeductions: "",
        basic: "20000",
        totalAllowance: "",
        totalDeduction: "",
        netSalary: "",
        paymentMethod: ""
    });
    const [errors, setErrors] = useState({
        allowances: "",
        deductions: "",
        otherAllowances: "",
        otherDeductions: "",
        paymentMethod: ""
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (value < 0) {
            setPayslipDetails({ ...payslipDetails, [name]: 0 });
            toast.error("Negative numbers are not allowed");
            return;
        }
        setPayslipDetails({ ...payslipDetails, [name]: value });
        validateField(name, value);
    }

    const validateField = (name, value) => {
        switch (name) {
            case 'allowances':
            case 'deductions':
            case 'otherAllowances':
            case 'otherDeductions':
                if (!value) {
                    setErrors(prevErrors => ({ ...prevErrors, [name]: "This field is required" }));
                } else if (isNaN(value)) {
                    setErrors(prevErrors => ({ ...prevErrors, [name]: "Please enter a valid number" }));
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
                }
                break;
            case 'paymentMethod':
                if (!value) {
                    setErrors(prevErrors => ({ ...prevErrors, [name]: "This field is required" }));
                } else if (!/^[A-Za-z]+$/.test(value)) {
                    setErrors(prevErrors => ({ ...prevErrors, [name]: "Please enter only letters" }));
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
                }
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.values(errors).some(error => error !== "")) {
            toast.error("Please fix all validation errors before submitting.");
            return;
        }

        // Check if there is already a payslip for the same month
        const existingPayslip = await fetch(`http://localhost:4000/api/payslips/check/${payslipDetails.date}/${payslipDetails.email}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const existingPayslipResult = await existingPayslip.json();

        if (existingPayslipResult.exists) {
            toast.error(`A payslip already exists for the month of ${payslipDetails.date}. Please select a different month.`);
            return;
        }

        const { allowances, deductions, otherAllowances, otherDeductions } = payslipDetails;
        const totalAllowance = parseFloat(allowances) + parseFloat(otherAllowances);
        const totalDeduction = parseFloat(deductions) + parseFloat(otherDeductions);
        const netSalary = parseFloat(payslipDetails.basic) + totalAllowance - totalDeduction;
        const validNetSalary = isNaN(netSalary) ? null : netSalary;
        setPayslipDetails({ ...payslipDetails, totalAllowance, totalDeduction, netSalary: validNetSalary });

        try {
            const res = await fetch('http://localhost:4000/api/payslips', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ email: queryParams.get("email"), ...payslipDetails, totalAllowance, totalDeduction, netSalary: validNetSalary }),
            });

            const result = await res.json();
            if (!result.error) {
                toast.success(`Created [${payslipDetails.name}]`);
                setPayslipDetails({
                    id: id, name: name, date: "", allowances: "", deductions: "",
                    otherAllowances: "", otherDeductions: "", basic: "",
                    totalAllowance: "", totalDeduction: "", netSalary: "", paymentMethod: ""
                });
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.error("Error", error);
            toast.error("An error occurred while creating payslip");
        }
    }

    return (
        <>
            <h2>Create Payslip</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Employee name</Form.Label>
                    <Form.Control id="name" name="name" type="text"
                        placeholder="Enter Employee name" value={payslipDetails.name} onChange={handleInputChange} required disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control id="date" name="date" type="date"
                        placeholder="Enter date" value={payslipDetails.date} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="allowances">
                    <Form.Label>Employee allowances</Form.Label>
                    <Form.Control id="allowances" name="allowances" type="number"
                        placeholder="Enter Employee allowances" value={payslipDetails.allowances} onChange={handleInputChange} required />
                    {errors.allowances && <span style={{ color: 'red' }}>{errors.allowances}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="deductions">
                    <Form.Label>Employee deductions</Form.Label>
                    <Form.Control id="deductions" name="deductions" type="number"
                        placeholder="Enter Employee deductions" value={payslipDetails.deductions} onChange={handleInputChange} required />
                    {errors.deductions && <span style={{ color: 'red' }}>{errors.deductions}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="otherAllowances">
                    <Form.Label>Employee otherAllowances</Form.Label>
                    <Form.Control id="otherAllowances" name="otherAllowances" type="number"
                        placeholder="Enter otherAllowances" value={payslipDetails.otherAllowances} onChange={handleInputChange} required />
                    {errors.otherAllowances && <span style={{ color: 'red' }}>{errors.otherAllowances}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="otherDeductions">
                    <Form.Label>Employee otherDeductions</Form.Label>
                    <Form.Control id="otherDeductions" name="otherDeductions" type="number"
                        placeholder="Enter otherDeductions" value={payslipDetails.otherDeductions} onChange={handleInputChange} required />
                    {errors.otherDeductions && <span style={{ color: 'red' }}>{errors.otherDeductions}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="basic">
                    <Form.Label>Employee basic</Form.Label>
                    <Form.Control id="basic" name="basic" type="number"
                        placeholder="Enter basic" value={payslipDetails.basic} onChange={handleInputChange} required readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="paymentMethod">
                    <Form.Label>Employee paymentMethod</Form.Label>
                    <Form.Control id="paymentMethod" name="paymentMethod" type="text"
                        placeholder="Enter paymentMethod" value={payslipDetails.paymentMethod} onChange={handleInputChange} required />
                    {errors.paymentMethod && <span style={{ color: 'red' }}>{errors.paymentMethod}</span>}
                </Form.Group>
                <Button id="btn" name="submit" variant="primary" type="submit">
                    Create Payslip
                </Button>
            </Form>
        </>
    );
};

export default CreatePayslip;
