import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const SupplierOrders = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders,setOrders] = useState([]);
    const [searchInput,setSearchInput] = useState("");
  

    useEffect(() => {
        async function fetchOrder(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/orders',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setOrders(result.orders);
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
        fetchOrder();
    }, []);

    const deleteOrder = async (id) => {
        if(window.confirm("Are you sure you want to delete this Order?")){
            try {
                const res= await fetch(`http://localhost:4000/api/orders/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Order");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/orders',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setOrders(result.orders);
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

      const newSearchOrder = orders.filter((order) => 
      order.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSearchOrder);

      setOrders(newSearchOrder);

    };
  

    return (<>This is the All Orders page
    <br></br>
    <a href="/allorders" className="btn btn-danger my-2">Reload Orders</a>
    {loading ? <Spinner splash="Loading Orders..." /> : (
        (orders.length == 0 ? <h3>No Orders Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Suppliers"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

        <p>Total No of Orders:{orders.length}</p>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Suplier ID</th>
            <th>Quantity</th>
            <th>SKU</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && orders.map((order) =>(
               <tr key={order._id} onClick={()=> {
                setSelectedOrder({});
                setSelectedOrder(order);
                setShowModal(true)}}>
               <td>{order.name}</td>
               <td>{order.orderid}</td>
               <td>{order.productid}</td>
               <td>{order.supplierid}</td>
               <td>{order.quantity}</td>
               <td>{order.sku}</td>
             </tr>
  
          ))}
        </tbody>
      </Table> </>)
        
    )}
     <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={showModal} onHide={()=>{
        setShowModal(false)
      }}>
        <Modal.Header closeButton>
          {selectedOrder && <Modal.Title>Order Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedOrder &&(
            <>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
          <p><strong>OrderID:</strong>{selectedOrder.orderid}</p>
          <p><strong>ProductID:</strong> {selectedOrder.productid}</p>
          <p><strong>SupplierID:</strong>{selectedOrder.supplierid}</p>
          <p><strong>Quantity:</strong>{selectedOrder.quantity}</p>
          <p><strong>SKU:</strong>{selectedOrder.sku}</p>
          
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/editorder/${selectedOrder?._id}`}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteOrder(selectedOrder._id)
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


export default SupplierOrders;
