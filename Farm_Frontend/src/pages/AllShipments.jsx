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

const AllShipments = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [shipments,setShipments] = useState([]);
    const [searchInput,setSearchInput] = useState("");
    const contentRef = useRef(null);
  

    useEffect(() => {
        async function fetchShipments(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/shipments',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setShipments(result.shipments);
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
        fetchShipments();
    }, []);

    const deleteShipment = async (id) => {
        if(window.confirm("Are you sure you want to delete this shipment?")){
            try {
                const res= await fetch(`http://localhost:4000/api/shipments/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted shipment");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/shipments',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setShipments(result.shipments);
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

      const newSeatchShipment = shipments.filter((shipment) => 
      shipment.shipment.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSeatchShipment);

      setShipments(newSeatchShipment);

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
            const titleText = "Shipment Details";
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
          
            pdf.save("shipment-details.pdf");
          };
        });
      };
  

    return (<>This is the All Shipment page
    <br></br>
    <div className="mb-3">
    <Link to="/createshipments" className="btn btn-primary me-2">Create Shipments</Link>
    <a href="/allshipments" className="btn btn-danger my-2">Reload Shipments</a>
    <Button onClick={exportPDF} variant="success" className="my-2 mx-2">Export to PDF</Button>
</div>

    {loading ? <Spinner splash="Loading Shipments..." /> : (
        (shipments.length == 0 ? <h3>No Shipments Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Shipments"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

         <div ref={contentRef}>
        <p>Total No of Shipments : {shipments.length}</p>
        <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Route</th>
            <th>Supplier</th>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Max Distance</th>
          {/*  <th>Speed limit</th>*/}
            <th>Arrival</th>
            <th>Driver</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
  {loading === false && shipments.map((shipment) => (
    <tr key={shipment._id} onClick={() => {
      setSelectedShipment(shipment);
      setShowModal(true);
    }}>
      <td>{shipment.route}</td>
      <td>{shipment.supplier}</td>
      {/* Format date if needed */}
      <td>{new Date(shipment.date).toLocaleDateString()}</td>
      <td>{shipment.vehicle}</td>
      <td>{shipment.max_distance}</td>
      {/*<td>{shipment.speed_limit}</td>*/}
      <td>{new Date(shipment.arrival).toLocaleDateString()}</td>
      <td>{shipment.driver}</td>
      <td>{shipment.note}</td>
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
          {selectedShipment && <Modal.Title>Shipment Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedShipment &&(
            <>
            <p><strong>route:</strong> {selectedShipment.route}</p>
          <p><strong>supplier:</strong>{selectedShipment.supplier}</p>
          <p><strong>date:</strong> {selectedShipment.date}</p>
          <p><strong>vehicle:</strong>{selectedShipment.vehicle}</p>
          <p><strong>max distance:</strong>{selectedShipment.max_distance}</p>
          <p><strong>speed limit:</strong>{selectedShipment.speed_limit}</p>
          <p><strong>arrival:</strong>{selectedShipment.arrival}</p>
          <p><strong>driver:</strong>{selectedShipment.driver}</p>
          <p><strong>note:</strong>{selectedShipment.note}</p>
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/editshipments/${selectedShipment?._id}`}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteShipment(selectedShipment._id)
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


export default AllShipments;
