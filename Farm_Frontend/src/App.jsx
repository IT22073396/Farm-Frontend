import { Routes as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import CreateEmployee from "./pages/CreateEmployee";
import AllEmployee from "./pages/AllEmployee";
import EditEmployee from "./pages/EditEmployee";
import InvetoryManagerHome from "./pages/InventoryManagerHome";
import CreateInventory from "./pages/CreateInventory";
import AllInventories from "./pages/AllInventories";
import EditInventories from "./pages/EditInventories";
import CreateSupplier from "./pages/CreateSupplier";
import CreateCow from "./pages/CreateCow";
import SupplierManagerHome from "./pages/SupplierManagerHome";
import AllSuppliers from "./pages/AllSuppliers";
import AllCows from "./pages/AllCows";
import EditSupplier from "./pages/EditSupplier";
import EditCows from "./pages/EditCows";
import CreateOrder from "./pages/CreateOrder";
import AllOrders from "./pages/AllOrders";
import EditOrder from "./pages/EditOrder";
import DeliveryManagerHome from "./pages/DeliveryManagerHome";
import CreateDelivery from "./pages/CreateDelivery";
import AboutUs  from "./pages/AboutUs";
import ContactUs  from "./pages/ContactUs";
import ContactSupplier from "./pages/ContactSupplier";
import SupplierInbox from "./pages/SupplierInbox";
import AllDeliveries from "./pages/AllDeliveries";
import EditDeliveries from "./pages/EditDeliveries";
import TransportManagerHome from "./pages/TransportManagerHome";
import CreateTransport from "./pages/CreateTransport";
import AllTransports from "./pages/AllTransports";
import EditTransports from "./pages/EditTransports";
import ProductManagerHome from "./pages/ProductManagerHome";
import CreateProduct from "./pages/CreateProduct";
import AllProducts from "./pages/AllProducts";
import EditProducts from "./pages/EditProducts";
import PaymentManagerHome from "./pages/PaymentManagerHome";

import CreatePayment from "./pages/CreatePayment";
import AllPayments from "./pages/AllPayments";
import EditPayment from "./pages/EditPayment";


import CreateInvoice from "./pages/CreateInvoice";
import AllInvoice from "./pages/AllInvoice";
import EditInvoice from "./pages/EditInvoice";

import CreateFinancial from "./pages/CreateFinancial";
import AllFinancial from "./pages/AllFinancial";
import EditFinancial from "./pages/EditFinancial";

import CustomerHome from "./pages/CustomerHome";
import CustomerManagerHome from "./pages/CustomerManagerHome";
import CreatePayslip from "./pages/CreatePayslip";
import AllPayslips from "./pages/AllPayslips";
import EditPayslip from "./pages/EditPayslip";
import CreateLeave from "./pages/CreateLeave";
import AllLeaves from "./pages/AllLeaves";
import EditLeave from "./pages/EditLeave";
import {Chart, ArcElement} from 'chart.js'
import Vision from "./pages/Vision";
import CustomerProfile from "./pages/CustomerProfile";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage";
import CustomerProduct from "./pages/CustomerProduct";
import ProductDetails from "./pages/ProductDetails";
import { Cart } from "react-bootstrap-icons";

import SCart from "./pages/SCart";
import CreateCheckout from "./pages/CreateCheckout";
import CartPage from "./pages/CartPage";
import OrderSummary from "./pages/OrderSummary";

import SupplierOrders from "./pages/SupplierOrders";
import CreateFeedback from "./pages/CreateFeedback";
import CreateShipments from "./pages/CreateShipments";
import AllShipments from "./pages/AllShipments";
import EditShipments from "./pages/EditShipments";
import ContactInventory from "./pages/ContactInventory";
import InventoryInbox from "./pages/InventoryInbox";
import TransportInbox from "./pages/TransportInbox";
import LocationTest from "./pages/LocationTest";

// Import the new HydroponicReading page (dashboard) and its SensorDisplay component is used inside it.
import HydroponicReading from "./pages/Hydroponic/HydroponicReading";

import SensorDisplay from "./components/Hydroponic/SensorDisplay";



Chart.register(ArcElement);


const App = () => {
  return (
    <ToastContextProvider>
  <AuthContextProvider>
  <Layout>
    <Switch>
      <Route path="/employee-manager" element={<Home></Home>} />
      <Route path="/inventory-manager" element={<InvetoryManagerHome></InvetoryManagerHome>}/>
      <Route path="/supplier-manager" element={<SupplierManagerHome></SupplierManagerHome>}/>
      <Route path="/delivery-manager" element={<DeliveryManagerHome></DeliveryManagerHome>}/>
      <Route path="/transport-manager" element={<TransportManagerHome></TransportManagerHome>}/>
      <Route path="/product-manager" element={<ProductManagerHome></ProductManagerHome>}/>
      <Route path="/payment-manager" element={<PaymentManagerHome></PaymentManagerHome>}/>
      <Route path="/customer" element={<CustomerHome></CustomerHome>}/>
      <Route path="/customer-manager" element={<CustomerManagerHome></CustomerManagerHome>}/>
      <Route path="/vision" element={<Vision></Vision>}/>
      <Route path="/customer-profile" element={<CustomerProfile></CustomerProfile>}/>
      <Route path="/reset-password-page" element={<ResetPasswordPage></ResetPasswordPage>}/>
      <Route path="/reset-password-form" element={<ResetPasswordForm></ResetPasswordForm>}/>
      <Route  path="/reset-password-confirm/:token" element={<ResetPasswordConfirmPage></ResetPasswordConfirmPage>} />
      <Route path="/customer-product" element={<CustomerProduct></CustomerProduct>}/>
      <Route path="/product-details/:id" element={<ProductDetails></ProductDetails>} />
      <Route path="/checkout" element={<CreateCheckout></CreateCheckout>}/>
      <Route path="order-summary" element={<OrderSummary></OrderSummary>}/>
      <Route path="/allorders" element={<AllOrders></AllOrders>}/>
      <Route path="/suporders" element={<SupplierOrders></SupplierOrders>}/>
      <Route path="/cart" element ={<Cart></Cart>}/>
      <Route path="/cart-items" element={<SCart></SCart>}/>
      <Route path="/cart-page" element={<CartPage></CartPage>}/>
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/create" element={<CreateEmployee></CreateEmployee>} />
      <Route path="/allemployees" element={<AllEmployee></AllEmployee>} />
      <Route path="/edit/:id" element={<EditEmployee></EditEmployee>} />
      <Route path="/createpayslip/:id" element={<CreatePayslip></CreatePayslip>}/>
      <Route path="/allpayslips" element={<AllPayslips></AllPayslips>}/>
      <Route path="/editpayslip/:id" element={<EditPayslip></EditPayslip>}/>
      <Route path="/createleave" element={<CreateLeave></CreateLeave>}/>
      <Route path="/allleaves" element={<AllLeaves></AllLeaves>}/>
      <Route path="/editleaves/:id" element={<EditLeave></EditLeave>}/>
      <Route path="/createinventory" element={<CreateInventory></CreateInventory>}/>
      <Route path="/allinventories" element={<AllInventories></AllInventories>}/>
      <Route path ="/editinventory/:id" element={<EditInventories></EditInventories>}/>
      <Route path ="/createsuppliers" element={<CreateSupplier></CreateSupplier>}/>
      <Route path="/allsuppliers" element={<AllSuppliers></AllSuppliers>}/>
      <Route path="/editsupplier/:id" element={<EditSupplier></EditSupplier>}/>
      <Route path ="/createcow" element={<CreateCow></CreateCow>}/>
      <Route path="/allcows" element={<AllCows></AllCows>}/>
      <Route path="/editcow/:id" element={<EditCows></EditCows>}/>
      <Route path ="/createorders" element={<CreateOrder></CreateOrder>}/>

      <Route path ="/createfeedbacks" element={<CreateFeedback></CreateFeedback>}/>
      
      
      <Route path="/editorder/:id" element={<EditOrder></EditOrder>}/>
      <Route path="/createdeliveries" element={<CreateDelivery></CreateDelivery>}/>
      <Route path="/aboutus" element={<AboutUs></AboutUs>}/>
      <Route path="/contactus" element={<ContactUs></ContactUs>}/>
      <Route path="/contactsupplier" element={<ContactSupplier></ContactSupplier>}/>
      <Route path="/supplierinbox" element={<SupplierInbox></SupplierInbox>}/>
      <Route path="/alldeliveries" element={<AllDeliveries></AllDeliveries>}/>
      <Route path="/editdeliveries/:id" element={<EditDeliveries></EditDeliveries>}/>
      <Route path="/createtransports" element={<CreateTransport></CreateTransport>}/>
      <Route path="/alltransports" element={<AllTransports></AllTransports>}/>
      <Route path="/edittransports/:id" element={<EditTransports></EditTransports>}/>
      <Route path="/contactinventory" element={<ContactInventory></ContactInventory>}/>
      <Route path="/inventoryinbox" element={<InventoryInbox></InventoryInbox>}/>
      <Route path="/LocationTest" element={<LocationTest></LocationTest>}/>



      <Route path="/createshipments" element={<CreateShipments></CreateShipments>}/>
      <Route path="/allshipments" element={<AllShipments></AllShipments>}/>
      <Route path="/editshipments/:id" element={<EditShipments></EditShipments>}/>
      <Route path="/transportinbox" element={<TransportInbox></TransportInbox>}/>

      <Route path="/createproducts" element={<CreateProduct></CreateProduct>}/>
      <Route path="/allproducts" element={<AllProducts></AllProducts>}/>
      <Route path="/editproducts/:id" element={<EditProducts></EditProducts>}/>
      <Route path="/createpayment" element={<CreatePayment></CreatePayment>}/>
      <Route path="/allpayment" element={<AllPayments></AllPayments>}/>
      <Route path="/editpayments/:id" element={<EditPayment></EditPayment>}/>
      <Route path="/createfinancial" element={<CreateFinancial></CreateFinancial>}/>
      <Route path="/allfinancial" element={<AllFinancial></AllFinancial>}/>
      <Route path="/editfinancial/:id" element={<EditFinancial></EditFinancial>}/>
      <Route path="/createinvoice" element={<CreateInvoice></CreateInvoice>}/>
      <Route path="/allinvoice" element={<AllInvoice></AllInvoice>} />
      <Route path="/editinvoice/:id" element={<EditInvoice></EditInvoice>}/>
      
      {/*New Hydroponic Dashboard Route*/}
      <Route path="/hydroponic-dashboard" element={<HydroponicReading />} />

      {/* New Sensor Display Route */}
      <Route path="/sensor-display" element={<SensorDisplay />} />
        

       


    </Switch>
  </Layout>
  </AuthContextProvider>
  </ToastContextProvider>
  )
};

export default App;