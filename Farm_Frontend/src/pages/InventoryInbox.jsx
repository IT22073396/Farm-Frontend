import { useContext, useEffect, useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";


const InventoryInbox = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedTMail, setSelectedTMail] = useState(null);
    const [tmails, setTMails] = useState([]);
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        async function fetchTMails() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/tmails', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setTMails(result.tmails);
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
        fetchTMails();
    }, []);

    const deleteTMail = async (id) => {
        if (window.confirm("Are you sure you want to delete this Mail?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/tmails/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, }
                })
                const result = await res.json();
                if (!result.error) {
                    toast.success("Deleted Mail");
                    setShowModal(false);
                    setTMails(tmails.filter(tmail => tmail._id !== id));
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

        const newSearchTMail = tmails.filter((tmail) =>
            tmail.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        console.log(newSearchTMail);

        setTMails(newSearchTMail);
    };

    return (
        <>
            <p>This is the Inbox page</p>
            <a href="/inventortyrinbox" className="btn btn-danger my-2">Reload Mails</a>
            {loading ? <Spinner splash="Loading Mails..." /> : (
                (tmails.length === 0 ? <h3>No Mails Added</h3> : <>
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
                    <p>Total No of Mails: {tmails.length}</p>
                    <ul>
                        {tmails.map((tmail) => (
                            <li key={tmail._id} onClick={() => {
                                setSelectedTMail(tmail);
                                setShowModal(true);
                            }}>
                                {tmail.name}
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
                        {selectedTMail && <Modal.Title>Mail Details</Modal.Title>}
                    </Modal.Header>

                    <Modal.Body>
                        {selectedTMail && (
                            <>
                                <p><strong>Name:</strong> {selectedTMail.name}</p>
                                <p><strong>Description:</strong>{selectedTMail.description}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="btn btn-danger" variant="primary" onClick={() => deleteTMail(selectedTMail._id)}>
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

export default InventoryInbox;

