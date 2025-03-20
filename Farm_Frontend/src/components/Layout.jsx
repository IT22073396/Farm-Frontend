import Navbar from "./Navbar"
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useLocation } from 'react-router-dom';

const Layout = ({navbar=true,children}) => {
    const location = useLocation();
    const hideFooterRoutes = ["/login","/register","/payment-manager"];
    //give extra space to every part of our website
    return <>
    
    {navbar && <Navbar />}
    
    <div className="container mt-3 mb-5">{children}</div>

    {!hideFooterRoutes.includes(location.pathname) &&  <Footer/>}
    
  
    </>
};

export default Layout;