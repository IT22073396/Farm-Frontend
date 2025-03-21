import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";


const ContactPayment = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  // Define the initial state with the new details
  const [paymentDetails, setPaymentDetails] = useState({
    supplierBankDetails: "",
    amount: "",
    deadlineDate: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:4000/api/paymentmailsupp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(paymentDetails),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success("Payment details sent successfully");
      setPaymentDetails({
        supplierBankDetails: "",
        amount: "",
        deadlineDate: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <h2>Contact Payment Manager</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Supplier Bank Details</Form.Label>
          <Form.Control
            name="supplierBankDetails"
            type="text"
            placeholder="Enter supplier bank details"
            value={paymentDetails.supplierBankDetails}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={paymentDetails.amount}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deadline Date</Form.Label>
          <Form.Control
            name="deadlineDate"
            type="date"
            value={paymentDetails.deadlineDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send payment details
        </Button>
      </Form>
    </>
  );
};

export default ContactPayment;