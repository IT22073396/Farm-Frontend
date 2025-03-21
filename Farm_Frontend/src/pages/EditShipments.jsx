import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditShipments = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [shipDetails,setShipDetails] = useState({
        route:"",
        supplier:"",
        date:"",
        vehicle:"",
        max_distance:"",
        speed_limit:"",
        arrival:"",
        driver:"",
        note:"",
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setShipDetails({...shipDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/shipments/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(shipDetails),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${shipDetails.route}]`);
         setShipDetails({ route:"",
         supplier:"",
         date:"",
         vehicle:"",
         max_distance:"",
         speed_limit:"",
         arrival:"",
         driver:"",
         note:"",});
         navigate("/allshipments");

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

        async function fetchShipments() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/shipments/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            const formattedDate = formatDate(result.date);
            const formattedArrival = formatDate(result.arrival);

            setShipDetails({
                route:result.route,
                supplier:result.supplier,
                date:formattedDate,
                vehicle:result.vehicle,
                max_distance:result.max_distance,
                speed_limit:result.speed_limit,
                arrival:formattedArrival,
                driver:result.driver,
                note:result.note,
                
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchShipments()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Shipments..."/>:(<>
        <h2>Edit Shipments</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Shipment route</Form.Label>
        <Form.Control id="route" name="route" type="text" 
        placeholder="Enter route"  value={shipDetails.route} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="supplier">
        <Form.Label>supplier</Form.Label>
        <Form.Control id="supplier" name="supplier" type="text" 
        placeholder="Enter supplier" value={shipDetails.supplier} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="date">
        <Form.Label>date</Form.Label>
        <Form.Control id="date" name="date" type="date" 
        placeholder="date" value={shipDetails.date} onChange={handleInputChange} required/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="vehicle">
        <Form.Label>vehicle</Form.Label>
        <Form.Control id="vehicle" name="vehicle" type="text" 
        placeholder="Enter vehicle" value={shipDetails.vehicle} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="max_distance">
        <Form.Label>Max distance</Form.Label>
        <Form.Control id="max_distance" name="max_distance" type="text" 
        placeholder="Enter max distance" value={shipDetails.max_distance} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="speed_limit">
        <Form.Label>Speed limit</Form.Label>
        <Form.Control id="speed_limit" name="speed_limit" type="text" 
        placeholder="Enter speed limit" value={shipDetails.speed_limit} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="arrival">
        <Form.Label>Arrival</Form.Label>
        <Form.Control id="arrival" name="arrival" type="date" 
        placeholder="Enter arrival" value={shipDetails.arrival} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="driver">
        <Form.Label>Driver</Form.Label>
        <Form.Control id="driver" name="driver" type="text" 
        placeholder="Enter driver" value={shipDetails.driver} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="note">
        <Form.Label>Note</Form.Label>
        <Form.Control id="note" name="note" type="text" 
        placeholder="Enter note" value={shipDetails.note} onChange={handleInputChange} required/>
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


export default EditShipments;
