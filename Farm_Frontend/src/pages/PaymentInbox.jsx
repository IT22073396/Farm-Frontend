import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const PaymentInbox = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/paymentmailsupp"
        );
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
      await axios.delete(`http://localhost:4000/api/paymentmailsupp/${id}`);
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
      <h2 className="mb-4">Payment Mail List</h2>
      <ul className="list-group">
        {mails.map((mail) => (
          <li key={mail._id} className="list-group-item">
            <p> <strong>Bank Details :</strong>{mail.supplierBankDetails}</p>
            <p>
              <strong>Amount:</strong> {mail.amount}
            </p>
            <p>
              <strong>Deadline Date:</strong>{" "}
              {new Date(mail.deadlineDate).toLocaleDateString()}
            </p>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(mail._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentInbox;
