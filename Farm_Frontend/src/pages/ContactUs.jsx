import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import contactBanner from "../assets/backmain1.jpg";

const ContactUs = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/your_instagram_account', '_blank');
    };

    const handleFacebookClick = () => {
        window.open('https://www.facebook.com/your_facebook_account', '_blank');
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Hero Banner Section */}
            <div style={{ 
                position: 'relative', 
                height: '50vh', 
                minHeight: '400px',
                overflow: 'hidden'
            }}>
                <img 
                    src={contactBanner} 
                    alt="Contact Us Banner" 
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
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        marginBottom: '20px'
                    }}>
                        Contact Us
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <Container style={{ padding: '50px 15px' }}>
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center mb-5">
                        <h2 style={{ 
                            fontSize: '2rem',
                            fontWeight: '600',
                            marginBottom: '20px',
                            color: '#333'
                        }}>
                            Call Center Reservation
                        </h2>
                        <p style={{ 
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: '#555',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            At Mandri Lanka (Private) Ltd we love to hear your views about our Mandri products. 
                            We wish to know how you feel about our products, your suggestions, and complaints.
                        </p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div style={{ 
                            backgroundColor: '#f8f9fa',
                            borderRadius: '10px',
                            padding: '30px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            <ul style={{ 
                                listStyleType: 'none', 
                                padding: 0,
                                margin: 0
                            }}>
                                <ContactItem 
                                    icon={faPhone}
                                    title="Phone"
                                    content="+94 77 171 3375"
                                />
                                <ContactItem 
                                    icon={faEnvelope}
                                    title="Email"
                                    content="info@mandrilife.com"
                                />
                                <ContactItem 
                                    icon={faMapMarkerAlt}
                                    title="Address"
                                    content="Mandri Lanka Private Limited, No 227/13 A, Nirmana Mw, Nawala Road, Nugegoda, Sri Lanka"
                                />
                                <li style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '25px'
                                }}>
                                    <span style={{ 
                                        color: '#6c757d',
                                        fontSize: '1.2rem',
                                        marginRight: '15px',
                                        fontWeight: '600'
                                    }}>
                                        Follow Us:
                                    </span>
                                    <FontAwesomeIcon 
                                        icon={faInstagram} 
                                        style={{ 
                                            color: '#E1306C',
                                            fontSize: '1.8rem',
                                            marginRight: '15px',
                                            cursor: 'pointer'
                                        }} 
                                        onClick={handleInstagramClick}
                                    />
                                    <FontAwesomeIcon 
                                        icon={faFacebook} 
                                        style={{ 
                                            color: '#4267B2',
                                            fontSize: '1.8rem',
                                            cursor: 'pointer'
                                        }} 
                                        onClick={handleFacebookClick}
                                    />
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// Helper component for contact items
const ContactItem = ({ icon, title, content }) => (
    <li style={{ 
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'flex-start'
    }}>
        <FontAwesomeIcon 
            icon={icon} 
            style={{ 
                color: '#6c757d',
                fontSize: '1.5rem',
                marginRight: '15px',
                marginTop: '3px'
            }} 
        />
        <div>
            <h3 style={{ 
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '5px',
                color: '#333'
            }}>
                {title}
            </h3>
            <p style={{ 
                fontSize: '1.1rem',
                color: '#555',
                margin: 0
            }}>
                {content}
            </p>
        </div>
    </li>
);

export default ContactUs;