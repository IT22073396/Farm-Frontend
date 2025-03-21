import { useContext, useEffect,useState,useRef } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from "../assets/mandri-logo_black-2.png";

const AllTransports = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicles,setVehicles] = useState([]);
    const [searchInput,setSearchInput] = useState("");
    const contentRef = useRef(null);

    
  

    useEffect(() => {
        async function fetchVehicles(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/vehicles',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setVehicles(result.vehicles);
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
        fetchVehicles();
    }, []);

    const deleteVehicle = async (id) => {
        if(window.confirm("Are you sure you want to delete this vehicle?")){
            try {
                const res= await fetch(`http://localhost:4000/api/vehicles/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Vehicle");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/vehicles',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setVehicles(result.vehicles);
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

      const newSearchVehicle = vehicles.filter((vehicle) => 
      vehicle.vehicle.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSearchVehicle);

      setVehicles(newSearchVehicle);

    };

    const exportPDF = () => {
      const tableContent = contentRef.current;
      html2canvas(tableContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm','a4');
        
        // Logo
        const logoImg = new Image();
        logoImg.src = logo;
        logoImg.onload = function() {
          const imgWidth = 30;
          const imgHeight = (this.height * imgWidth) / this.width;
          const marginLeft = 10;
          const marginTop = 10; 
          pdf.addImage(this, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);
        
          // Title
          pdf.setFontSize(16);
          const titleText = "Transport Details";
          const titleWidth = pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
          const titleX = (pdf.internal.pageSize.width - titleWidth) / 2;
          const titleY = marginTop + imgHeight + 10; // Adjusted top margin for the title
          pdf.text(titleText, titleX, titleY);
        
          // Table Content
          const pdfWidth = 200;
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          const tableMarginTop = titleY + 10; // Adjusted top margin to accommodate title
          const tableMarginLeft = (pdf.internal.pageSize.width - pdfWidth) / 2; // Centering the table horizontally
          pdf.addImage(imgData, 'PNG', tableMarginLeft, tableMarginTop, pdfWidth, pdfHeight);
        
          const fontSize = 12;
          pdf.setFontSize(fontSize);
        
          pdf.save("transport-details.pdf");
        };
      });
    };
    
  

    return (<>This is the All Vehicles page
    <br></br>
    <div className="mb-3">
    <Link to="/createtransports" className="btn btn-primary me-2">Create Transport</Link>
    <a href="/alltransports" className="btn btn-danger">Reload Vehicles</a>
    <Button onClick={exportPDF} variant="success" className="my-2 mx-2">Export to PDF</Button>
    </div>
    {loading ? <Spinner splash="Loading Vehicles..." /> : (
        (vehicles.length == 0 ? <h3>No Vehicles Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Vehicles"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

         <div ref={contentRef}>
        <p>Total No of Vehicles : {vehicles.length}</p>
        <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Vehicle Number</th>
            <th>Model</th>
            <th>Status</th>
            <th>Last Inspection</th>
            <th>Next Inspection</th>
          </tr>
        </thead>
        <tbody>
  {loading === false && vehicles.map((vehicle) => (
    <tr key={vehicle._id} onClick={() => {
      setSelectedVehicle(vehicle);
      setShowModal(true);
    }}>
      <td>{vehicle.vehicle}</td>
      <td>{vehicle.vnumber}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.status}</td>
      {/* Format dates if needed */}
      <td>{new Date(vehicle.last_inspection).toLocaleDateString()}</td>
      <td>{new Date(vehicle.next_inspection).toLocaleDateString()}</td>
    </tr>
  ))}
</tbody>

      </Table>
      </div>
       </>)
        
    )}
     <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={showModal} onHide={()=>{
        setShowModal(false)
      }}>
        <Modal.Header closeButton>
          {selectedVehicle && <Modal.Title>Vehicle Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedVehicle &&(
            <>
            <p><strong>Vehicle:</strong> {selectedVehicle.vehicle}</p>
          <p><strong>Vehicle Number</strong> {selectedVehicle.vnumber}</p>
          <p><strong>Model:</strong>{selectedVehicle.model}</p>
          <p><strong>Status:</strong> {selectedVehicle.status}</p>
          <p><strong>Last Inspection:</strong>{selectedVehicle.last_inspection}</p>
          <p><strong>Next Inspection:</strong>{selectedVehicle.next_inspection}</p>
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/edittransports/${selectedVehicle?._id}`}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteVehicle(selectedVehicle._id)
          }}>Delete</Button>
          <Button id="btn btn-warning" variant="secondary" onClick={()=>{
            setShowModal(false)
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
    
    </>
    );
      }


export default AllTransports;
