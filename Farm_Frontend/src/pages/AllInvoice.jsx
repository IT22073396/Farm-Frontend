import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Spinner, Table, Modal } from 'react-bootstrap';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from "../assets/mandri-logo_black-2.png"; // Import the logo

const AllInvoices = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const modalRef = useRef(null);
    const [originalInvoices, setOriginalInvoices] = useState([]);

    useEffect(() => {
        async function fetchInvoice() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/invoices', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setInvoices(result.invoices);
                    setOriginalInvoices(result.invoices);
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
        fetchInvoice();
    }, []);

    const deleteInvoice = async (id) => {
        if (window.confirm("Are you sure you want to delete this Invoice?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/invoices/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const result = await res.json();
                if (!result.error) {
                    toast.success("Deleted Invoice");
                    setShowModal(false);
                    setLoading(true);
                    fetchInvoice();
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleDownloadPDF = () => {
        const input = modalRef.current;
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                
                // Logo
                const logoImg = new Image();
                logoImg.src = logo;
                logoImg.onload = function() {
                    const imgWidth = 30;
                    const imgHeight = (this.height * imgWidth) / this.width;
                    const marginLeft = 10;
                    const marginTop = 10; 
                    pdf.addImage(this, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);

                    // Title
                    pdf.setFontSize(16);
                    const titleText = "Invoice Details";
                    const titleWidth = pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
                    const titleX = (pdf.internal.pageSize.width - titleWidth) / 2;
                    const titleY = marginTop + imgHeight + 10; // Adjusted top margin for the title
                    pdf.text(titleText, titleX, titleY);

                    // Invoice Content
                    const pdfWidth = 200;
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    const contentMarginTop = titleY + 10; // Adjusted top margin to accommodate title
                    const contentMarginLeft = (pdf.internal.pageSize.width - pdfWidth) / 2; // Centering the content horizontally
                    pdf.addImage(imgData, 'PNG', contentMarginLeft, contentMarginTop, pdfWidth, pdfHeight);
                    
                    pdf.save("invoice.pdf");
                };
            })
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    
        if (searchInput.trim() === "") {
            // If search input is empty, restore original list of invoices
            setInvoices(originalInvoices);
        } else {
            // Otherwise, filter the invoices based on the search input
            const newSearchInvoice = originalInvoices.filter((invoice) =>
                invoice.cname.toLowerCase().includes(searchInput.toLowerCase())
            );
    
            setInvoices(newSearchInvoice);
        }
    };

    return (
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
            <p>This is the All Invoices page</p>
            <a href="/allinvoice" className="btn btn-danger my-2">Reload Invoice </a>
            {loading ? <Spinner splash="Loading Invoice..." /> : (
                (invoices.length === 0 ? <h3>No Invoice Added</h3> : (
                    <>
                        <form className="d-flex" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                name="searchInput"
                                id="searchInput"
                                className="form-control my-2"
                                placeholder="Search Invoice"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <Button variant="primary" type="submit" className="btn btn-info mx-2">
                                Search
                            </Button>{' '}
                        </form>

                        <p>Total No of Invoices :{invoices.length}</p>
                        <Table striped bordered hover variant="light" style={{ backgroundColor: 'white', color: 'black' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer Name</th>
                                    <th>Order ID</th>
                                    <th>Ordered Date</th>
                                    <th>Total Amount(USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading === false && invoices.map((invoice) => (
                                    <tr key={invoice._id} onClick={() => {
                                        setSelectedInvoice({});
                                        setSelectedInvoice(invoice);
                                        setShowModal(true)
                                    }}>
                                        <td>{invoice.id}</td>
                                        <td>{invoice.cname}</td>
                                        <td>{invoice.orderid}</td>
                                        <td>{invoice.orderedDate}</td>
                                        <td>{invoice.tamount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                ))
            )}
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        {selectedInvoice && <Modal.Title>Invoice Details</Modal.Title>}
                    </Modal.Header>

                    <Modal.Body ref={modalRef}>
                        {selectedInvoice && (
                            <>
                                <p><strong>ID:</strong> {selectedInvoice.id}</p>
                                <p><strong>Customer Name:</strong> {selectedInvoice.cname}</p>
                                <p><strong>Order ID:</strong>{selectedInvoice.orderid}</p>
                                <p><strong>Ordered Day:</strong> {selectedInvoice.orderedDate}</p>
                                <p><strong>Total Amount(USD):</strong>{selectedInvoice.tamount}</p>
                            </>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={handleDownloadPDF}>Download PDF</Button>
                        <Link
                            className="btn btn-info"
                            to={`/editinvoice/${selectedInvoice?._id}`}>
                            Edit
                        </Link>
                        <Button id="btn btn-danger" variant="primary" onClick={() => deleteInvoice(selectedInvoice._id)}>
                            Delete
                        </Button>
                        <Button id="btn btn-warning" variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default AllInvoices;
