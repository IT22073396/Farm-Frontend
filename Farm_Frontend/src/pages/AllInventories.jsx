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
import logo from "../assets/mandri-logo_black-2.png";

const AllInventories = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [inventories, setInventories] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const contentRef = useRef(null);

    useEffect(() => {
        async function fetchInventories() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/inventories', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setInventories(result.inventories);
                } else {
                    console.log(result);
                    toast.error("Failed to fetch inventories");
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch inventories");
            } finally {
                setLoading(false);
            }
        }
        fetchInventories();
    }, [toast]);

    const deleteInventory = async (id) => {
        if (window.confirm("Are you sure you want to delete this inventory item?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/inventories/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const result = await res.json();
                if (!result.error) {
                    toast.success("Deleted Inventory item");
                    setShowModal(false);
                    const updatedInventories = inventories.filter(inventory => inventory._id !== id);
                    setInventories(updatedInventories);
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to delete inventory item");
            }
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const newSearchInventory = inventories.filter((inventory) =>
            inventory.productname && inventory.productname.toLowerCase().includes(searchInput.toLowerCase())
        );
        setInventories(newSearchInventory);
    };

    const exportPDF = () => {
        const tableContent = contentRef.current;
        html2canvas(tableContent).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Logo
            const logoImg = new Image();
            logoImg.src = logo; // Replace 'your_logo_url' with the URL of your logo
            logoImg.onload = function () {
                const imgWidth = 30;
                const imgHeight = (this.height * imgWidth) / this.width;
                const marginLeft = 10;
                const marginTop = 10;
                pdf.addImage(this, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);

                // Title
                pdf.setFontSize(16);
                const titleText = "Inventory Report";
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

                pdf.save("inventory_report.pdf");
            };
        });
    };

    return (
        <>
            <h2>All Inventory Items</h2>
            <a href="/allinventories" className="btn btn-danger my-2">Reload Inventories</a>
            <Button onClick={exportPDF}>Generate PDF Report</Button>
            <br /><br />
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : inventories.length === 0 ? (
                <h3>No Inventories Added</h3>
            ) : (
                <>
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="searchInput"
                            id="searchInput"
                            className="form-control my-2"
                            placeholder="Search Inventory"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="primary" type="submit" className="btn btn-info mx-2">
                            Search
                        </Button>
                    </form>
                    <p>Total No of Inventories: {inventories.length}</p>
                    <Table striped bordered hover variant="primary" ref={contentRef}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Item Number</th>
                                <th>Supplier Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventories.map((inventory) => (
                                <tr key={inventory._id} onClick={() => {
                                    setSelectedInventory(inventory);
                                    setShowModal(true);
                                }}>
                                    <td>{inventory.productname}</td>
                                    <td>{inventory.sku}</td>
                                    <td>{inventory.quantity}</td>
                                    <td>{inventory.unitprice}</td>
                                    <td>{inventory.itemno}</td>
                                    <td>{inventory.suppliername}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
            <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inventory Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedInventory && (
                            <>
                                <p><strong>ProductName:</strong> {selectedInventory.productname}</p>
                                <p><strong>SKU:</strong>{selectedInventory.sku}</p>
                                <p><strong>Quantity:</strong> {selectedInventory.quantity}</p>
                                <p><strong>UnitPrice:</strong>{selectedInventory.unitprice}</p>
                                <p><strong>ItemNo:</strong>{selectedInventory.itemno}</p>
                                <p><strong>SupplierName:</strong>{selectedInventory.suppliername}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Link className="btn btn-info" to={`/editinventory/${selectedInventory?._id}`}>Edit</Link>
                        <Button variant="primary" onClick={() => deleteInventory(selectedInventory._id)}>Delete</Button>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default AllInventories;