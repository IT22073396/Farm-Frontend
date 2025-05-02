import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) navigate("/login", { replace: true });
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "60vh",
                    backgroundImage: `url(/src/assets/backmain1.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.7)"
                }}
            >
                <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>About Us</h1>
            </div>

            {/* Content Section */}
            <div className="container py-5">
                <div className="row align-items-center">
                    {/* Text */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h2 className="fw-bold mb-3">Mandri Story</h2>
                        <p style={{ lineHeight: "1.8", fontSize: "1.05rem", color: "#555" }}>
                            We started a simple business adding value to cinnamon productions made from our own cinnamon plantation, selling in the Sri Lankan tourist and local retail markets since 2010.
                            <br /><br />
                            Our products include Ceylon Cinnamon, Black Pepper, Cinnamon Oils, and Cinnamon Herbal products. After twelve years of growth in Sri Lanka, we expanded into the export market and introduced Sri Lankan handicrafts to the world.
                            <br /><br />
                            Mandri Lanka Private Limited was officially registered in 2014. “Mandri” is a patented logo and brand name. At Mandri, we focus on meeting specific client needs and capturing niche markets with quality and care.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="col-md-6 text-center">
                        <img
                            src="/src/assets/about.jpg"
                            alt="About Mandri"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
