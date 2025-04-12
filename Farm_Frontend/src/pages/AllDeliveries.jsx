import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AllDeliveries = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [deliveries, setDeliveries] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchDelivery = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/deliveries', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setDeliveries(result.deliveries);
                    setLoading(false);
                } else {
                    console.log(result);
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        fetchDelivery();
    }, []);

    const deleteDelivery = async (id) => {
        if (window.confirm("Are you sure you want to delete this Delivery?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/deliveries/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const result = await res.json();
                if (!result.error) {
                    toast.success("Deleted Delivery");
                    setShowModal(false);
                    setLoading(true);
                    fetchDelivery();
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const newSearchDelivery = deliveries.filter((delivery) =>
            delivery.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setDeliveries(newSearchDelivery);
    };

    const exportPDF = () => {
        const input = document.getElementById('pdfTable');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("deliveries.pdf");
            });
    };

    const reloadDeliveries = () => {
        setLoading(true);
        fetchDelivery();
    };

    return (
        <>
            <h1>All Deliveries</h1>
            <Button onClick={exportPDF} variant="success" className="my-2 mx-2">Export to PDF</Button>
            <Button onClick={reloadDeliveries} variant="danger" className="my-2">Reload Deliveries</Button>

            {loading ? <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> : (
                (deliveries.length === 0 ? <h3>No Deliveries Added</h3> : <>
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="searchInput"
                            id="searchInput"
                            className="form-control my-2"
                            placeholder="Search package by user name"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button id="Search" variant="primary" type="submit" className="btn btn-info mx-2">
                            Search
                        </Button>
                    </form>

                    <p>Total No of Deliveries: {deliveries.length}</p>
                    <Table striped bordered hover variant="dark" id="pdfTable">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Customer Address</th>
                                <th>Order Weight</th>
                                <th>Delivery Company Name</th>
                                <th>Status</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.map((delivery) => (
                                <tr key={delivery._id} onClick={() => {
                                    setSelectedDelivery(delivery);
                                    setShowModal(true);
                                }}>
                                    <td>{delivery.name}</td>
                                    <td>{delivery.address}</td>
                                    <td>{delivery.weight}</td>
                                    <td>{delivery.courierName}</td>
                                    <td>{delivery.status}</td>
                                    <td>{delivery.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>)
            )}
            <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        {selectedDelivery && <Modal.Title>Delivery Details</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        {selectedDelivery && (
                            <>
                                <p><strong>Name:</strong> {selectedDelivery.name}</p>
                                <p><strong>Address:</strong> {selectedDelivery.address}</p>
                                <p><strong>Order Weight:</strong> {selectedDelivery.weight}</p>
                                <p><strong>Delivery Company Name:</strong> {selectedDelivery.courierName}</p>
                                <p><strong>Status:</strong> {selectedDelivery.status}</p>
                                <p><strong>Email:</strong> {selectedDelivery.email}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Link className="btn btn-info" to={`/editdeliveries/${selectedDelivery?._id}`}>Edit</Link>
                        <Button variant="primary" onClick={() => deleteDelivery(selectedDelivery?._id)}>Delete</Button>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default AllDeliveries;
