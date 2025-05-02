import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditFinancial = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [financialDetails, setFinancialDetails] = useState({
    id: "",
    dduration: "",
    tsale: "",
    tcost: "",
    cofPsales: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFinancialDetails({ ...financialDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:4000/api/financials/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...financialDetails }),
    });

    const result = await res.json();

    if (!result.error) {
      toast.success(`Updated [${financialDetails.id}]`);
      setFinancialDetails({
        id: "",
        dduration: "",
        tsale: "",
        tcost: "",
        cofPsales: ""
      });
      navigate("/allfinancials");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    async function fetchFinancial() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/financials/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();

        setFinancialDetails({
          id: result.id,
          dduration: result.dduration,
          tsale: result.tsale,
          tcost: result.tcost,
          cofPsales: result.cofPsales,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchFinancial();
  }, []);

  const containerStyle = {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
  };

  const headingStyle = {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "30px",
    fontWeight: "600",
    color: "#333"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    border: "none"
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spinner animation="border" role="status" />
          <div>Loading Financials...</div>
        </div>
      ) : (
        <div style={containerStyle}>
          <h2 style={headingStyle}>Edit Financial Report Details</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                id="id"
                name="id"
                type="text"
                placeholder="Enter Financial ID"
                value={financialDetails.id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dduration">
              <Form.Label>Day Duration</Form.Label>
              <Form.Control
                id="dduration"
                name="dduration"
                type="number"
                placeholder="Enter Day Duration"
                value={financialDetails.dduration}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tsale">
              <Form.Label>Total Revenue (LKR)</Form.Label>
              <Form.Control
                id="tsale"
                name="tsale"
                type="number"
                placeholder="Enter Total Revenue"
                value={financialDetails.tsale}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tcost">
              <Form.Label>Total Expenses (LKR)</Form.Label>
              <Form.Control
                id="tcost"
                name="tcost"
                type="number"
                placeholder="Enter Total Expenses"
                value={financialDetails.tcost}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cofPsales">
              <Form.Label>Net Profit (LKR)</Form.Label>
              <Form.Control
                id="cofPsales"
                name="cofPsales"
                type="number"
                placeholder="Enter Net Profit"
                value={financialDetails.cofPsales}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={buttonStyle}>
              Confirm Changes
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditFinancial;
