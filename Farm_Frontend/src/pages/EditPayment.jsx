import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditPayment = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [paymentDetails,setPaymentDetails] = useState({
        name:"",
        number:"",
        expiryDate:"",
        cvv:"",
        issuingBank:"",
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setPaymentDetails({...paymentDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/payments/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({id,...paymentDetails}),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${paymentDetails.name}]`);
         setUserDetails({name:"",number:"",expiryDate:"",cvv:"",issuingBank:""});
         navigate("/allpayments");

        }else{
            toast.error(result.error);

        }
    }

    useEffect(() => {

        async function fetchPayment() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/payments/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setPaymentDetails({
                name:result.name,
                number:result.number,
                expiryDate:result.expiryDate,
                cvv:result.cvv,
                issuingBank:result.issuingBank,
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchPayment()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Payments..."/>:(<>
        <h2>Edit Payment Details</h2>
    
        <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>CardHolder Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter CardHolder Name"  value={paymentDetails.name} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="number">
        <Form.Label>Card Number</Form.Label>
        <Form.Control id="number" name="number" type="number" 
        placeholder="Enter Card Number" value={paymentDetails.number} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="expiryDate">
        <Form.Label>Expiry Date</Form.Label>
        <Form.Control id="expiryDate" name="expiryDate" type="date" 
        placeholder="Enter Expiry Date" value={paymentDetails.expiryDate} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="cvv">
        <Form.Label>CVV</Form.Label>
        <Form.Control id="cvv" name="cvv" type="number" 
        placeholder="Enter CVV" value={paymentDetails.cvv} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="issuingBank">
        <Form.Label>Issuing Bank </Form.Label>
        <Form.Control id="issuingBank" name="issuingBank" type="text" 
        placeholder="Enter Issuing Bank" value={paymentDetails.issuingBank} onChange={handleInputChange} required/>
      </Form.Group>


    
    
      <Button id="btn" name="submit" variant="primary" type="submit">
        Confirm Changes
      </Button>
   
      
      <Form.Group >
        
      </Form.Group>
    </Form>
    </>)}
    

    </>
    );
      };


export default EditPayment;
