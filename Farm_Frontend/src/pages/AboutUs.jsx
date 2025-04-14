import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Stack } from 'react-bootstrap';
import backmain1 from "../assets/backmain1.jpg";
import aboutImage from "../assets/about.jpg";

const AboutUs = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    return (
        <div style={{ position: 'relative' }}>
            {/* Hero Banner Section */}
            <div style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
                <img 
                    src={backmain1} 
                    alt="About Us Banner" 
                    style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.7)'
                    }} 
                />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                    width: '100%'
                }}>
                    <h1 style={{ 
                        fontSize: 'clamp(2rem, 5vw, 4rem)', 
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        About Us
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <Container style={{ padding: '40px 15px' }}>
                <Row className="align-items-center g-5">
                    <Col lg={6}>
                        <div style={{ padding: '20px' }}>
                            <h1 style={{ 
                                marginBottom: '25px',
                                color: '#333',
                                fontSize: '2.5rem',
                                fontWeight: '600'
                            }}>
                                Mandri Story
                            </h1>
                            <p style={{ 
                                fontSize: '1.1rem',
                                lineHeight: '1.8',
                                color: '#555'
                            }}>
                                We started a simple business adding value to cinnamon productions made from our own cinnamon plantation, 
                                selling in the Sri Lanka tourist market and local retail market since 2010. Our products include Ceylon 
                                Cinnamon, Black Pepper, Cinnamon Oils, and Cinnamon Herbal products, and have completed twelve years 
                                of business in Sri Lanka. Our business grew significantly, leading us to venture into the export market. 
                                Our newest addition is introducing Sri Lankan handicrafts to the world.
                                <br/><br/>
                                Mandri Lanka Private Limited was registered in 2014 under the Company of Registrars in Sri Lanka. 
                                'Mandri' is the patented logo of Mandri Lanka Private Limited. At Mandri, we focus on specific client 
                                requirements and meet niche market opportunities.
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <img 
                            src={aboutImage} 
                            alt="About Us" 
                            style={{ 
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }} 
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AboutUs;