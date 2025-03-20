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
           
            <p>Farm Management </p>
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
              <li>Dairy</li>
              
             <Link to="/createfeedbacks"><p>Feedback</p></Link> 
            </ul>
          </div>
          <div className="col-md-3">
            <p>Contact us</p>
            <p>+94 77 171 3375</p>
            <p>farmmangement@gmail.com</p>
            <p>Farm management pvt ltd, No 227/13 A, Nirmana Mw, Nawala Road, Nugegoda, Sri Lanka</p>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} Farm Management. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
