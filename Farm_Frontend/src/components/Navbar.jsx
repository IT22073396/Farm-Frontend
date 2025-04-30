import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactBootstrapNavbar from 'react-bootstrap/Navbar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
import Logo from '../assets/mandri-logo_white.png'
import CustomerProfileLogo from '../assets/customer-profile-logo2.png';
import {PersonCircle} from 'react-bootstrap-icons';



const Navbar = ({title = "Mandri Life"}) => {
  const {user,setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const {toast} = useContext(ToastContext);
  const [cartCount,setCartCount] = useState(0);

  useEffect(()=> {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  },[location]);

  const handleTitleClick = () => {
    if(user && user.userRole === "CUSTOMER"){
      navigate("/customer");
    }else if(user && user.userRole === "EMPLOYEE_MANAGER"){
      navigate("/employee-manager");
    }else if(user && user.userRole === "INVENTORY_MANAGER"){
      navigate("/inventory-manager");
    }else if(user && user.userRole === "SUPPLIER_MANAGER"){
      navigate("/supplier-manager");
    }else if(user && user.userRole === "DELIVERY_MANAGER"){
      navigate("/delivery-manager");
    }else if(user && user.userRole === "PRODUCT_MANAGER"){
      navigate("/product-manager");
    }else if(user && user.userRole === "PAYMENT_MANAGER"){
      navigate("/payment-manager");
    }else if(user && user.userRole === "TRANSPORT_MANAGER"){
      navigate("/transport-manager");
    }else{
      navigate("/transport-manager");
    }
  }
    return (
      <ReactBootstrapNavbar className="bg-dark text-white text-center py-4 mt-auto" expand="lg" bg="primary" variant="light" sticky='top' data-bs-theme="dark" >
      <Container >
        
      <div to="#" onClick={handleTitleClick} style={{display:'flex',alignItems:'center'}}>
     
      <ReactBootstrapNavbar.Brand >
      <img src={Logo} alt="Mandri Life Logo" style={{ width: 'auto', height: '60px' }} />
        {title}</ReactBootstrapNavbar.Brand>
       </div>
        <ReactBootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrapNavbar.Collapse id="basic-navbar-nav" >
          {
            !user  && <Nav className="ms-auto">
            <Nav.Link as = {Link} to="/login" >Login</Nav.Link> 
            <Link to="/register">
            <Nav.Link as = {Link} to="/register">Register</Nav.Link>
            </Link>
            
         
              </Nav>
          }
          {user && user.userRole === "EMPLOYEE_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/create" style={{ marginLeft: '10px' }}>Create Employees</Nav.Link> 
            <Nav.Link  as = {Link} to="/allemployees" style={{ marginLeft: '10px' }}>All Employees</Nav.Link> 
            <Nav.Link  as = {Link} to="/allpayslips" style={{ marginLeft: '10px' }}>All Payslips</Nav.Link> 
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
            <Nav.Link  as = {Link} to="/allleaves" style={{ marginLeft: '10px' }}>All Leaves</Nav.Link> 
           
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "CUSTOMER_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "INVENTORY_MANAGER" && <>
  <Form className="d-flex ms-auto my-2">
    <Button as={Link} to="/createinventory" style={{ marginLeft: '10px', backgroundColor: 'green', border: 'none' }}>Create Inventory</Button>
    <Button as={Link} to="/allinventories" style={{ marginLeft: '10px', backgroundColor: 'green', border: 'none' }}>All Inventories</Button>
    <Button as={Link} to="/contactsupplier" style={{ marginLeft: '10px', backgroundColor: 'green', border: 'none' }}>Contact</Button>
    <Button as={Link} to="/inventoryinbox" style={{ marginLeft: '10px', backgroundColor: 'green', border: 'none' }}>Inbox</Button>
    <Button as={Link} to="/createleave" style={{ marginLeft: '10px', backgroundColor: 'green', border: 'none' }}>Add Leave</Button>
    
    <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
      setUser(null);
      localStorage.clear();
      toast.success("Logged Out!");
      navigate("/login",{replace:true});
    }}>Logout</Button>
  </Form>
</>}

          {user && user.userRole === "SUPPLIER_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/ContactTransport" style={{ marginLeft: '10px' }}>Transport Manager Inbox |</Nav.Link>
            <Nav.Link  as = {Link} to="/ContactPayment" style={{ marginLeft: '10px' }}>Payment Manager Inbox |</Nav.Link>
            <Nav.Link  as = {Link} to="/Suppliermails" style={{ marginLeft: '10px' }}>Supplier Inbox |</Nav.Link>
            <Nav.Link  as = {Link} to="/supplierinbox" style={{ marginLeft: '10px' }}>Supplier Manager Inbox |</Nav.Link> 
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link>
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "DELIVERY_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createdeliveries" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/alldeliveries" style={{ marginLeft: '10px' }}>All Deliveries</Nav.Link> 
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
            <Nav.Link  as = {Link} to="/createdeliveries" style={{ marginLeft: '10px' }}>Add Delivery Details</Nav.Link>
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "TRANSPORT_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            {/* <Nav.Link  as = {Link} to="/createtransports" style={{ marginLeft: '10px' }}>Create Transport |</Nav.Link> */}
              <Nav.Link  as = {Link} to="/alltransports" style={{ marginLeft: '10px' }}>All Transports |</Nav.Link>
              {/* <Nav.Link  as = {Link} to="/createshipments" style={{ marginLeft: '10px' }}>Create Shipments |</Nav.Link> */}
              <Nav.Link  as = {Link} to="/allshipments" style={{ marginLeft: '10px' }}>All Shipments |</Nav.Link>
              <Nav.Link  as = {Link} to="/contactinventory" style={{ marginLeft: '10px' }}>Contact Inventory |</Nav.Link>
              <Nav.Link as = {Link} to="/transportinbox" style={{ marginLeft: '10px' }}>Transport Inbox |</Nav.Link>
              <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave |</Nav.Link> 
              <Nav.Link as = {Link} to="/hydroponic-dashboard" style={{marginLeft: '10px'}}>Sensor |</Nav.Link>


            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "PRODUCT_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createproducts" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/allproducts" style={{ marginLeft: '10px' }}>All Products</Nav.Link> 
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "PAYMENT_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
           
            <Nav.Link  as = {Link} to="/allpayment" style={{ marginLeft: '10px'  }}>All Payment |</Nav.Link> 
            <Nav.Link  as = {Link} to="/createinvoice" style={{ marginLeft: '10px'  }}>Create Invoice |</Nav.Link>
            <Nav.Link  as = {Link} to="/allinvoice" style={{ marginLeft: '10px'}}>All Invoice |</Nav.Link>
            <Nav.Link  as = {Link} to="/createfinancial" style={{ marginLeft: '10px' }}>Create Financial Reports |</Nav.Link>
            <Nav.Link  as = {Link} to="/allfinancial" style={{ marginLeft: '10px'  }}>All Financial Reports |</Nav.Link>
            
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "CUSTOMER" && <> 
         
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/customer" style={{ marginLeft: '10px' }} >Home |</Nav.Link> 
            <Nav.Link  as = {Link} to="/vision" style={{ marginLeft: '10px' }}>Vision & Mission |</Nav.Link> 
            <Nav.Link  as = {Link} to="/aboutus" style={{ marginLeft: '10px' }}>About Us |</Nav.Link>
            <Nav.Link  as = {Link} to="/customer-product" style={{ marginLeft: '10px' }}>Products |</Nav.Link>
            
            <Nav.Link  as = {Link} to="/contactus" style={{ marginLeft: '10px' }}>Contact Us |</Nav.Link>
    
            <Nav.Link  as = {Link} to="/allorders" style={{ marginLeft: '10px' }}>My Orders |</Nav.Link>
            <Nav.Link  as = {Link} to="/cart-page" style={{ marginLeft: '10px' }}>Cart({cartCount}) |</Nav.Link> 
            <Button as={Link} to="/customer-profile" variant="link" style={{ marginLeft: '10px', padding: '0' }}>
                <img src={CustomerProfileLogo} alt="Customer Profile" style={{ marginRight: '5px', width: '24px', height: '24px' }} />
                
              </Button>
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
        
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
}


export default Navbar;