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
        <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f9f9f9" }}>
            {/* Hero Banner Section */}
            <div style={{ position: 'relative', height: '55vh', overflow: 'hidden' }}>
                <img 
                    src={contactBanner} 
                    alt="Contact Us Banner" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    textAlign: 'center',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '700', textShadow: '2px 2px 8px rgba(0,0,0,0.4)' }}>
                        Contact Us
                    </h1>
                    <p style={{ fontSize: '1.2rem', textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
                        We’re here to help and answer any question you might have.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <Container style={{ padding: '60px 15px' }}>
                <Row className="justify-content-center text-center mb-5">
                    <Col lg={8}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#222' }}>
                            Call Center Reservation
                        </h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#555' }}>
                            At Farm Lanka (Private) Ltd, we value your feedback. Whether it's a suggestion, compliment, or concern, we’d love to hear from you.
                        </p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={10} lg={6}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '40px 30px',
                            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)'
                        }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <ContactItem 
                                    icon={faPhone}
                                    title="Phone"
                                    content="+94 77 171 3375"
                                />
                                <ContactItem 
                                    icon={faEnvelope}
                                    title="Email"
                                    content="info@farmlife.com"
                                />
                                <ContactItem 
                                    icon={faMapMarkerAlt}
                                    title="Address"
                                    content="Farm Lanka (Pvt) Ltd, No 227/13 A, Nirmana Mw, Nawala Rd, Nugegoda, Sri Lanka"
                                />
                                <li style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                                    <span style={{ color: '#444', fontSize: '1.2rem', fontWeight: '600', marginRight: '15px' }}>
                                        Follow Us:
                                    </span>
                                    <FontAwesomeIcon 
                                        icon={faInstagram} 
                                        style={{ color: '#E1306C', fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }}
                                        onClick={handleInstagramClick}
                                    />
                                    <FontAwesomeIcon 
                                        icon={faFacebook} 
                                        style={{ color: '#4267B2', fontSize: '1.8rem', cursor: 'pointer' }}
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

const ContactItem = ({ icon, title, content }) => (
    <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px' }}>
        <FontAwesomeIcon 
            icon={icon} 
            style={{ fontSize: '1.5rem', color: '#0d6efd', marginRight: '15px', marginTop: '4px' }} 
        />
        <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '4px', color: '#333' }}>
                {title}
            </h3>
            <p style={{ fontSize: '1rem', color: '#666', margin: 0 }}>
                {content}
            </p>
        </div>
    </li>
);

export default ContactUs;
