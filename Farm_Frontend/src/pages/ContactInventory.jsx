import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const ContactInventory = () => {
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [tMailDetails,setTMailDetails] = useState({
        name:"",
        description:""
       
    });
    const navigate = useNavigate();
 

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setTMailDetails({ ...tMailDetails, [name]: value });
  }
  

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/tmails',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(tMailDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${tMailDetails.name}]`);

          setTMailDetails({name:"",description:""});
        }else{
          
            toast.error(result.error);

        }
    };

    return (
        <>
            <h2>Contact Inventory Manager</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label> Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter email Name" value={tMailDetails.name} onChange={handleInputChange} required />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" rows={5} placeholder="Enter description" value={tMailDetails.description} onChange={handleInputChange} required />
                </Form.Group>
               
                <Button variant="primary" type="submit">
                    Send mail
                </Button>
            </Form>
        </>
    );
};

export default ContactInventory;