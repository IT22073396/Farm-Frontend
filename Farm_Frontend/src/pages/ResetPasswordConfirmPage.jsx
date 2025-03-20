import React, { useState } from "react";
import { Alert, Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ResetPasswordConfirmPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  let { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token not found");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <Container>
      <h1>Reset Password</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Password updated successfully</Alert>}
    </Container>
  );
};

export default ResetPasswordConfirmPage;
