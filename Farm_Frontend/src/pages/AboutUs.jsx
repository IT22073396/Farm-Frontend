import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const AboutUs = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        !user && navigate("/login", {replace:true });
    },[]);

    return (
    <div style={{ position: 'relative' }}>
    <h1 style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', fontSize: '5em', fontWeight: 'bold' }}>About Us</h1>
    <img src="/src/assets/backmain1.jpg" alt="Contact Us" style={{ width: '100%', height: '80%', margin: 0, padding: 0 }} />
    
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '600px', textAlign: 'left', marginRight: '20px' }}>
                <h1 style={{ marginBottom: '20px' }}>Mandri Story</h1>
                <p>
                    We started a simple business adding value to cinnamon productions made from our own cinnamon plantation, selling in the Sri Lanka tourist market and local retail market since 2010. Our products include Ceylon Cinnamon, Black Pepper, Cinnamon Oils, and Cinnamon Herbal products, and have completed twelve years of business in Sri Lanka. Our business grew significantly, leading us to venture into the export market. Our newest addition is introducing Sri Lankan handicrafts to the world.
                    <br/><br/>
                    Mandri Lanka Private Limited was registered in 2014 under the Company of Registrars in Sri Lanka. 'Mandri' is the patented logo of Mandri Lanka Private Limited. At Mandri, we focus on specific client requirements and meet niche market opportunities.
                </p>
            </div>
            <img src="/src/assets/about.jpg" alt="About Us" style={{ maxWidth: '600px', height: 'auto' }} />
        </div>
        </div>
    );
};

export default AboutUs;
