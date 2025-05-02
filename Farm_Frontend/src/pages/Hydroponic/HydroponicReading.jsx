
// // export default HydroponicReading;
// import { useContext, useEffect, useState, useRef } from "react";
// import React from "react";
// import Button from 'react-bootstrap/Button';
// import Stack from 'react-bootstrap/Stack';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';
// import Spinner from 'react-bootstrap/Spinner';
// import ToastContext from "../../context/ToastContext";
// import { Link } from "react-router-dom";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const HydroponicReading = () => {
//     const { toast } = useContext(ToastContext);
//     const [showModal, setShowModal] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [selectedReading, setSelectedReading] = useState(null);
//     const [readings, setReadings] = useState([]);
//     const [searchInput, setSearchInput] = useState("");
//     const contentRef = useRef(null);
//     const [isGenerating, setIsGenerating] = useState(false);
//     const intervalRef = useRef(null);

//     useEffect(() => {
//         async function fetchReadings() {
//             setLoading(true);
//             try {
//                  const res = await fetch('http://localhost:4000/api/temperatureSendRcv/get-temperature', {
//                   //const res = await fetch('http://192.168.8.102/sensor-temperature', {

//                     method: "GET",
//                     //headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } // Fixed backticks
//                 });
//                 const result = await res.json();
//                 if (!result.error) {
//                     setReadings(result.readings);
//                 } else {
//                     console.log(result);
//                 }
//             } catch (err) {
//                 console.log(err);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchReadings();
//     }, []);
//     const exportPDF = () => {
//         const tableContent = contentRef.current;
//         html2canvas(tableContent).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('p', 'mm', 'a4');
//             pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
//             pdf.save("hydroponic-readings.pdf");
//         });
//     };

//     // // Function to send dummy data
//     // const sendDummyData = async () => {
//     //     const dummyData = {
//     //         moisture: parseFloat((Math.random() * (100 - 30) + 30).toFixed(2)), // Random moisture between 30-100%
//     //         temperature: parseFloat((Math.random() * (30 - 20) + 20).toFixed(2)), // Random temp between 20-30°C
//     //         humidity: parseFloat((Math.random() * (80 - 50) + 50).toFixed(2)), // Random humidity between 50-80%
//     //         timestamp: new Date().toISOString(), // Current timestamp in ISO format
//     //     };
    
//     //     try {
//     //         const response = await fetch("http://localhost:4000/api/temperatureController", {
//     //             method: "POST",
//     //             headers: { "Content-Type": "application/json" },
//     //             body: JSON.stringify(dummyData),
//     //         });
    
//     //         if (response.ok) {
//     //             console.log("Dummy data sent:", dummyData);
//     //         } else {
//     //             console.error("Error sending dummy data");
//     //         }
//     //     } catch (err) {
//     //         console.error("Request failed", err);
//     //     }
//     // };
    

//     // Toggle Dummy Data Generation
//     const toggleDummyDataGeneration = () => {
//         if (isGenerating) {
//             clearInterval(intervalRef.current);
//             console.log("Dummy data generation stopped");
//         } else {
//             intervalRef.current = setInterval(sendDummyData, 5000); // Send data every 5 seconds
//             console.log("Dummy data generation started");
//         }
//         setIsGenerating(!isGenerating);
//     };

//     return (
//         <>
//             <h2>Hydroponic Readings</h2>
//             <div className="mb-3">
//                 <Link to="/createReading" className="btn btn-primary me-2">Add Reading</Link>
//                 <Button onClick={exportPDF} variant="success" className="my-2 mx-2">Export to PDF</Button>
//                 <Button 
//                     onClick={toggleDummyDataGeneration} 
//                     variant={isGenerating ? "danger" : "warning"} 
//                     className="my-2 mx-2"
//                 >
//                     {isGenerating ? "Stop Dummy Data" : "Generate Dummy Data"}
//                 </Button>
//             </div>
    
//             {loading ? (
//                 <Spinner animation="border" variant="primary" />
//             ) : (
//                 readings.length === 0 ? (
//                     <h3>No Readings Available</h3>
//                 ) : (
//                     <>
//                         <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
//                             <input
//                                 type="text"
//                                 className="form-control my-2"
//                                 placeholder="Search Readings"
//                                 value={searchInput}
//                                 onChange={(e) => setSearchInput(e.target.value)}
//                             />
//                             <Button variant="info" className="mx-2">Search</Button>
//                         </form>
//                         <div ref={contentRef}>
//                             <p>Total Readings: {readings.length}</p>
//                             <Table striped bordered hover>
//                                 <thead>
//                                     <tr>
//                                         {/* <th>Moisture</th> */}
//                                         <th>Temperature</th>
//                                         <th>Humidity</th>
//                                         {/* <th>Timestamp</th> */}
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {readings.map((reading) => (
//                                         <tr key={reading._id} onClick={() => {
//                                             setSelectedReading(reading);
//                                             setShowModal(true);
//                                         }}>
//                                             {/* <td>{reading.moisture}%</td> */}
//                                             <td>{reading.temperature}°C</td>
//                                             <td>{reading.humidity}%</td>
//                                             {/* <td>{new Date(reading.timestamp).toLocaleString()}</td> */}
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>
//                         </div>
//                     </>
//                 )
//             )}
    
//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Reading Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedReading && (
//                         <>
//                             {/* <p><strong>Moisture:</strong> {selectedReading.moisture}%</p> */}
//                             <p><strong>Temperature:</strong> {selectedReading.temperature}°C</p>
//                             <p><strong>Humidity:</strong> {selectedReading.humidity}%</p>
//                             {/* <p><strong>Timestamp:</strong> {new Date(selectedReading.timestamp).toLocaleString()}</p> */}
//                         </>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };

// export default HydroponicReading;

import { useContext, useEffect, useState, useRef } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ToastContext from "../../context/ToastContext";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const HydroponicReading = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedReading, setSelectedReading] = useState(null);
    const [readings, setReadings] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const contentRef = useRef(null);

    // 🔁 Fetch latest 10 readings every second
    useEffect(() => {
        const fetchLatestReadings = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/temperature/data');
                const result = await res.json();
                if (!result.error && result.readings) {
                    const lastTenReadings = result.readings.slice(-10).reverse();
                    setReadings(lastTenReadings);
                }
            } catch (err) {
                console.log("Error fetching readings:", err);
            }
        };

        fetchLatestReadings();
        const intervalId = setInterval(fetchLatestReadings, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const exportPDF = () => {
        const tableContent = contentRef.current;
        html2canvas(tableContent).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save("hydroponic-readings.pdf");
        });
    };

    return (
        <>
            <h2>Hydroponic Readings</h2>
            <div className="mb-3">
                <Link to="/createReading" className="btn btn-primary me-2">Add Reading</Link>
                <Button onClick={exportPDF} variant="success" className="my-2 mx-2">Export to PDF</Button>
                <Link to="/sensor-display" className="btn btn-info my-2 mx-2">View Sensor Display</Link> {/* New Button */}

            </div>

            {readings.length === 0 ? (
                <h3>Loading readings...</h3>
            ) : (
                <>
                    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            className="form-control my-2"
                            placeholder="Search Readings"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="info" className="mx-2">Search</Button>
                    </form>
                    <p>Last updated: {new Date().toLocaleTimeString()}</p>
                    <div ref={contentRef}>
                        <p>Total (Latest) Readings: {readings.length}</p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Temperature</th>
                                    <th>Humidity</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {readings
                                    .filter(r =>
                                        r.temperature.toString().includes(searchInput) ||
                                        r.humidity.toString().includes(searchInput)
                                    )
                                    .map((reading) => (
                                        <tr key={reading._id} onClick={() => {
                                            setSelectedReading(reading);
                                            setShowModal(true);
                                        }}>
                                            <td>{reading.temperature}°C</td>
                                            <td>{reading.humidity}%</td>
                                            <td>{new Date(reading.timestamp).toLocaleString()}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reading Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReading && (
                        <>
                            <p><strong>Temperature:</strong> {selectedReading.temperature}°C</p>
                            <p><strong>Humidity:</strong> {selectedReading.humidity}%</p>
                            <p><strong>Timestamp:</strong> {new Date(selectedReading.timestamp).toLocaleString()}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HydroponicReading;
