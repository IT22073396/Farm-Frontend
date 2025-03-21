import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ToastContext from "../context/ToastContext";

const Suppliermail = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [email, setEmail] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const { toast } = useContext(ToastContext);

    // Fetch the list of suppliers from the API when the component mounts
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/suppliers");
                console.log(response.data);
                setSuppliers(response.data.suppliers);
            } catch (error) {
                console.error("Error fetching suppliers", error);
                toast.error("Error fetching suppliers. Please try again.");
            }
        };

        fetchSuppliers();
    }, [toast]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/api/suppliermail/sendemail",
                { email, itemName, quantity }
            );
            console.log(response.data);

            // Show success toast message
            toast.success("Email sent successfully!");

            // Clear form fields after submission
            setEmail("");
            setItemName("");
            setQuantity("");
        } catch (error) {
            console.error("Error sending email", error);
            toast.error("Error sending email. Please try again.");
        }
    };

    return (
        <>
            <h2>Contact Supplier</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Supplier Email</Form.Label>
                    <Form.Select
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    >
                        <option value="">Select supplier email</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier._id} value={supplier.email}>
                                {supplier.email}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                        name="itemName"
                        type="text"
                        placeholder="Enter Product"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        name="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Send Email
                </Button>
            </Form>
        </>
    );
};

export default Suppliermail;