import { useContext, useEffect,useState,useRef } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/mandri-logo_black-2.png";

const AllLeaves = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [leaves,setLeaves] = useState([]);
    const [searchInput,setSearchInput] = useState("");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const contentRef = useRef(null);
  

    useEffect(() => {
        async function fetchLeaves(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/leaves',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setLeaves(result.leaves);
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
        fetchLeaves();

        setUserName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
    }, []);

    const deleteLeaves = async (id) => {
        if(window.confirm("Are you sure you want to delete this leave?")){
            try {
                const res= await fetch(`http://localhost:4000/api/leaves/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Leaves");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/leaves',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setLeaves(result.leaves);
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

      const newSearchLeave = leaves.filter((leave) => 
      leave.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSearchLeave);

      setLeaves(newSearchLeave);

    };

   const exportPDF = () => {
        const tableContent = contentRef.current;
        html2canvas(tableContent).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 30;
            const imgHeight = 30;
            const marginLeft = 10;
            const marginTop = 10;

            pdf.addImage(logo, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);

            pdf.setFontSize(16);
            const titleText = "Leave Details";
            const titleWidth = pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const titleX = (pdf.internal.pageSize.width - titleWidth) / 2;
            const titleY = 20;

            pdf.text(titleText, titleX, titleY);

            const contentLeftMargin = 10;
            const contentTopMargin = marginTop + imgHeight + 10;
            pdf.addImage(imgData, 'PNG', contentLeftMargin, contentTopMargin, 180, 160);

            pdf.save("leaves.pdf");
        });
    };


    return (<>This is the All Leaves page
    <br></br>
    <a href="/allleaves" className="btn btn-danger my-2">Reload Leaves</a>
    <Button onClick={exportPDF} variant="success" className="my-2 mx-2">Export to PDF</Button>
    {loading ? <Spinner splash="Loading Leaves..." /> : (
        (leaves.length == 0 ? <h3>No Leaves Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Leaves"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

        <div ref={contentRef}>
        <p>Total No of Leaves:{leaves.length}</p>
        <Table striped bordered hover variant="primary">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Leave Type</th>
            <th>Leave Type Details</th>
            <th>Created On</th>
            <th>Leave Status</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && leaves.map((leave) =>(
               <tr key={leave._id} onClick={()=> {
                setSelectedLeave({});
                setSelectedLeave(leave);
                setShowModal(true)}}>
               <td>{leave.name}</td>
               <td>{leave.email}</td>
               <td>{leave.leaveType}</td>
               <td>{leave.leaveTypeDetails}</td>
               <td>{leave.createdOn}</td>
               <td>{leave.leaveTypeStatus}</td>
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
          {selectedLeave && <Modal.Title>Leave Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedLeave &&(
            <>
            <p><strong>Leave Type:</strong> {selectedLeave.leaveType}</p>
          <p><strong>Leave Type Details:</strong>{selectedLeave.leaveTypeDetails}</p>
          <p><strong>Created On:</strong> {selectedLeave.createdOn}</p>
          <p><strong>Leave Type Status:</strong>{selectedLeave.leaveTypeStatus}</p>
          
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={selectedLeave?`/editleaves/${selectedLeave._id}`:"#"}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteLeaves(selectedLeave._id)
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


export default AllLeaves;
