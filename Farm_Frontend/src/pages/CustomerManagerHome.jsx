import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const CustomerManagerHome = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    useEffect(()=>{
        !user && navigate("/login", {replace:true });

    },[]);

    return <>This is Customer Manager Home page {user ? user.name : null} 
    <br></br>
    <Button id="AddEmployee" variant="primary" type="submit">Add Employee</Button>{' '}
    </>
  
      }


export default CustomerManagerHome;
