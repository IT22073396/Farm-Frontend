import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import backgroundImage from "../assets/vision.jpg";
import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.webp";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.webp";
import image9 from "../assets/image9.webp"; 

const Vision = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

    return (
        <div className="container py-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            {/* Header Section */}
            <div
                className="mb-5 rounded text-white text-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "80px 20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
            >
                <h1 style={{ fontWeight: '700' }}>Vision & Mission</h1>
            </div>

            {/* Content Section */}
            <div className="row align-items-start">
                <div className="col-md-6 mb-4">
                    <h2 className="text-primary fw-bold">Our Vision</h2>
                    <p className="text-muted" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                        To offer authentic, high quality, Sri Lankan Ceylon Milk, Black Pepper, Spices and Essential Oils that improve people’s quality of life.
                        Make it possible for all our international customers to harness the best and the most natural Ceylon Milk.
                    </p>

                    <h2 className="text-success fw-bold mt-5">Our Mission</h2>
                    <p className="text-muted" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                        To be the largest producer and exporter of value-added Ceylon Milk, Youget and Chese, while inspiring small growers to adopt best cultivation practices and modern manufacturing technologies.
                    </p>
                </div>

                {/* Image Grid Section */}
                <div className="col-md-6">
                    <div className="row g-3">
                        {images.map((image, index) => (
                            <div className="col-6 col-sm-4" key={index}>
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="img-fluid rounded shadow-sm"
                                    style={{ cursor: "pointer", height: '120px', objectFit: 'cover' }}
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for Image Preview */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className="p-0">
                    <img src={selectedImage} alt="Preview" className="img-fluid rounded" />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Vision;
