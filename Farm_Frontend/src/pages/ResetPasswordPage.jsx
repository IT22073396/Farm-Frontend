import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import ResetPasswordForm from "./ResetPasswordForm";


const ResetPasswordPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (email) => {
    try {
      // Send reset password request to the backend
      const response = await fetch("http://localhost:4000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage("Password reset instructions sent to your email.");
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
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <ResetPasswordForm onSubmitHandler={handleResetPassword} />
    </Container>
  );
};

export default ResetPasswordPage;
