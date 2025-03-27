import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
//test for commit
const TransportInbox = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/transportmailsupp");
        setMails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mails:", error);
      }
    };
    fetchMails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/transportmailsupp/${id}`);
      setMails(mails.filter((mail) => mail._id !== id));
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Transport Mail List</h2>
      <ul className="list-group">
        {mails.map((mail) => (
          <li key={mail._id} className="list-group-item">
            <h3>{mail.productName}</h3>
            <p><strong>Address:</strong> {mail.address}</p>
            <p><strong>Product Quantity:</strong> {mail.productQuantity}</p>
            <p><strong>PickUp Date:</strong> {new Date(mail.pickUpDate).toLocaleDateString()}</p>
            <p><strong>PickUp Time:</strong> {mail.pickUpTime}</p>
            <button className="btn btn-danger" onClick={() => handleDelete(mail._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransportInbox;