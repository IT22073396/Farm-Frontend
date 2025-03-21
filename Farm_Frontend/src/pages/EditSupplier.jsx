import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditSupplier = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [supplierDetails,setSupplierDetails] = useState({
        name:"",
        email:"",
        registeredDate:"",
        location:"",
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setSupplierDetails({...supplierDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/suppliers/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({id,...supplierDetails}),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${supplierDetails.name}]`);
         setSupplierDetails({name:"",email:"",registeredDate:"",location:""});
         navigate("/allsuppliers");

        }else{
            toast.error(result.error);

        }
    }

    useEffect(() => {

        async function fetchSupplier() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/suppliers/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setSupplierDetails({
                name:result.name,
                email:result.email,
                registeredDate:result.registeredDate,
                location:result.location
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchSupplier()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Suppliers..."/>:(<>
        <h2>Edit Suppliers</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Suppliers Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Suppliers Name"  value={supplierDetails.name} onChange={handleInputChange}  required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Suppliers Email address</Form.Label>
        <Form.Control id="email" name="email" type="email" 
        placeholder="Enter Suppliers email" value={supplierDetails.email} onChange={handleInputChange} required/>

      </Form.Group>
      <Form.Group className="mb-3" controlId="registeredDate">
        <Form.Label>Registered Date</Form.Label>
        <Form.Control id="registeredDate" name="registeredDate" type="date" 
        placeholder="Enter Registered Date" value={supplierDetails.registeredDate} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="location">
        <Form.Label>Supplier Location</Form.Label>
        <Form.Control conid="location" name="location" type="text" 
        placeholder="Enter Supplier Location" value={supplierDetails.location} onChange={handleInputChange} required/>
      </Form.Group>
      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Save Changes
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>
    </>)}
    

    </>
    );
      };


export default EditSupplier;
