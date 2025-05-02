import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) navigate("/login", { replace: true });
    }, [user, navigate]);

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f9f9f9" }}>
            {/* Hero Section */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "55vh",
                    backgroundImage: `url(/src/assets/backmain1.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textShadow: "2px 2px 6px rgba(0,0,0,0.6)"
                }}
            >
                <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "700" }}>About Us</h1>
            </div>

            {/* Content Section */}
            <div className="container py-5">
                <div className="row align-items-center">
                    {/* Text Section */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h2 className="fw-bold mb-4" style={{ color: "#2c3e50" }}>Our Story</h2>
                        <p style={{ lineHeight: "1.8", fontSize: "1.1rem", color: "#555" }}>
                            Farm Lanka (Private) Ltd began in 2010, adding value to milk products from our own cinnamon plantation. Since then, we’ve grown to serve both the local and international markets with a wide range of dairy goods and handcrafted items.
                            <br /><br />
                            Our range includes Fresh Milk, Yogurt, Cheese, and Butter. Officially registered in 2014, "Farm Lanka" is a proudly patented brand that stands for quality, authenticity, and care.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="col-md-6 text-center">
                        <img
                            src="/src/assets/about.jpg"
                            alt="About Mandri"
                            className="img-fluid rounded-4 shadow-sm"
                            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
