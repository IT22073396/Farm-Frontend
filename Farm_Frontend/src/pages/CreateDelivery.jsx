import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateDelivery = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [deliveryDetails,setDeliveryDetails] = useState({
        name:localStorage.getItem("name"),
        address:localStorage.getItem("address"),
        weight:"",
        courierName:"",
        status:"",
        email:"",
    });
    const [nameError,setNameError]=useState("");
    const[addressError,setAddressError]=useState("");
    const [weightError, setWeightError] = useState("");
    const [statuestError, setstatuesError] = useState("");
    const [courierNameError, setcourierNameError] = useState("");
    const [emailError, setemailError] = useState("");

    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setDeliveryDetails({...deliveryDetails, [name]: value});

        //real-time validation for name field
      switch(name){
        case "name": setNameError(validateName(value));
          break;
        case "address":setAddressError(validateAddress(value));
          break;
        case "weight": setWeightError(validateWeight(value));
          break;     
          case "statues": setstatuesError(validatestatues(value));
          break; 
          case "courierName": setcourierNameError(validatecourierName(value));
          break; 
          case "email": setemailError(validateemail(value));
          break;    
        default:
            break;
      }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/deliveries',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(deliveryDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${deliveryDetails.name}]`);

          setDeliveryDetails({name:localStorage.getItem("name"),address:localStorage.getItem("address"),weight:"",courierName:"",status:"",email:""});
        }else{
          
            toast.error(result.error);

        }

    }

    const validateName = (name) => {
      // Perform validation here, e.g., check if name is not empty
      if (name.trim() === "") {
          return "Name is required.";
      }

      // Return empty string if validation passes
      return "";
  }

  const validateAddress = (address) => {
    // Perform validation here, e.g., check if name is not empty
    if (address.trim() === "") {
        return "Address is required.";
    }

    // Return empty string if validation passes
    return "";
}
  const validateWeight = (weight) => {
    if (!/^\d*\.?\d+$/.test(weight)) {
      return "Weight must be a positive number.";
    }
  return "";
}
const validatecourierName = (courierName) => {
  // Perform validation here, e.g., check if name is not empty
  if (courierName.trim() === "") {
      return "CourierName is required.";
  }
    // Return empty string if validation passes
    return "";
}
  const validateemail = (email) => {
    // Perform validation here, e.g., check if name is not empty
      if(!/\S+@\S+\.\S+/.test(email)){
        return "email is wrong"
      }
      return "";
}

const validatestatues = (statues) => {
  // Perform validation here, e.g., check if name is not empty
  if (statues.trim() === "") {
      return "statues is required.";
  }

  // Return empty string if validation passes
  return "";
}




    return(<>
    <h2>Add Delivery</h2>


    
    <Form onSubmit={handleSubmit} >

    <Form.Group className="mb-3">
       <Form.Label>Customer Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Customer Name"  value={deliveryDetails.name} onChange={handleInputChange}  required isInvalid={!!nameError}/>
        <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
        </Form.Group>


      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control id="address" name="address" type="text" 
        placeholder="Enter Customer Address" value={deliveryDetails.address} onChange={handleInputChange} required  isInvalid={!!addressError} />
        <Form.Control.Feedback type="invalid">{addressError}</Form.Control.Feedback>
      </Form.Group>


      <Form.Group className="mb-3" controlId="weight">
        <Form.Label>Order Weight(grams)</Form.Label>
        <Form.Control id="weight" name="weight" type="number" 
        placeholder="Enter Order Weight" value={deliveryDetails.weight} onChange={handleInputChange} required isInvalid={!!weightError}/>
        <Form.Control.Feedback type="invalid">{weightError}</Form.Control.Feedback>
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="courierName">
        <Form.Label>Delivery Company Name</Form.Label>
        <Form.Control id="courierName" name="courierName" type="text" 
        placeholder="Enter Delivery Company Name" value={deliveryDetails.courierName} onChange={handleInputChange} required isInvalid={!!courierNameError} />
         <Form.Control.Feedback type="invalid">{courierNameError}</Form.Control.Feedback>
      </Form.Group>

   <Form.Group className="mb-3" controlId="status">
  <Form.Label>Status</Form.Label>
  <Form.Select id="status" name="status" value={deliveryDetails.status} onChange={handleInputChange} required isInvalid={!!statuestError}>
    <option value="">Select Status</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
   
  </Form.Select>
  <Form.Control.Feedback type="invalid">{statuestError}</Form.Control.Feedback>
</Form.Group>


      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Email</Form.Label>
        <Form.Control id="email" name="email" type="email"
        placeholder="Enter email" value={deliveryDetails.email} onChange={handleInputChange} required  isInvalid={!!emailError} />
         <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
      </Form.Group>

      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Delivery
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateDelivery;
