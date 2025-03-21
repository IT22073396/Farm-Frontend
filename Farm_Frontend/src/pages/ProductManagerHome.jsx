import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"; // Import Link for routing

// Import images for the functionalities
import createIcon from "../assets/addProductImage.png";
import allProductsIcon from "../assets/allProducts.jpg";
import addLeaveIcon from "../assets/add.png";

const ProductManagerHome = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    
    useEffect(()=>{
        !user && navigate("/login", {replace:true });
    },[]);

    return (
        <>
            <div style={{ paddingLeft: '20px' }}>
                <h2>Welcome, {user ? user.name : null}!</h2>
                <br />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {/* Display larger images for the functionalities */}
                    <Link to="/createproducts" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                        <img src={createIcon} alt="Create" style={{ width: '200px', height: '200px', marginRight: '10px' }} />
                        <Button variant="primary" style={{ fontSize: '20px' }}>Add Product</Button>
                    </Link>
                    <Link to="/allproducts" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                        <img src={allProductsIcon} alt="All Products" style={{ width: '200px', height: '200px', marginRight: '10px' }} />
                        <Button variant="secondary" style={{ fontSize: '20px' }}>All Products</Button>
                    </Link>
                    <Link to="/createleave" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={addLeaveIcon} alt="Add Leave" style={{ width: '200px', height: '200px', marginRight: '10px' }} />
                        <Button variant="info" style={{ fontSize: '20px' }}>Add Leave</Button>
                    </Link>
                </div>
            </div>
            <br />
        </>
    );
};

export default ProductManagerHome;
