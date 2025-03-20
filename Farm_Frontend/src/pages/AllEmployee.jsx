import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/mandri-logo_black-2.png";

const AllEmployee = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const contentRef = useRef(null);


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/employees', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setEmployees(result.employees);
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
        fetchData();
    }, []);

    const deleteEmployee = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/employees/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, }
                })
                const result = await res.json();
                if (!result.error) {

                    toast.success("Deleted Employee");
                    setShowModal(false);
                    setLoading(true);
                    fetchData();

                    try {
                        const res = await fetch('http://localhost:4000/api/employees', {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                            }
                        });
                        const result = await res.json();
                        if (!result.error) {
                            setEmployees(result.employees);
                            setLoading(false);
                        } else {
                            console.log(result);
                            setLoading(false);
                        }
                    } catch (err) {
                        setLoading(false);
                        console.log(err);
                    }

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

        const filteredEmployees = employees.filter((employee) =>
            employee.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        console.log(filteredEmployees);

        setEmployees(filteredEmployees);

    };

    const exportPDF = () => {
        const tableContent = contentRef.current;
        html2canvas(tableContent).then((canvas) => {
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
                const titleText = "Employee Details";
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

                // Override styling for the table (background color)
                const tableElement = document.querySelector('table');
                if (tableElement) {
                    tableElement.style.backgroundColor = '#FFFFFF'; // Set background color to white
                    tableElement.style.color = '#000000'; // Set text color to black                
                  }

                const fontSize = 12;
                pdf.setFontSize(fontSize);

                pdf.save("employees.pdf");
            };
        });
    };


    return (<>

        This is the All Employees page
        <br></br>
        <a href="/allemployees" className="btn btn-danger my-2">Reload Employees</a>
        <Button onClick={exportPDF} variant="success" className="my-2 mx-2">Export to PDF</Button>
        {loading ? <Spinner splash="Loading Employees..." /> : (
            (employees.length == 0 ? <h3>No Employeees Added</h3> : <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>

                    <input
                        type="text"
                        name="searchInput"
                        id="searchInput"
                        className="form-control my-2"
                        placeholder="Search Employee"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button id="Search" variant="primary" type="submit" className="btn btn-info mx-2">
                        Search</Button>{' '}
                </form>

                <div ref={contentRef}>
                    <p>Total No of Employees:{employees.length}</p>


                    <Table striped bordered hover variant="primary">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading === false && employees.map((employee) => (
                                <tr key={employee._id} onClick={() => {
                                    setSelectedEmployee({});
                                    setSelectedEmployee(employee);
                                    setShowModal(true)
                                }}>
                                    <td>{employee.name}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.userRole}</td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                </div>

            </>)

        )}
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={showModal} onHide={() => {
                setShowModal(false)
            }}>
                <Modal.Header closeButton>
                    {selectedEmployee && <Modal.Title>Employee Details</Modal.Title>}
                </Modal.Header>

                <Modal.Body>
                    {selectedEmployee && (
                        <>
                            <p><strong>Name:</strong> {selectedEmployee.name}</p>
                            <p><strong>Address:</strong>{selectedEmployee.address}</p>
                            <p><strong>Email:</strong> {selectedEmployee.email}</p>
                            <p><strong>Phone:</strong>{selectedEmployee.phone}</p>
                            <p><strong>Role:</strong>{selectedEmployee.userRole}</p>
                        </>)}
                </Modal.Body>

                <Modal.Footer>
                    <Link
                        className="btn btn-info"
                        to={`/edit/${selectedEmployee?._id}`}>
                        Edit</Link>
                    <Link
                        className="btn btn-info"
                        to={`/createpayslip/${selectedEmployee?._id}?name=${selectedEmployee?.name}&email=${selectedEmployee?.email}`}>
                        Create Payslip</Link>
                    <Button id="btn btn-danger" variant="primary" onClick={() => {
                        deleteEmployee(selectedEmployee._id)
                    }}>Delete</Button>
                    <Button id="btn btn-warning" variant="secondary" onClick={() => {
                        setShowModal(false)
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>


    </>
    );
}


export default AllEmployee;
