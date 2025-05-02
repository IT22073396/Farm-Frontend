import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import home1 from "../assets/home1.jpg"; // Use import instead of direct path
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import image8 from "../assets/image8.jpeg";
import image9 from "../assets/image9.jpeg";

const CustomerHome = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const imagePaths = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

  return (
    <div style={{ marginTop: '100px', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <img src={home1} alt="Home" style={{ width: '100%', maxWidth: '600px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#FF8C00', fontWeight: '700' }}>Our Business</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
            Sri Lanka is naturally gifted for producing the best class Cinnamon, Black Pepper and Essential Oils. 
            At Mandri Lanka, we provide authentic Ceylon Cinnamon and Black Pepper at its pure grade to the world. 
            We ensure quality is maintained across all channels until it reaches our valuable customers.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <h2 style={{ textAlign: 'center', marginTop: '60px', fontWeight: '600', color: '#444' }}>Mandrilife Gallery</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {imagePaths.map((img, index) => (
          <img key={index} src={img} alt={`Gallery ${index + 1}`} style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
          }} />
        ))}
      </div>

      {/* Comparison Section */}
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <h2 style={{ fontWeight: '600', color: '#444' }}>
          How do you differentiate the True Ceylon Cinnamon Vs Cassia Cinnamon?
        </h2>
      </div>

      <div style={{ backgroundColor: '#FFF8E1', borderRadius: '10px', padding: '30px', marginTop: '30px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
          <ul style={{ flex: 1, listStyleType: 'disc', paddingLeft: '20px', fontSize: '15px', color: '#333' }}>
            <li><strong>CEYLON CINNAMON</strong></li>
            <li>Highly valued and medicinal, up to 10× more expensive than Cassia.</li>
            <li>Contains negligible coumarin. Safe for daily use.</li>
            <li>Tan brown in color.</li>
          </ul>
          <ul style={{ flex: 1, listStyleType: 'disc', paddingLeft: '20px', fontSize: '15px', color: '#333' }}>
            <li><strong>CASSIA / CHINESE CINNAMON</strong></li>
            <li>Cheap and widely available.</li>
            <li>High coumarin content — harmful with regular use.</li>
            <li>Reddish dark brown in color.</li>
          </ul>
        </div>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
          Ceylon Cinnamon, known as “Real Cinnamon,” comes from the bark of the *Cinnamomum Zeylanicum* plant in Sri Lanka.
          It forms delicate cigar-like layers. Ground cinnamon is harder to differentiate without expertise, but stick form offers visual clues. 
          When unsure, buy the sticks and grind them yourself for authenticity.
        </p>
      </div>
    </div>
  );
};

export default CustomerHome;
