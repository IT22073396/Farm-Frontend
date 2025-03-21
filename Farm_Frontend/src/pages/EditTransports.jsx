import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditTransports = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [vehicleDetails,setVehicleDetails] = useState({
        vehicle:"",
        model:"",
        status:"",
        last_inspection:"",
        next_inspection:"",
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setVehicleDetails({...vehicleDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/vehicles/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(vehicleDetails),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${vehicleDetails.vehicle}]`);
         setVehicleDetails({vehicle:"",model:"",status:"",last_inspection:"",next_inspection:""});
         navigate("/alltransports");

        }else{
            toast.error(result.error);

        }
    }
    function formatDate(dateString){
        const  date = new Date(dateString);
        const year= date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {

        async function fetchVehicles() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/vehicles/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            const formattedLastInspection = formatDate(result.last_inspection);
            const formattedNextInspection = formatDate(result.next_inspection);

            setVehicleDetails({
                vehicle:result.vehicle,
                model:result.model,
                status:result.status,
                last_inspection:formattedLastInspection,
                next_inspection:formattedNextInspection,
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchVehicles()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Vehicles..."/>:(<>
        <h2>Edit Vehicles</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Vehicle Name</Form.Label>
        <Form.Control id="vehicle" name="vehicle" type="text" 
        placeholder="Enter Vehicle Name"  value={vehicleDetails.vehicle} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="model">
        <Form.Label>Vehicle Model</Form.Label>
        <Form.Control id="model" name="model" type="text" 
        placeholder="Enter Vehicle Model" value={vehicleDetails.model} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control id="status" name="status" type="text" 
        placeholder="Status" value={vehicleDetails.status} onChange={handleInputChange} required/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="last_inspection">
        <Form.Label>Last Inspection</Form.Label>
        <Form.Control id="last_inspection" name="last_inspection" type="date" 
        placeholder="Enter Last Inspection" value={vehicleDetails.last_inspection} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="next_inspection">
        <Form.Label>Next Inspection</Form.Label>
        <Form.Control id="next_inspection" name="next_inspection" type="date" 
        placeholder="Enter Next Inspection" value={vehicleDetails.next_inspection} onChange={handleInputChange} required/>
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


export default EditTransports;
