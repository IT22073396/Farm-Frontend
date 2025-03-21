import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import pic1 from '../images/1.png';
import pic2 from '../images/2.png';
import pic3 from '../images/3.png';
import pic4 from '../images/4.png';

const SupplierManagerHome = () =>{
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Redirect unauthenticated users to the login page
    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    // Only render if the user is authenticated
    if (!user) {
        return null;
    }

    return (
        <div>
            <h2>Welcome to Supplier Manager Home page</h2>
            <h2></h2>

            {/* Render each image and button pair vertically */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Button 1 with image above */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <img src={pic1} alt="Image 1" style={{ width: "100px", height: "100px" }} />
                    <div style={{ marginTop: "10px" }}>
                        <Button variant="primary" size="lg" onClick={() => navigate("/createsuppliers")}>
                            Create Supplier
                        </Button>
                    </div>
                </div>

                {/* Button 2 with image above */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <img src={pic2} alt="Image 1" style={{ width: "100px", height: "100px" }} />
                    <div style={{ marginTop: "10px" }}>
                        <Button variant="primary" size="lg" onClick={() => navigate("/allsuppliers")}>
                            All Suppliers
                        </Button>
                    </div>
                </div>

                {/* Button 3 with image above */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <img src={pic3} alt="Image 1" style={{ width: "100px", height: "100px" }} />
                    <div style={{ marginTop: "10px" }}>
                        <Button variant="primary" size="lg" onClick={() => navigate("/createorders")}>
                            Create Orders
                        </Button>
                    </div>
                </div>

                {/* Button 4 with image above */}
                <div style={{ textAlign: "center" }}>
                    <img src={pic4} alt="Image 1" style={{ width: "100px", height: "100px" }} />
                    <div style={{ marginTop: "10px" }}>
                        <Button variant="primary" size="lg" onClick={() => navigate("/SupplierOrders")}>
                            All Orders
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierManagerHome;
