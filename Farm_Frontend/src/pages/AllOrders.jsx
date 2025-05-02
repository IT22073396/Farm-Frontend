import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/mandri-logo_black-2.png";

const AllOrders = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [exporting, setExporting] = useState(false);
    const modalContentRef = useRef(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/customerorder', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if (!result.error) {
                setOrders(result);
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const exportPDF = () => {
        setExporting(true);
        const modalContent = modalContentRef.current;
        html2canvas(modalContent).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 30;
            const imgHeight = 30;
            const marginLeft = 10;
            const marginTop = 10;

            pdf.addImage(logo, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);

            pdf.setFontSize(16);
            const titleText = "Order Details";
            const titleWidth = pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const titleX = (pdf.internal.pageSize.width - titleWidth) / 2;
            const titleY = 20;

            pdf.text(titleText, titleX, titleY);

            const contentLeftMargin = 10;
            const contentTopMargin = marginTop + imgHeight + 10;
            pdf.addImage(imgData, 'PNG', contentLeftMargin, contentTopMargin, 180, 160);

            pdf.save("order_details.pdf");
            setExporting(false);
        });
    };

    const deleteOrder = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/customerorder/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    // Reload orders after deletion
                    fetchOrders();
                    setShowModal(false);
                } else {
                    console.log(result.error);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <h1>All Customer Orders</h1>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <div>
                    {orders.length === 0 ? (
                        <h3>No Orders Found</h3>
                    ) : (
                        <>
                            <p>Total Number of Orders: {orders.length}</p>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        
                                        <th>Total Price</th>
                                        <th>Order Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} onClick={() => { setShowModal(true); setSelectedOrder(order); }}>
                                            
                                            {/* Calculate total price */}
                                            <td>RS.{order.cart.reduce((total, item) => total + item.price, 0)}</td>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}
                </div>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body ref={modalContentRef}>
                    {selectedOrder && (
                        <>
                            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                            <p><strong>Total Price:</strong> RS.{selectedOrder.cart.reduce((total, item) => total + item.price, 0)}</p>
                            <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                            <h3>Products:</h3>
                            <ul>
                                {selectedOrder.cart.map((item, index) => (
                                    <li key={index}>
                                        <p><strong>Product Name:</strong> {item.name}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Price per unit:</strong> RS.{item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteOrder(selectedOrder._id)}>Delete</Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="success" onClick={exportPDF} disabled={exporting}>
                        {exporting ? "Exporting..." : "Export to PDF"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AllOrders;
