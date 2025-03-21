import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Bar } from 'react-chartjs-2';
import ToastContext from "../context/ToastContext";
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const InventoryManagerHome = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { toast } = useContext(ToastContext);
    const [inventoryChartData, setInventoryChartData] = useState(null);

    useEffect(() => {
        async function fetchInventoryChartData() {
            try {
                const res = await fetch('http://localhost:4000/api/inventories', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    const chartData = {
                        labels: result.inventories.map(item => item.productname),
                        datasets: [
                            {
                                label: 'Product Quantities',
                                data: result.inventories.map(item => item.quantity),
                                backgroundColor: 'rgba(58, 134, 255, 0.3)', //   color
                                borderColor: 'rgba(58, 134, 255, 1)', //   border color
                                borderWidth: 1,
                            },
                        ],
                    };
                    setInventoryChartData(chartData);
                } else {
                    console.log(result);
                    toast.error("Failed to fetch inventories");
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch inventories");
            }
        }
        fetchInventoryChartData();
    }, [toast]);

    return (
        <>
            <div>
                <h2>Welcome, {user ? user.name : null}</h2>

                {/* Buttons with images */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="primary" onClick={() => navigate("/createinventory")} style={{ width: '200px', height: '200px' }}>
                            <img src="/src/assets/6522965.png" alt="Add Inventory" style={{ width: '100px', height: '100px' }} />
                        </Button>
                        <p>Add Inventory</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="secondary" onClick={() => navigate("/allinventories")} style={{ width: '200px', height: '200px' }}>
                            <img src="/src/assets/3744801.png" alt="All Inventory" style={{ width: '100px', height: '100px' }} />
                        </Button>
                        <p>All Inventory</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="success" onClick={() => navigate("/createleave")} style={{ width: '200px', height: '200px' }}>
                            <img src="/src/assets/6001299.png" alt="Add leave" style={{ width: '100px', height: '100px' }} />
                        </Button>
                        <p>Add Leave</p>
                    </div>
                </div>

                {inventoryChartData && (
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h3>Product Quantities</h3>
                        <Bar
                            data={inventoryChartData}
                            options={{
                                indexAxis: 'y',
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Quantities',
                                            color: '#000',
                                            font: {
                                                size: 16,
                                                weight: 'bold'
                                            }
                                        }
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Product Names',
                                            color: '#000',
                                            font: {
                                                size: 16,
                                                weight: 'bold'
                                            }
                                        }
                                    }
                                }
                            }}
                            width={800}
                            height={400}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default InventoryManagerHome;
