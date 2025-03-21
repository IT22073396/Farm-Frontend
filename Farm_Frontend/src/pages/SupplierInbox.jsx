import { useContext, useEffect, useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";


const SupplierInbox = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const [mails, setMails] = useState([]);
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        async function fetchMails() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/mails', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setMails(result.mails);
                    setLoading(false);
                } else {
                    console.log(result);
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        fetchMails();
    }, []);

    const deleteMail = async (id) => {
        if (window.confirm("Are you sure you want to delete this Mail?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/mails/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, }
                })
                const result = await res.json();
                if (!result.error) {
                    toast.success("Deleted Mail");
                    setShowModal(false);
                    setMails(mails.filter(mail => mail._id !== id));
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const newSearchMail = mails.filter((mail) =>
            mail.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        console.log(newSearchMail);

        setMails(newSearchMail);
    };

    return (
        <>
            <a href="/supplierinbox" className="btn btn-danger my-2">Reload Mails</a>
            {loading ? <Spinner splash="Loading Mails..." /> : (
                (mails.length === 0 ? <h3>No Mails Added</h3> : <>
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="searchInput"
                            id="searchInput"
                            className="form-control my-2"
                            placeholder="Search Mail"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button id="Search" variant="primary" type="submit" className="btn btn-info mx-2">
                            Search
                        </Button>{' '}
                    </form>
                    <p>Total No of Mails: {mails.length}</p>
                    <ul>
                        {mails.map((mail) => (
                            <li key={mail._id} onClick={() => {
                                setSelectedMail(mail);
                                setShowModal(true);
                            }}>
                                {mail.name}
                            </li>
                        ))}
                    </ul>
                </>)
            )}
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        {selectedMail && <Modal.Title>Mail Details</Modal.Title>}
                    </Modal.Header>

                    <Modal.Body>
                        {selectedMail && (
                            <>
                                <p><strong>Name:</strong> {selectedMail.name}</p>
                                <p><strong>Description:</strong>{selectedMail.description}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="btn btn-danger" variant="primary" onClick={() => deleteMail(selectedMail._id)}>
                            Delete
                        </Button>
                        <Button id="btn btn-warning" variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default SupplierInbox;

