import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';  // For React 18+
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <Router>
    <App />
  </Router>
);
