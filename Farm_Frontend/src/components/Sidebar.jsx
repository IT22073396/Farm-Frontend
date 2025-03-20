import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { FaHome, FaChartBar, FaBars, FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons from react-icons library
import Dropdown from 'react-bootstrap/Dropdown';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <h2 className="text-light">Navigation</h2>
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link as={Link} to="/" className="d-flex align-items-center">
                        <FaHome className="me-2" /> Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                        <Dropdown.Toggle as={Nav.Link} className="d-flex align-items-center">
                            <FaChartBar className="me-2" /> Employees {dropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/dashboard/page1">Create Employees</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/dashboard/page2">All Employees</Dropdown.Item>
                            {/* Add more Dropdown.Item components for additional dropdown links */}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Item>
                {/* Add more Nav.Item components for additional links */}
            </Nav>
        </div>
    );
}

export default Sidebar;
