import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Payments Report", 20, 10);
    
        const tableColumn = ["CardHolder Name", "Card Number", "Expiry Date", "Issuing Bank"];
        const tableRows = [];
    
        payments.forEach(payment => {
            const paymentData = [
                payment.name,
                payment.number,
                payment.expiryDate,
                payment.issuingBank
            ];
            tableRows.push(paymentData);
        });
    
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });
    
        doc.save("payments_report.pdf");
    };
  

    return (<>
    <div style={{ backgroundColor: 'black', color: 'white',  padding: '20px' }}>
      This is the All Payments page
    <br></br>

    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <Button
        variant="secondary"
        onClick={generatePDF}
        style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
        }}
    >
        Generate PDF Report
    </Button>

    <a href="/allpayment" className="btn btn-danger my-2">Reload Payment</a>
</div>


    {loading ? <Spinner splash="Loading Payment..." /> : (
        (payments.length == 0 ? <h3>No Payments Added</h3>:<>
        <div className="d-flex justify-content-end">
        <form className="d-flex" onSubmit={handleSearchSubmit}>
        </form>
        </div>



  <div className="d-flex justify-content-end">
  <form className="d-flex" onSubmit={handleSearchSubmit}>
    <input
      type="text" 
      name="searchInput" 
      id="searchInput"  
      className="form-control my-2" 
      style={{ width: '450px' }} // Adjust width as needed
      placeholder="Search Payment"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
    <Button
      id="Search" lo
      variant="primary"
      type="submit"
      className="mx-2"
      style={{
        background: 'linear-gradient(45deg, #ff7e5f, #feb47b)', /* Gradient background */
        color: 'white', /* Text color */
        border: '2px solid transparent', /* Invisible border to prevent distortion */
        borderRadius: '50px', /* Rounded corners for a smooth look */
        padding: '12px 25px', /* Spacing inside the button */
        fontSize: '16px', /* Text size */
        fontWeight: 'bold', /* Make text bold */
        textTransform: 'uppercase', /* Capitalize the text */
        letterSpacing: '1px', /* Spacing between letters */
        boxShadow: '0 6px 12px rgba(100, 115, 255, 0.41)', /* Shadow effect */
        transition: 'all 0.4s ease-in-out', /* Smooth transition effect */
        cursor: 'pointer', /* Pointer cursor to indicate it's clickable */
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'linear-gradient(45deg, #feb47b, #ff7e5f)'; /* Reverse gradient on hover */
        e.target.style.boxShadow = '0 8px 16px rgba(255, 165, 100, 0.5)'; /* Increased shadow effect */
        e.target.style.transform = 'scale(1.05)'; /* Slight zoom effect */
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'linear-gradient(45deg, #ff7e5f, #feb47b)'; /* Reset gradient */
        e.target.style.boxShadow = '0 6px 12px rgba(255, 165, 100, 0.3)'; /* Reset shadow */
        e.target.style.transform = 'scale(1)'; /* Reset zoom effect */
      }}
      onFocus={(e) => e.target.style.border = '2px solid #ff7e5f'} /* Highlight with border when focused */
      onBlur={(e) => e.target.style.border = '2px solid transparent'} /* Remove border on blur */
    >
      Search
    </Button>
    {' '}
  </form>
</div>

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
