import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) navigate("/login", { replace: true });
    }, []);

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
        <div style={{ marginTop: '100px' }}>
            {/* Top Section */}
            <div className="container d-flex flex-column flex-md-row align-items-center gap-4 mb-5">
                <img 
                    src="/src/assets/homelogo.jpg" 
                    alt="Home Logo" 
                    className="img-fluid rounded shadow-sm" 
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px' }} 
                />
                <div>
                    <h2 className="text-warning fw-bold">Our Business</h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                        We specialize in raising healthy and high-quality cows to provide fresh, farm-to-table products. 
                        Our focus is on sustainable and ethical farming practices, ensuring the well-being of our livestock 
                        and delivering premium dairy and beef products.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="container mb-5">
                <h2 className="text-center mb-4">Farm Gallery</h2>
                <div className="row g-4">
                    {imagePaths.map((imagePath, index) => (
                        <div className="col-12 col-sm-6 col-md-4" key={index}>
                            <img 
                                src={imagePath} 
                                alt={`Gallery Image ${index + 1}`} 
                                className="img-fluid rounded shadow-sm" 
                                style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Description Section */}
            <div className="bg-warning-subtle py-5">
                <div className="container">
                    <p className="text-center text-dark" style={{ fontSize: '1.05rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
                        We are passionate about producing premium cow-based products with the highest standards of quality and care. 
                        From our rich, creamy milk to our tender, flavorful beef, every product is the result of meticulous farming practices. 
                        We believe in raising cows in a natural, stress-free environment, which translates into healthier animals and better products. 
                        Our dairy offerings include fresh milk, butter, yogurt, and artisanal cheeses, while our beef products are known for their 
                        exceptional taste and texture. Every product we offer tells the story of sustainable farming and our dedication to 
                        bringing you the very best from nature’s bounty.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerHome;
