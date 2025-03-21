import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import createPackageImage from '../images/package.jpg';
import allPackagesImage from '../images/allpackages.jpg';
import leavesImage from '../images/leave2.jpg';

const DeliveryManagerHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    return (
        <>
            <h2 className="text-center">Welcome {user ? user.name : null} </h2>

            <Row className="gx-4">
                <Col xs={2} className="mb-4">

                <Link to="/createdeliveries">
                    <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                        <img id="createPackage" src={createPackageImage} alt="create-package" className="img-fluid" />
                    </Button>
                </Link>
                <p className="text-center mt-2">create Packages</p>
                </Col>

                <Col xs={2} className="mb-4">
                <Link to="/alldeliveries">
                    <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                        <img id="allPackages" src={allPackagesImage} alt="All-package" className="img-fluid" />
                    </Button>
                </Link>
                <p className="text-center mt-2">All Packages</p>
                </Col>

                <Col xs={2} className="mb-4">
                <Link to="/createleave">
                    <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                        <img id="allleaves" src={leavesImage} alt="All-leaves" className="img-fluid" />
                    </Button>
                </Link>
                <p className="text-center mt-2">All Leaves</p>
                </Col>
            </Row>

        </>
    );

    
}

export default DeliveryManagerHome;

