import { useContext, useEffect, useState, useRef } from "react"; // Added useRef
import React from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; // Ensure html2canvas is installed

const CustomerStatues = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [deliveries, setDeliveries] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const contentRef = useRef(null); // Added ref for capturing content

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

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const newSearchDelivery = deliveries.filter((delivery) =>
            delivery.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setDeliveries(newSearchDelivery);
    };

    const exportPDF = () => {
        const tableContent = contentRef.current;
        html2canvas(tableContent).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 180;
            const pdfWidth = 200;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            const marginLeft = (pdf.internal.pageSize.width - pdfWidth) / 2;
            const marginTop = 10;

            pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, pdfHeight);
            pdf.save("deliveryStatues.pdf");
        });
    };

    return (
        <>
            This is the All Deliveries page
            <br />
            <a href="/customerstatues" className="btn btn-danger my-2">Reload Deliveries</a>
            <Button onClick={exportPDF} variant="success" className="my-2 mx-2">Export to PDF</Button>

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
                    <Table striped bordered hover variant="dark" ref={contentRef}>
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
        </>
    );
}

export default CustomerStatues;
