// Footer.js
import React from 'react';
import Logo from '../assets/logo.jpg'; // Import your Mandri Life logo
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto" >
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-left">
            <img src={Logo} alt="Logo" style={{ maxWidth: '100px' }} />
            <p>At Farm Management(Private) Ltd we love to hear your views about our products. We wish to know how you feel about our products, your suggestion and complain.</p>
          </div>
          <div className="col-md-3">
            <p>Farm Management</p>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Vision & Mission</li>
              <li>About us</li>
              <li>Products</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="col-md-3">
            <p>Products</p>
            <ul className="list-unstyled">
              <li>Milk</li>
              <li>Cheese</li>
              <li>waste soil</li>
             <Link to="/createfeedbacks"><p>Feedback</p></Link> 
            </ul>
          </div>
          <div className="col-md-3">
            <p>Contact us</p>
            <p>+94 77 171 3375</p>
            <p>info@farmmanagement.com</p>
            <p>Farm Management Private Limited, No 227/13 A, Nirmana Mw, Nawala Road, Nugegoda, Sri Lanka</p>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} Farm Management. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
