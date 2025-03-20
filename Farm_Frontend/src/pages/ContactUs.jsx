import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';



const ContactUs = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        !user && navigate("/login", {replace:true });
    },[]);

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/your_instagram_account', '_blank');
    };

    const handleFacebookClick = () => {
        window.open('https://www.facebook.com/your_facebook_account', '_blank');
    };

    return (
        <div style={{ position: 'relative' }}>
            <h1 style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', fontSize: '5em', fontWeight: 'bold' }}>Contact Us</h1>
            <img src="/src/assets/backmain1.jpg" alt="Contact Us" style={{ width: '100%', height: '80%', margin: 0, padding: 0 }} />
            <div style={{ padding: '20px', textAlign: 'center', color: 'black', fontSize: '1.2em' }}>
                <h1 style={{ fontSize: '2em' }}>Call Center Reservation</h1>
                <p style={{ wordWrap: 'break-word' }}>At Mandri Lanka (Private) Ltd we love to hear your views about our Mandri products. We wish to know how you feel about our products, your suggestions, and complaints.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', fontSize: '1.2em' }}>
                    <li style={{ marginBottom: '10px' }}>
                        <strong>Phone</strong>: +94 77 171 3375
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <strong>Email</strong>: info@mandrilife.com
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <strong>Address</strong>: Mandri Lanka Private Limited, No 227/13 A, Nirmana Mw, Nawala Road, Nugegoda, Sri Lanka
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <strong>Follow</strong>: 
                        <FontAwesomeIcon icon={faInstagram} style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleInstagramClick} />
                        <FontAwesomeIcon icon={faFacebook} style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleFacebookClick} />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ContactUs;
