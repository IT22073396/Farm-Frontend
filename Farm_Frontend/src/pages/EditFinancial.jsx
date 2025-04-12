import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditFinancial = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [financialDetails,setFinancialDetails] = useState({
        id:"",
        dduration:"",
        tsale:"",
        tcost:"",
        cofPsales:""
    });
    
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setFinancialDetails({...financialDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/financials/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({id,...financialDetails}),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${financialDetails.name}]`);
         setUserDetails({id:"",dduration:"",tsale:"",tcost:"",cofPsales:""});
         navigate("/allfinancials");

        }else{
            toast.error(result.error);

        }
    }

    useEffect(() => {

        async function fetchFinancial() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/financials/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setFinancialDetails({
                id:result.id,
                dduration:result.dduration,
                tsale:result.tsale,
                tcost:result.tcost,
                cofPsales:result.cofPsales,

            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchFinancial()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Financials..."/>:(<>
        <h2>Edit Financial Reports Details</h2>
    
        <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control id="id" name="id" type="text" 
        placeholder="Enter Financial ID"  value={financialDetails.id} onChange={handleInputChange}  required/>
      </Form.Group>

        <Form.Group className="mb-3"  controlId="dduration">
        <Form.Label>Day Duration</Form.Label>
        <Form.Control id="dduration" name="dduration" type="number" 
        placeholder="Enter Day Duration"  value={financialDetails.dduration} onChange={handleInputChange}  required/>
      </Form.Group>S
      <Form.Group className="mb-3" controlId="tsale">
        <Form.Label>Total Sales(USD)</Form.Label>
        <Form.Control id="tsale" name="tsale" type="number" 
        placeholder="Enter Total Sales" value={financialDetails.tsale} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="tcost">
        <Form.Label>Total Cost(USD)</Form.Label>
        <Form.Control id="tcost" name="tcost" type="number" 
        placeholder="Enter Total Cost" value={financialDetails.tcost} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="cofPsales">
        <Form.Label>Count of Product Sales</Form.Label>
        <Form.Control id="cofPsales" name="cofPsales" type="number" 
        placeholder="Enter Count of Product Sales" value={financialDetails.cofPsales} onChange={handleInputChange} required/>
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


export default EditFinancial;