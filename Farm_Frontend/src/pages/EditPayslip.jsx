import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

function formatDate(dateString){
  const  date = new Date(dateString);
  const year= date.getFullYear();
  const month = String(date.getMonth()+1).padStart(2,'0');
  const day = String(date.getDate()).padStart(2,'0');
  return `${year}-${month}-${day}`;
}

const EditPayslip = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);
    const queryParams = new URLSearchParams(location.search);

    const [payslipDetails,setPayslipDetails] = useState({
        id:"",
        name:"",
        date:"",
        allowances:"",
        deductions:"",
        otherAllowances:"",
        otherDeductions:"",
        basic:"",
        totalAllowance:"",
        totalDeduction:"",
        netSalary:"",
        paymentMethod:"",
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setPayslipDetails({...payslipDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/payslips/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({email:queryParams.get("email"),id,...payslipDetails}),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${payslipDetails.name}]`);
         setPayslipDetails({id:"",name:"",date:"",allowances:"",deductions:"",otherAllowances:"",
         otherDeductions:"",basic:"",totalAllowance:"",totalDeduction:"",netSalary:"",paymentMethod:""});
         navigate("/allpayslips");

        }else{
            toast.error(result.error);

        }
    }

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/payslips/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setPayslipDetails({
                id:result.id,
                name:result.name,
                allowances:result.allowances,
                deductions:result.deductions,
                otherAllowances:result.otherAllowances,
                otherDeductions:result.otherDeductions,
                basic:result.basic,
                totalAllowance:result.totalAllowance,
                totalDeduction:result.totalDeduction,
                netSalary:result.netSalary,
                paymentMethod:result.paymentMethod,
                date:formatDate(result.date)
               
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchData()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Payslips..."/>:(<>
        <h2>Edit Payslip</h2>
    
        <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3">
        <Form.Label>Employee name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Employee name"  value={payslipDetails.name} onChange={handleInputChange}  required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Year</Form.Label>
        <Form.Control id="date" name="date" type="date" 
        placeholder="Enter date"  value={payslipDetails.date} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="allowances">
        <Form.Label>Employee allowances</Form.Label>
        <Form.Control id="allowances" name="allowances" type="number" 
        placeholder="Enter Employee allowances" value={payslipDetails.allowances} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="deductions">
        <Form.Label>Employee deductions</Form.Label>
        <Form.Control id="deductions" name="deductions" type="number" 
        placeholder="Enter Employee deductions" value={payslipDetails.deductions} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="otherAllowances">
        <Form.Label>Employee otherAllowances</Form.Label>
        <Form.Control id="otherAllowances" name="otherAllowances" type="number" 
        placeholder="Enter otherAllowances" value={payslipDetails.otherAllowances} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="otherDeductions">
        <Form.Label>Employee otherDeductions</Form.Label>
        <Form.Control id="otherDeductions" name="otherDeductions" type="number" 
        placeholder="Enter otherDeductions" value={payslipDetails.otherDeductions} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="basic">
        <Form.Label>Employee basic</Form.Label>
        <Form.Control id="basic" name="basic" type="number" 
        placeholder="Enter basic" value={payslipDetails.basic} onChange={handleInputChange} required readOnly/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="totalAllowance">
        <Form.Label>Employee totalAllowance</Form.Label>
        <Form.Control id="totalAllowance" name="totalAllowance" type="number" 
        placeholder="Enter totalAllowance" value={payslipDetails.totalAllowance} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="totalDeduction">
        <Form.Label>Employee totalDeduction</Form.Label>
        <Form.Control id="totalDeduction" name="totalDeduction" type="number" 
        placeholder="Enter totalDeduction" value={payslipDetails.totalDeduction} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="netSalary">
        <Form.Label>Employee netSalary</Form.Label>
        <Form.Control id="netSalary" name="netSalary" type="number" 
        placeholder="Enter netSalary" value={payslipDetails.netSalary} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="paymentMethod">
        <Form.Label>Employee paymentMethod</Form.Label>
        <Form.Control id="paymentMethod" name="paymentMethod" type="text" 
        placeholder="Enter paymentMethod" value={payslipDetails.paymentMethod} onChange={handleInputChange} required/>
      </Form.Group>

      
      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Edit Payslip
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>
    </>)}
    

    </>
    );
      };


export default EditPayslip;
