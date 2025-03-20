import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";


const ResetPasswordForm = ({onSubmitHandler}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitHandler(email);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Reset Password
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
