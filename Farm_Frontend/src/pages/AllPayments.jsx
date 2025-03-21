import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const AllPayments = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [payments,setPayments] = useState([]);
    const [searchInput,setSearchInput] = useState("");
  

    useEffect(() => {
        async function fetchPayment(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/payments',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setPayments(result.payments);
               setLoading(false);
            }else{
                console.log(result);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
        }
        fetchPayment();
    }, []);

    const deletePayment = async (id) => {
        if(window.confirm("Are you sure you want to delete this Payment?")){
            try {
                const res= await fetch(`http://localhost:4000/api/payments/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Payment");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/payments',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setPayments(result.payments);
               setLoading(false);
            }else{
                console.log(result);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }

                }else{
    
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
            }

        }
       
    }
    
    const handleSearchSubmit = (event) => {
      event.preventDefault();

      const newSearchPayment = payments.filter((payment) => 
      payment.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSearchPayment);

      setPayments(newSearchPayment);

    };
  

    return (<>
    <div style={{ backgroundColor: 'black', color: 'white',  padding: '20px' }}>
      This is the All Payments page
    <br></br>
    <a href="/allpayment" className="btn btn-danger my-2">Reload Payment</a>
    {loading ? <Spinner splash="Loading Payment..." /> : (
        (payments.length == 0 ? <h3>No Payments Added</h3>:<>
    <form className="d-flex justify-content-end align-items-center" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          className="form-control my-2"
          style={{ width: "400px" }} // Adjust width as needed
          placeholder="Search Payment"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      <Button id="Search" variant="primary" type="submit" className="btn btn-info ms-2">
        Search
      </Button>
    </form>



        <p>Total No of Payments:{payments.length}</p>
        <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>CardHolder Name</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>Issuing Bank</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && payments.map((payment) =>(
               <tr key={payment._id} onClick={()=> {
                setSelectedPayment({});
                setSelectedPayment(payment);
                setShowModal(true)}}>
               <td>{payment.name}</td>
               <td>{payment.number}</td>
               <td>{payment.expiryDate}</td>
               <td>{payment.issuingBank}</td>
             </tr>
  
          ))}
        </tbody>
      </Table> </>)
        
    )}
     <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={showModal} onHide={()=>{
        setShowModal(false)
      }}>
        <Modal.Header closeButton>
          {selectedPayment && <Modal.Title>Payment Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedPayment &&(
            <>
            <p><strong>CardHolder Name:</strong> {selectedPayment.name}</p>
          <p><strong>Card Number:</strong>{selectedPayment.number}</p>
          <p><strong>Expiry Date:</strong> {selectedPayment.expiryDate}</p>
          <p><strong>Issuing Bank:</strong>{selectedPayment.issuingBank}</p>
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deletePayment(selectedPayment._id)
          }}>Delete</Button>
          <Button id="btn btn-warning" variant="secondary" onClick={()=>{
            setShowModal(false)
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </>
    );
      }


export default AllPayments;
