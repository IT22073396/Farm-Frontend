import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import createEmployeeImage from '../assets/add_user-512.webp';
import allEmployeeImage from '../assets/11587894.png';
import allPayslipsImage from '../assets/1956496.png';
import addLeaveImage from '../assets/add.png';
import allLeavesImage from '../assets/10169830.png';
import { Pie } from "react-chartjs-2";


const Home = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const [leaveCounts,setLeaveCounts] = useState({
        approved:0,
        declined:0,
        pending:0,
    });
    
    useEffect(()=>{
        if (!user) {
            navigate("/login", { replace: true });
        }
    },[user,navigate]);

    useEffect(() => {
        fetchLeaveCounts();
    },[]);

    const fetchLeaveCounts = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/leaves",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
            if(!result.error){
                const {leaves} = result;
                const counts = {
                    approved:leaves.filter((leave) => leave.leaveTypeStatus === "Approved").length,
                    declined:leaves.filter((leave) => leave.leaveTypeStatus === "Declined").length,
                    pending:leaves.filter((leave) => leave.leaveTypeStatus === "pending").length,
                };
                setLeaveCounts(counts);
            }else{
                console.log(result);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const data = {
        labels:["Approved","Declined","Pending"],
        datasets:[
            {
                data:[leaveCounts.approved,leaveCounts.declined,leaveCounts.pending],
                backgroundColor:["#36A2EB","#FF6384","#FFCE56"],
                hoverBackgroundColor:["#36A2EB","#FF6384","#FFCE56"],
            },
        ],
    };

    return user && (
        <>
            <h2 className="text-center mb-4">Welcome, {user.name}!</h2>
            <Row className="gx-4">
                <Col xs={2} className="mb-4">
                    <Link to="/create">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={createEmployeeImage} alt="Create Employee" className="img-fluid" />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">Add Employee</p>
                </Col>
                <Col xs={2}  className="mb-4">
                    <Link to="/allemployees">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={allEmployeeImage} alt="All Employee" className="img-fluid" />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">All Employees</p>
                </Col>
                <Col xs={2} className="mb-4">
                    <Link to="/allpayslips">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={allPayslipsImage} alt="All Payslips" className="img-fluid" />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">All Payslips</p>
                </Col>
                <Col xs={2}  className="mb-4">
                    <Link to="/createleave">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={addLeaveImage} alt="Create Leave" className="img-fluid" />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">Create Leave</p>
                </Col>
                <Col xs={2}  className="mb-4">
                    <Link to="/allleaves">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={allLeavesImage} alt="All Leaves" className="img-fluid" />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">All Leaves</p>
                </Col>
            </Row>
            <Row className="gx-4 mt-4">
                <Col xs={6} className="border border-dark rounded">
                    <h3 className="text-center mb-3">Leave Status Overview</h3>
                <div className="p-3">
                <Pie data={data} 
                options={{
                    plugins:{
                    legend:{
                        display: true,
                        position:'right',
                        labels:{
                            font:{
                                size:12
                            },
                            usePointStyle:true,
                            padding:10,
                            boxWidth:20,
                        },
                        legendColorBackground:false,
                    }
                    
                    },
                    responsive:true,
                    maintainAspectRatio:false,
                    width:200,
                    height:200
                }}
                />
                </div>
                </Col>
              
                <Col xs={6}>
    <div className="d-flex flex-column">
        <div className="d-flex align-items-center mb-2">
            <div className="legend-color mr-2" style={{ backgroundColor: "#36A2EB", width: "10px", height: "10px" }}></div>
            <div className="legend-label" style={{ marginLeft: "5px" }}>Approved</div>
        </div>
        <div className="d-flex align-items-center mb-2">
            <div className="legend-color mr-2" style={{ backgroundColor: "#FF6384", width: "10px", height: "10px" }}></div>
            <div className="legend-label" style={{ marginLeft: "5px" }}>Declined</div>
        </div>
        <div className="d-flex align-items-center mb-2">
            <div className="legend-color mr-2" style={{ backgroundColor: "#FFCE56", width: "10px", height: "10px" }}></div>
            <div className="legend-label" style={{ marginLeft: "5px" }}>Pending</div>
        </div>
    </div>
    </Col>


                
            </Row>
        </>
    );
}

export default Home;
