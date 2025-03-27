import { useContext, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateLeave = () => {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);

    const [leaveDetails, setLeaveDetails] = useState({
        id: localStorage.getItem("id"),
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        leaveType: "",
        leaveTypeDetails: "",
        createdOn: "",
        leaveTypeStatus: "pending",
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setLeaveDetails({ ...leaveDetails, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/leaves`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(leaveDetails),

        });

        const result = await res.json();
        if (!result.error) {

            toast.success(`Created [${leaveDetails.leaveType}]`);

            setLeaveDetails({
                name: localStorage.getItem("name"), email: localStorage.getItem("email"), leaveType: "", leaveTypeDetails: "",
                createdOn: "", leaveTypeStatus: "pending"
            });
        } else {

            toast.error(result.error);

        }
    }

    const validateLeaveType = (value) => {
        let error;
        if (!value.trim()) {
            error = "Leave Type is required";
        }
        return error;
    }

    return (
        <>
            <h2>Add Leave</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="leaveType">
                    <Form.Label>Leave Type</Form.Label>
                    <Form.Control
                        name="leaveType"
                        type="text"
                        placeholder="Enter Leave Type"
                        value={leaveDetails.leaveType}
                        onChange={handleInputChange}
                        required
                        isInvalid={!!validateLeaveType(leaveDetails.leaveType)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validateLeaveType(leaveDetails.leaveType)}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="leaveTypeDetails">
                    <Form.Label>Leave Type Details</Form.Label>
                    <Form.Control
                        name="leaveTypeDetails"
                        as="textarea"
                        rows={5}
                        placeholder="Enter Leave Type Details"
                        value={leaveDetails.leaveTypeDetails}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="createdOn">
                    <Form.Label>Created On</Form.Label>
                    <Form.Control
                        name="createdOn"
                        type="date"
                        placeholder="Created On"
                        value={leaveDetails.createdOn}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="leaveTypeStatus">
                    <Form.Label>Leave Status</Form.Label>
                    <Form.Control
                        name="leaveTypeStatus"
                        type="tel"
                        placeholder="Leave Status"
                        value={leaveDetails.leaveTypeStatus}
                        onChange={handleInputChange}
                        required readOnly
                    />
                </Form.Group>
                <Button id="btn" name="submit" variant="primary" type="submit">
                    Add Leave
                </Button>
            </Form>
        </>
    );
};

export default CreateLeave;
