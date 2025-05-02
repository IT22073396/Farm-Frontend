import { useContext, useEffect,useState,useRef } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from "../assets/logo.jpg";

const AllCows = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCow, setSelectedCow] = useState(null);
    const [cows, setCows] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const contentRef = useRef(null);

    useEffect(() => {
        async function fetchCows() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/cows', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setCows(result.cows);
                } else {
                    console.log(result);
                    toast.error("Failed to fetch cows");
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch cows");
            } finally {
                setLoading(false);
            }
        }
        fetchCows();
    }, [toast]);

    const deleteCow = async (id) => {
        if (window.confirm("Are you sure you want to delete this cow?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/cows/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const result = await res.json();
                if (!result.error) {
                    toast.success("Deleted Cow");
                    setShowModal(false);
                    const updatedCows = cows.filter(cow => cow._id !== id);
                    setCows(updatedCows);
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to delete cow");
            }
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const newSearchCow = cows.filter((cow) =>
            cow.cow_id && cow.cow_id.toLowerCase().includes(searchInput.toLowerCase())
        );
        setCows(newSearchCow);
    };

    const exportPDF = () => {
        const tableContent = contentRef.current;
        html2canvas(tableContent).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpg');
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Logo
            const logoImg = new Image();
            logoImg.src = logo; // Replace 'your_logo_url' with the URL of your logo
            logoImg.onload = function () {
                const imgWidth = 30;
                const imgHeight = (this.height * imgWidth) / this.width;
                const marginLeft = 10;
                const marginTop = 10;
                pdf.addImage(this, 'JPG', marginLeft, marginTop, imgWidth, imgHeight);

                // Title
                pdf.setFontSize(16);
                const titleText = " Cow Report";
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

                pdf.save("cow_report.pdf");
            };
        });
    };

    return (
        <>
            <h2>Cow Data</h2>
            <a href="/allcows" className="btn btn-danger my-2">Reload Data</a>
            <Button onClick={exportPDF}>Generate PDF Report</Button>
            <br /><br />
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : cows.length === 0 ? (
                <h3>No Data Added</h3>
            ) : (
                <>
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="searchInput"
                            id="searchInput"
                            className="form-control my-2"
                            placeholder="Search Cow"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="primary" type="submit" className="btn btn-info mx-2">
                            Search
                        </Button>
                    </form>
                    <p>Total No of Cows: {cows.length}</p>
                    <Table striped bordered hover variant="primary" ref={contentRef}>
                        <thead>
                            <tr>
                                <th>Cow Id</th>
                                <th>Tag Number</th>
                                <th>Breed</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {cows.map((cow) => (
                                <tr key={cow._id} onClick={() => {
                                    setSelectedCow(cow);
                                    setShowModal(true);
                                }}>
                                    <td>{cow.cow_id}</td>
                                    <td>{cow.tag_number}</td>
                                    <td>{cow.breed}</td>
                                    <td>{cow.date_of_birth}</td>
                                    <td>{cow.gender}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
            <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cow Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedCow && (
                            <>
                                <p><strong>CowID:</strong> {selectedCow.cow_id}</p>
                                <p><strong>TagNumber:</strong>{selectedCow.tag_number}</p>
                                <p><strong>Breed:</strong> {selectedCow.breed}</p>
                                <p><strong>DateofBirth:</strong>{selectedCow.date_of_birth}</p>
                                <p><strong>Gender:</strong>{selectedCow.gender}</p>
                               
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Link className="btn btn-info" to={`/editcow/${selectedCow?._id}`}>Edit</Link>
                        <Button variant="primary" onClick={() => deleteCow(selectedCow._id)}>Delete</Button>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default AllCows;