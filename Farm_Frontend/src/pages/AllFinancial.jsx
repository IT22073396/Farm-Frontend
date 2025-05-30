import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Spinner, Table, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ToastContext from "../context/ToastContext";
import logo from "../assets/mandri-logo_black-2.png";

const AllFinancials = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFinancial, setSelectedFinancial] = useState(null);
    const [financials, setFinancials] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const contentRef = useRef(null);

    useEffect(() => {
        async function fetchFinancial() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/financials', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setFinancials(result.financials);
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
        fetchFinancial();
    }, []);

    const deleteFinancial = async (id) => {
        if (window.confirm("Are you sure you want to delete this Financial Report?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/financials/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const result = await res.json();
                if (!result.error) {
                    toast.success("Deleted Financial Report");
                    setShowModal(false);
                    setLoading(true);
                    fetchFinancial();
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const newSearchFinancial = financials.filter((financial) =>
            financial.id.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFinancials(newSearchFinancial);
    };

    const generatePDFReport = () => {
        const input = contentRef.current;
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');

                // Logo
                const logoImg = new Image();
                logoImg.src = logo;
                logoImg.onload = function () {
                    const imgWidth = 30;
                    const imgHeight = (this.height * imgWidth) / this.width;
                    const marginLeft = 10;
                    const marginTop = 10;
                    pdf.addImage(this, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);

                    // Title
                    pdf.setFontSize(16);
                    const titleText = "Financial Report";
                    const titleWidth = pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
                    const titleX = (pdf.internal.pageSize.width - titleWidth) / 2;
                    const titleY = marginTop + imgHeight + 10; // Adjusted top margin for the title
                    pdf.text(titleText, titleX, titleY);

                    // Table Content
                    const pdfWidth = 200;
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    const tableMarginTop = titleY + 10; // Adjusted top margin to accommodate title
                    const tableMarginLeft = (pdf.internal.pageSize.width - pdfWidth) / 2; // Centering the table horizontally
                    pdf.addImage(imgData, 'PNG', tableMarginLeft, tableMarginTop, pdfWidth, pdfHeight);

                    const fontSize = 12;
                    pdf.setFontSize(fontSize);

                    pdf.save("financial_report.pdf");
                };
            });
    };

    return (
        <>
            <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
                <h2>All Financial Reports</h2>
                <Button onClick={generatePDFReport}>Generate PDF Report</Button>
                {/* Adding a reload button to reload the page */}
                <Button 
                    onClick={() => window.location.reload()} 
                    style={{
                        backgroundColor: 'red', /* Red background */
                        color: 'white', /* White text */
                        border: 'none', /* No border */
                        borderRadius: '4px', /* Slightly rounded corners */
                        padding: '10px 20px', /* Spacing inside the button */
                        fontSize: '14px', /* Text size */
                        cursor: 'pointer', /* Pointer cursor to indicate it's clickable */
                        marginLeft: '10px' /* Spacing between buttons */
                    }}
                >
                    Reload Page
                </Button>
                <br /><br />
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading Financial Reports...</span>
                    </Spinner>
                ) : financials.length === 0 ? (
                    <h3>No Financial Reports Added</h3>
                ) : (
                    <>
                        <form className="d-flex justify-content-end" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                name="searchInput"
                                id="searchInput"
                                className="form-control my-2"
                                style={{ width: '450px' }} // Adjust width as needed
                                placeholder="Search Financial"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <Button
                              id="Search" lo
                              variant="primary"
                              type="submit"
                              className="mx-2"
                              style={{
                              background: 'linear-gradient(45deg, #ff7e5f, #feb47b)', /* Gradient background */
                              color: 'white', /* Text color */
                              border: '2px solid transparent', /* Invisible border to prevent distortion */
                              borderRadius: '50px', /* Rounded corners for a smooth look */
                                                                padding: '12px 25px', /* Spacing inside the button */
                                                                fontSize: '16px', /* Text size */
                                                                fontWeight: 'bold', /* Make text bold */
                                                                textTransform: 'uppercase', /* Capitalize the text */
                                                                letterSpacing: '1px', /* Spacing between letters */
                                                                boxShadow: '0 6px 12px rgba(255, 165, 100, 0.3)', /* Shadow effect */
                                                                transition: 'all 0.4s ease-in-out', /* Smooth transition effect */
                                                                cursor: 'pointer', /* Pointer cursor to indicate it's clickable */
                                                              }}                                 
                                                              onMouseEnter={(e) => {
                                                                e.target.style.background = 'linear-gradient(45deg, #feb47b, #ff7e5f)'; /* Reverse gradient on hover */
                                                                e.target.style.boxShadow = '0 8px 16px rgba(255, 165, 100, 0.5)'; /* Increased shadow effect */
                                                                e.target.style.transform = 'scale(1.05)'; /* Slight zoom effect */
                                                              }}
                                                              onMouseLeave={(e) => {
                                                                e.target.style.background = 'linear-gradient(45deg, #ff7e5f, #feb47b)'; /* Reset gradient */
                                                                e.target.style.boxShadow = '0 6px 12px rgba(255, 165, 100, 0.3)'; /* Reset shadow */
                                                                e.target.style.transform = 'scale(1)'; /* Reset zoom effect */
                                                              }}
                                                              onFocus={(e) => e.target.style.border = '2px solid #ff7e5f'} /* Highlight with border when focused */
                                                              onBlur={(e) => e.target.style.border = '2px solid transparent'} /* Remove border on blur */
                                                            >
                                                              Search
                                                            </Button>
                        </form>

                        <p>Total No of Financial Reports: {financials.length}</p>
                        <div ref={contentRef}>
                            <Table striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Day Duration</th>
                                        <th>Total Revenue(LKR)</th>
                                        <th>Total Expenses(LKR)</th>
                                        <th>Total Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {financials.map((financial) => (
                                        <tr key={financial._id} onClick={() => {
                                            setSelectedFinancial(financial);
                                            setShowModal(true);
                                        }}>
                                            <td>{financial.id}</td>
                                            <td>{financial.dduration}</td>
                                            <td>{financial.tsale}</td>
                                            <td>{financial.tcost}</td>
                                            <td>{financial.cofPsales}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}
                <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Financial Report Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedFinancial && (
                                <>
                                    <p><strong>ID:</strong> {selectedFinancial.id}</p>
                                    <p><strong>Day Duration:</strong> {selectedFinancial.dduration}</p>
                                    <p><strong>Total Revenue (LKR):</strong> {selectedFinancial.tsale}</p>
                                    <p><strong>Total Expenses (LKR):</strong> {selectedFinancial.tcost}</p>
                                    <p><strong>Total Profit (LKR):</strong> {selectedFinancial.cofPsales}</p>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Link className="btn btn-info" to={`/editfinancial/${selectedFinancial?._id}`}>Edit</Link>
                            <Button variant="primary" onClick={() => deleteFinancial(selectedFinancial._id)}>Delete</Button>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default AllFinancials;
