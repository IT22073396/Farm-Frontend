import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import { Row, Col, Card } from 'react-bootstrap';



const TransportManagerHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [vehicles, setVehicles] = useState([]);
    const [badStatusCount, setBadStatusCount] = useState(0);
    const [vehiclesWithLessThan7Days, setVehiclesWithLessThan7Days] = useState([]);

    const [shipmentsCount, setShipmentsCount] = useState(0); // State to hold the count of shipments

    
    useEffect(() => {
        const fetchShipmentsCount = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/shipments');
                const data = await res.json();
                const currentDate = new Date(); // Current date
                const oneDayBefore = new Date(currentDate);
                oneDayBefore.setDate(oneDayBefore.getDate() + 1); // One day before the current date
                const filteredShipments = data.shipments.filter(shipment => new Date(shipment.arrival) >= oneDayBefore);
                setShipmentsCount(filteredShipments.length); // Set the count of shipments
            } catch (error) {
                console.error("Error fetching shipments:", error);
            }
        };

        fetchShipmentsCount();
    }, []);

    useEffect(() => {
        const fetchShipmentsCount = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/shipments');
                const data = await res.json();
                const currentDate = new Date(); // Current date
                const filteredShipments = data.shipments.filter(shipment => new Date(shipment.arrival) >= currentDate);
                setShipmentsCount(filteredShipments.length); // Set the count of shipments
            } catch (error) {
                console.error("Error fetching shipments:", error);
            }
        };

        fetchShipmentsCount();
    }, []);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/vehicles');
                const data = await res.json();
                setVehicles(data.vehicles);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchVehicles();
    }, []);

    useEffect(() => {
        const calculateCounts = () => {
            // Calculate count of vehicles with bad status
            const badStatusVehicles = vehicles.filter(vehicle => vehicle.status === 'bad');
            setBadStatusCount(badStatusVehicles.length);

            // Calculate count of vehicles with inspections due within the next 7 days
            const sevenDaysLater = new Date();
            sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
            const vehiclesWithLessThan7Days = vehicles.filter(vehicle => {
                const nextInspectionDate = new Date(vehicle.next_inspection);
                return nextInspectionDate <= sevenDaysLater;
            });
            setVehiclesWithLessThan7Days(vehiclesWithLessThan7Days);
        };

        calculateCounts();
    }, [vehicles]);

    useEffect(() => {
        !user && navigate("/login", { replace: true });
    }, [user, navigate]);

    return user && (
        <>
            <h2>Welcome, {user.name}!</h2>
              {/* Buttons with images */}
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => navigate("/createtransports")} style={{ width: '200px', height: '200px' }}>
                        <img src="/src/assets/add vehicle.png " alt="Add Transport" style={{ width: '100px', height: '100px' }} />
                    </Button>
                    <p>Add Transport</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="secondary" onClick={() => navigate("/alltransports")} style={{ width: '200px', height: '200px' }}>
                        <img src="/src/assets/alltransport.png" alt="All Transports" style={{ width: '100px', height: '100px' }} />
                    </Button>
                    <p>All Transports</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="success" onClick={() => navigate("/createshipments")} style={{ width: '200px', height: '200px' }}>
                        <img src="/src/assets/addshipment.png" alt="Add Shipment" style={{ width: '100px', height: '100px' }} />
                    </Button>
                    <p>Add Shipment</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="danger" onClick={() => navigate("/allshipments")} style={{ width: '200px', height: '200px' }}>
                        <img src="/src/assets/3744801.png" alt="All Shipments" style={{ width: '100px', height: '100px' }} />
                    </Button>
                    <p>All Shipments</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="warning" onClick={() => navigate("/contactinventory")} style={{ width: '200px', height: '200px' }}>
                        <img src="/src/assets/callinventory.png" alt="Contact Inventory" style={{ width: '100px', height: '100px' }} />
                    </Button>
                    <p>Contact Inventory</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="info" onClick={() => navigate("/createleave")} style={{ width: '200px', height: '200px' }}>
                        <img src="/src/assets/6001299.png" alt="Add Leave" style={{ width: '100px', height: '100px' }} />
                    </Button>
                    <p>Add Leave</p>
                </div>
            </div>
            
            <Row className="justify-content-center mt-5">
    <Col xs={12} md={6}>
        <Card style={{ width: '100%', background: 'rgba(215, 124, 10, 0.6)', padding: '30px', boxShadow: '0px 4px 8px rgba(0, 0, 0,1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Vehicle</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><strong>Bad Status Vehicles:</strong></p>
                <p style={{ color: 'red' }}>{badStatusCount}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><strong>Upcoming Inspections (7 Days):</strong></p>
                <p style={{ color: 'red' }}>{vehiclesWithLessThan7Days.length}</p>
            </div>
        </Card>
    </Col>
    <Col xs={12} md={6}>
        <Card style={{ width: '100%', background: 'rgba(215, 124, 10, 0.6)', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0,1)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Shipment</h3>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><strong>Ongoing Shipments:</strong></p>
                <p style={{color: 'red'}}>{shipmentsCount}</p> {/* Display count of shipments with a date equal to or greater than the current day */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><strong> Today Arrivals :</strong></p>
                <p style={{color: 'red'}}>{shipmentsCount}</p> {/* Display count of shipments with arrival date one day later than the current day */}
            </div>
        
        </Card>
    </Col>
</Row>

        </>
    );
}

export default TransportManagerHome;
