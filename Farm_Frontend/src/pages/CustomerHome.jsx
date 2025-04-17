import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import customerhomepic from "../assets/IMG_3025.jpg";
import barkoil from '../assets/a1-2.jpg';
import mosquitoil from '../assets/a1-5.jpg';
import herbalbalm from '../assets/a1-3.jpg';

const CustomerHome = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    useEffect(()=>{
        !user && navigate("/login", {replace:true });

    },[]);

    // Array of image paths
    const imagePaths = [
        "/src/assets/image1.jpeg",
        "/src/assets/image2.jpeg",
        "/src/assets/image3.jpeg",
        "/src/assets/image4.jpeg",
        "/src/assets/image5.jpeg",
        "/src/assets/image6.jpeg",
        "/src/assets/image7.jpeg",
        "/src/assets/image8.jpeg",
        "/src/assets/image9.jpeg",
    ];

    return (
        <div style={{ marginTop: '100px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/src/assets/homelogo.jpg" alt="Home Logo" style={{ width: '900px', marginRight: '20px' }} />
                <div>
                    <h2 style={{ color: 'orange', fontWeight: 'bold' }}>Our Business</h2>
                    <p style={{ fontSize: '18px' }}>Sri Lanka is naturally gifted for producing the best class Cinnamon, Black Pepper and Essential Oils. Cinnamon from Sri Lanka is commonly known as Ceylon Cinnamon. At Mandri Lanka, we provide the authentic Ceylon Cinnamon and Black Pepper at its pure grade to the world. We work with several known growers, hand pick the harvest from the fields and process at dedicated Cinnamon and Pepper Processing Centres. We do this to ensure that the quality is maintained across all channels until it reaches our valuable customers. We focus on Ceylon Cinnamon, Black Pepper Corn and Essential Oils. We ensure to stamp on our purity and expertise for what we offer you. This is our philosophy.</p>
                </div>
            </div>
            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Mandrilife Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px', marginTop: '20px' }}>
                {/* Map over the array of image paths */}
                {imagePaths.map((imagePath, index) => (
                    <img key={index} src={imagePath} alt={`Image ${index + 1}`} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>How do you differentiate the True Ceylon Cinnamon Vs Cassia Cinnamon?</h2>
            </div>
            
            <div style={{ backgroundColor: 'lightyellow', width: '100%', padding: '20px 0', marginTop: '50px' }}>
               
               
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginTop: '20px' }}>
                    <ul style={{ textAlign: 'left', listStyleType: 'circle', width: '45%' }}>
                        <li><h5>CEYLON CINNAMON</h5></li>
                        <li>A highly valued culinary and medicinal spice. Price can be up to 10 times more than the Cassia/Chinese cinnamon.</li>
                        <li>Contains a small, negligible amount of coumarin, a naturally ocurring blood-thinning substance. Recommended for regular use, eg for correcting blood sugar level.</li>
                        <li>Tan brown in colour.</li>
                    </ul>
                    <ul style={{ textAlign: 'left', listStyleType: 'circle', width: '45%' }}>
                        <li><h5>CASSIA/CHINESE CINNAMON</h5></li>
                        <li>Commonly available and very cheap. You get a bag of the sticks for less than a dollar.</li>
                        <li>Contains a high level of coumarin content which can be harmful for the liver and kidney when consumed daily or regularly. Not a concern for occasional use. (Note: Saigon Cinnamon, a type of cinnamon from Vietnam that shares a similar appearance with Cassia, also contains a relatively high level of Coumarin.</li>
                        <li>Reddish dark brown.</li>
                    </ul>
                </div>
                <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '20px' }}>
                   

Ceylon Cinnamon is called Sweet, Good Cinnamon or Real cinnamon in the market. This is an authentic product from Sri Lanka, the bark from the plant called Cinnamomum Zeylanicum. The sticks are filled a cigar type several folded layers.

In case of ground cinnamon, it is very difficult to distinguish between the two unless you are an expert, especially at sniffing spices. Howler, there is no guarantee that the result will be one hundred percent accurate. However, in case of sticks, it is easier to differentiate between the two. The following table and pictures highlight some of the differences which shall help you to choose the correct type.

Most bottled or packaged ground cinnamon does not mention its type or origin. It is, therefore, difficult to ascertain its type and origin or the country or plant. The best course is to identify the sticks and make sure that you are buying the Ceylon variety. Once you get hold of the real “thing”, use your blender to crush it into powder

                </p>
            </div>
        </div>
    );
};

export default CustomerHome;
