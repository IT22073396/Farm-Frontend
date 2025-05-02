import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import customerhomepic from "../assets/IMG_3025.jpg";
import barkoil from '../assets/a1-2.jpg';
import mosquitoil from '../assets/a1-5.jpg';
import herbalbalm from '../assets/a1-3.jpg';

const CustomerHome = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    useEffect(()=>{
        !user && navigate("/login", {replace:true });

    },[]);

    // Array of image paths
    const imagePaths = [
        "/src/assets/image1.webp",
        "/src/assets/image2.webp",
        "/src/assets/image3.webp",
        "/src/assets/image4.jpg",
        "/src/assets/image5.jpeg",
        "/src/assets/image6.webp",
        "/src/assets/image7.jpg",
        "/src/assets/image8.webp",
        "/src/assets/image9.webp",
    ];

    return (
        <div style={{ marginTop: '100px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/src/assets/homelogo.jpg" alt="Home Logo" style={{ width: '900px', marginRight: '20px' }} />
                <div>
                    <h2 style={{ color: 'orange', fontWeight: 'bold' }}>Our Business</h2>
                    <p style={{ fontSize: '18px' }}> we specialize in raising healthy and high-quality cows to provide fresh, farm-to-table products. Our focus is on sustainable and ethical farming practices, ensuring the well-being of our livestock and delivering premium dairy and beef products.</p>
                </div>
            </div>
            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Farm Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px', marginTop: '20px' }}>
                {/* Map over the array of image paths */}
                {imagePaths.map((imagePath, index) => (
                    <img key={index} src={imagePath} alt={`Image ${index + 1}`} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                ))}
            </div>
            
            
            <div style={{ backgroundColor: 'lightyellow', width: '100%', padding: '20px 0', marginTop: '50px' }}>
               
               
                
                <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '20px' }}>
                   

                we are passionate about producing premium cow-based products with the highest standards of quality and care. From our rich, creamy milk to our tender, flavorful beef, every product is the result of meticulous farming practices. We believe in raising cows in a natural, stress-free environment, which translates into healthier animals and better products. Our dairy offerings include fresh milk, butter, yogurt, and artisanal cheeses, while our beef products are known for their exceptional taste and texture. Every product we offer tells the story of sustainable farming and our dedication to bringing you the very best from nature’s bounty."

                </p>
            </div>
        </div>
    );
};

export default CustomerHome;
