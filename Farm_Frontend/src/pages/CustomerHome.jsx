import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from 'react-bootstrap';

// Import images directly
import customerhomepic from "../assets/IMG_3025.jpg";
import barkoil from '../assets/a1-2.jpg';
import mosquitoil from '../assets/a1-5.jpg';
import herbalbalm from '../assets/a1-3.jpg';
import homelogo from '../assets/homelogo.jpg';

// Import gallery images
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import image8 from '../assets/image8.jpeg';
import image9 from '../assets/image9.jpeg';

const CustomerHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    // Array of imported gallery images
    const galleryImages = [
        image1, image2, image3,
        image4, image5, image6,
        image7, image8, image9
    ];

    return (
        <Container style={{ marginTop: '100px', padding: '0 15px' }}>
            {/* Hero Section */}
            <Row className="align-items-center mb-5">
                <Col md={6}>
                    <img 
                        src={homelogo} 
                        alt="Home Logo" 
                        style={{ 
                            width: '100%', 
                            maxWidth: '900px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }} 
                    />
                </Col>
                <Col md={6}>
                    <h2 style={{ color: 'orange', fontWeight: 'bold', marginBottom: '20px' }}>
                        Our Business
                    </h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                        Sri Lanka is naturally gifted for producing the best class Cinnamon, Black Pepper and Essential Oils. 
                        Cinnamon from Sri Lanka is commonly known as Ceylon Cinnamon. At Mandri Lanka, we provide the authentic 
                        Ceylon Cinnamon and Black Pepper at its pure grade to the world. We work with several known growers, 
                        hand pick the harvest from the fields and process at dedicated Cinnamon and Pepper Processing Centres. 
                        We do this to ensure that the quality is maintained across all channels until it reaches our valuable 
                        customers. We focus on Ceylon Cinnamon, Black Pepper Corn and Essential Oils. We ensure to stamp on 
                        our purity and expertise for what we offer you. This is our philosophy.
                    </p>
                </Col>
            </Row>

            {/* Gallery Section */}
            <div className="text-center mb-5">
                <h2 style={{ marginBottom: '30px' }}>Mandrilife Gallery</h2>
                <Row className="g-4">
                    {galleryImages.map((image, index) => (
                        <Col key={index} xs={6} md={4} lg={3}>
                            <img 
                                src={image} 
                                alt={`Gallery ${index + 1}`} 
                                style={{ 
                                    width: '100%',
                                    height: '250px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }} 
                            />
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Cinnamon Comparison Section */}
            <div className="text-center mb-4">
                <h2>How do you differentiate the True Ceylon Cinnamon Vs Cassia Cinnamon?</h2>
            </div>
            
            <div style={{ 
                backgroundColor: '#FFF9E6', 
                padding: '30px',
                borderRadius: '8px',
                marginBottom: '50px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <Row className="g-4">
                    <Col md={6}>
                        <div style={{ 
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            height: '100%'
                        }}>
                            <h5 style={{ color: '#D35400', marginBottom: '20px' }}>CEYLON CINNAMON</h5>
                            <ul style={{ textAlign: 'left', listStyleType: 'circle', paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '10px' }}>A highly valued culinary and medicinal spice. Price can be up to 10 times more than the Cassia/Chinese cinnamon.</li>
                                <li style={{ marginBottom: '10px' }}>Contains a small, negligible amount of coumarin, a naturally occurring blood-thinning substance. Recommended for regular use, eg for correcting blood sugar level.</li>
                                <li>Tan brown in colour.</li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div style={{ 
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            height: '100%'
                        }}>
                            <h5 style={{ color: '#D35400', marginBottom: '20px' }}>CASSIA/CHINESE CINNAMON</h5>
                            <ul style={{ textAlign: 'left', listStyleType: 'circle', paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '10px' }}>Commonly available and very cheap. You get a bag of the sticks for less than a dollar.</li>
                                <li style={{ marginBottom: '10px' }}>Contains a high level of coumarin content which can be harmful for the liver and kidney when consumed daily or regularly. Not a concern for occasional use. (Note: Saigon Cinnamon, a type of cinnamon from Vietnam that shares a similar appearance with Cassia, also contains a relatively high level of Coumarin.</li>
                                <li>Reddish dark brown.</li>
                            </ul>
                        </div>
                    </Col>
                </Row>

                <p style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}>
                    Ceylon Cinnamon is called Sweet, Good Cinnamon or Real cinnamon in the market. This is an authentic product from Sri Lanka, the bark from the plant called Cinnamomum Zeylanicum. The sticks are filled a cigar type several folded layers.

                    In case of ground cinnamon, it is very difficult to distinguish between the two unless you are an expert, especially at sniffing spices. However, there is no guarantee that the result will be one hundred percent accurate. In case of sticks, it is easier to differentiate between the two. The following table and pictures highlight some of the differences which shall help you to choose the correct type.

                    Most bottled or packaged ground cinnamon does not mention its type or origin. It is, therefore, difficult to ascertain its type and origin or the country or plant. The best course is to identify the sticks and make sure that you are buying the Ceylon variety. Once you get hold of the real "thing", use your blender to crush it into powder.
                </p>
            </div>
        </Container>
    );
};

export default CustomerHome;