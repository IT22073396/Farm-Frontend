// Footer.js
import React from 'react';
import mandriLifeLogo from '../assets/mandri-logo_white.png'; // Import your Mandri Life logo
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto" >
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-left">
            <img src={mandriLifeLogo} alt="Mandri Life Logo" style={{ maxWidth: '100px' }} />
            <p>At Mandri Lanka (Private) Ltd we love to hear your views about our Mandri products. We wish to know how you feel about our products, your suggestion and complain.</p>
          </div>
          <div className="col-md-3">
            <p>Mandri Life</p>
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
              <li>Spices</li>
              <li>Essential Oil</li>
              <li>Herbal Products</li>
             <Link to="/createfeedbacks"><p>Feedback</p></Link> 
            </ul>
          </div>
          <div className="col-md-3">
            <p>Contact us</p>
            <p>+94 77 171 3375</p>
            <p>info@mandrilife.com</p>
            <p>Mandri Lanka Private Limited, No 227/13 A, Nirmana Mw, Nawala Road, Nugegoda, Sri Lanka</p>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} Mandri Life. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
