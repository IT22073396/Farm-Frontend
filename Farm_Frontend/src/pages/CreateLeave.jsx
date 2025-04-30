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
  const navigate = useNavigate();

  const [leaveDetails, setLeaveDetails] = useState({
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    leaveType: "",
    leaveTypeDetails: "",
    createdOn: "",
    leaveTypeStatus: "pending",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLeaveDetails({ ...leaveDetails, [name]: value });
  };

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
        id: localStorage.getItem("id"),
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        leaveType: "",
        leaveTypeDetails: "",
        createdOn: "",
        leaveTypeStatus: "pending",
      });
    } else {
      toast.error(result.error);
    }
  };

  const validateLeaveType = (value) => {
    let error;
    if (!value.trim()) {
      error = "Leave Type is required";
    }
    return error;
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <h3 className="text-center mb-4">Add Leave</h3>

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

        <Form.Group className="mb-4" controlId="leaveTypeStatus">
          <Form.Label>Leave Status</Form.Label>
          <Form.Control
            name="leaveTypeStatus"
            type="text"
            placeholder="Leave Status"
            value={leaveDetails.leaveTypeStatus}
            readOnly
          />
        </Form.Group>

        <div className="d-grid">
          <Button id="btn" name="submit" variant="primary" type="submit">
            Add Leave
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateLeave;
