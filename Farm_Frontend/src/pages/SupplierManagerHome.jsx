import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const SupplierManagerHome = () => {
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
            <h2>Welcome to Vetenary Manager Home page</h2>

            
        </div>
    );
};

export default SupplierManagerHome;
