import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditOrder = () => {
    const { id } = useParams();
    const { toast } = useContext(ToastContext);
    const [orderDetails, setOrderDetails] = useState({
        name: "",
        orderid: "",
        productid: "",
        supplierid: "",
        quantity: "",
        sku: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/api/orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ id, ...orderDetails }),
            });
            const result = await res.json();
            if (!result.error) {
                toast.success(`Updated [${orderDetails.name}]`);
                setOrderDetails({
                    name: "",
                    orderid: "",
                    productid: "",
                    supplierid: "",
                    quantity: "",
                    sku: ""
                });
                navigate("/suporders");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.error("Error while submitting:", error);
            toast.error("An error occurred while submitting the form.");
        }
    }

    useEffect(() => {
        async function fetchOrder() {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:4000/api/orders/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                setOrderDetails({
                    name: result.name,
                    orderid: result.orderid,
                    productid: result.productid,
                    supplierid: result.supplierid,
                    quantity: result.quantity,
                    sku: result.sku
                });
                setLoading(false);
            } catch (err) {
                console.error("Error while fetching order:", err);
                setLoading(false);
                toast.error("An error occurred while fetching the order details.");
            }
        }
        fetchOrder();
    }, [id, toast]);

    return (
        <>
            {loading ? <Spinner splash="Loading Orders..." /> : (
                <>
                    <h2>Edit Orders</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Name</Form.Label>
                            <Form.Control id="name" name="name" type="text"
                                placeholder="Enter Order Name" value={orderDetails.name} onChange={handleInputChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Order ID</Form.Label>
                            <Form.Control id="orderid" name="orderid" type="text"
                                placeholder="Enter Order ID" value={orderDetails.orderid} onChange={handleInputChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control id="productid" name="productid" type="text"
                                placeholder="Enter Product ID" value={orderDetails.productid} onChange={handleInputChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Supplier ID</Form.Label>
                            <Form.Control id="supplierid" name="supplierid" type="text"
                                placeholder="Enter Supplier ID" value={orderDetails.supplierid} onChange={handleInputChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control id="quantity" name="quantity" type="text"
                                placeholder="Enter Quantity" value={orderDetails.quantity} onChange={handleInputChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>SKU</Form.Label>
                            <Form.Control id="sku" name="sku" type="text"
                                placeholder="Enter SKU" value={orderDetails.sku} onChange={handleInputChange} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </>
            )}
        </>
    );
};

export default EditOrder;
