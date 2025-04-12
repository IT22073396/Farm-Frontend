import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import backgroundImage from "../assets/vision.jpg"; // Import your background image
import image1 from "../assets/22.jpg";
import image2 from "../assets/221.jpg";
import image3 from "../assets/a2.jpg";
import image4 from "../assets/a11.jpg";
import image5 from "../assets/a11-1.jpg";
import image6 from "../assets/a13.jpg";
import image7 from "../assets/a22.jpg";
import image8 from "../assets/about.jpg";
import image9 from "../assets/leaf-oil417x278.jpg";

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

    return (
        <div className="container mt-4">
            <div
                className="row mb-4"
                style={{
                    backgroundImage: `url(${backgroundImage})`, // Set background image
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white", // Set text color to white
                    textAlign: "center", // Align text to center
                    padding: "50px 0", // Add vertical padding for better visibility
                }}
            >
                <div className="col-md-12">
                    <h1>Vision & Mission</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h2 className="mt-4">OUR VISION</h2>
                    <p>
                        To offer authentic, high quality, Sri Lankan Ceylon Cinnamon, Black Pepper, Spices and Essential Oils that improve people’s quality of life  Make it possible for all our international customers to harness the best and the most natural Ceylon Cinnamon and spices.
                    </p>
                    <h2 className="mt-4">OUR MISSION</h2>
                    <p>
                        To be the largest producer and exporter of value added Ceylon Cinnamon, Black Pepper and Essential Oils, together with inspiring small growers for adopting best cultivation practices and manufacturing technologies.
                    </p>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        {[image1, image2, image3, image4, image5, image6, image7, image8, image9].map((image, index) => (
                            <div className="col-md-4" key={index}>
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    className="img-fluid mb-4"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body>
                    <img src={selectedImage} alt="Selected Image" className="img-fluid" />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Vision;
