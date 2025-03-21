import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; // Adjust the import path as needed

const PaymentManagerHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    const handleAddFinancialClick = () => {
        navigate("/createfinancial"); // Navigate to the CreateFinancial page
    }

    const handleAddInvoiceClick = () => {
        navigate("/createinvoice"); // Navigate to the CreateInvoice page
    }

    const handleViewAllPaymentsClick = () => {
        navigate("/allpayment"); // Navigate to the All Payments page
    }

    const handleViewAllFinancialReportsClick = () => {
        navigate("/allfinancial"); // Navigate to the All Financial Reports page
    }

    const handleViewAllInvoicesClick = () => {
        navigate("/allinvoice"); // Navigate to the All Invoices page
    }

    const handleAddLeaveClick = () => {
        navigate("/createleave"); // Navigate to the Add Leave page
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
            
            <div style={{ flex: '1', padding: '20px', boxSizing: 'border-box' }}>
                <div style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bold', marginTop: '20px', color: 'black' }}>
                    Welcome {user ? user.name : null}...!
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleAddFinancialClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '10px', padding: '5px', cursor: 'pointer' }}>
                            <img src="src/assets/4.png" alt="Add Financial" style={{ width: '150px', height: '150px' }} />
                        </button>
                        <button style={{ 
                            cursor: 'pointer', 
                            fontSize: '20px', 
                            backgroundColor: 'white', 
                            border: '5px solid #7b3f00', 
                            borderRadius: '10px', 
                            padding: '10px 20px', 
                            color: 'black', 
                            fontWeight: 'bold' 
                        }} onClick={handleAddFinancialClick}>Add Financial Reports</button>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleAddInvoiceClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '10px', padding: '5px', cursor: 'pointer' }}>
                            <img src="src/assets/5.png" alt="Add Invoice" style={{ width: '150px', height: '150px' }} />
                        </button>
                        <button style={{ 
                            cursor: 'pointer', 
                            fontSize: '20px', 
                            backgroundColor: 'white', 
                            border: '5px solid #7b3f00', 
                            borderRadius: '10px', 
                            padding: '10px 20px', 
                            color: 'black', 
                            fontWeight: 'bold' 
                        }} onClick={handleAddInvoiceClick}>Add Invoice</button>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleAddLeaveClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '10px', padding: '5px', cursor: 'pointer' }}>
                            <img src="src/assets/6001299.png" alt="Add Leave" style={{ width: '150px', height: '150px' }} />
                        </button>
                        <button style={{ 
                            cursor: 'pointer', 
                            fontSize: '20px', 
                            backgroundColor: 'white', 
                            border: '5px solid #7b3f00', 
                            borderRadius: '10px', 
                            padding: '10px 20px', 
                            color: 'black', 
                            fontWeight: 'bold' 
                        }} onClick={handleAddLeaveClick}>Add Leave</button>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleViewAllFinancialReportsClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '10px', padding: '5px', cursor: 'pointer' }}>
                            <img src="src/assets/7.png" alt="View Financial Reports" style={{ width: '150px', height: '150px' }} />
                        </button>
                        <button style={{ 
                            cursor: 'pointer', 
                            fontSize: '20px', 
                            backgroundColor: 'white', 
                            border: '5px solid #7b3f00', 
                            borderRadius: '10px', 
                            padding: '10px 20px', 
                            color: 'black', 
                            fontWeight: 'bold' 
                        }} onClick={handleViewAllFinancialReportsClick}>View Financial Reports</button>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleViewAllInvoicesClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '10px', padding: '5px', cursor: 'pointer' }}>
                            <img src="src/assets/8.png" alt="View Invoices" style={{ width: '150px', height: '150px' }} />
                        </button>
                        <button style={{ 
                            cursor: 'pointer', 
                            fontSize: '20px', 
                            backgroundColor: 'white', 
                            border: '5px solid #7b3f00', 
                            borderRadius: '10px', 
                            padding: '10px 20px', 
                            color: 'black', 
                            fontWeight: 'bold' 
                        }} onClick={handleViewAllInvoicesClick}>View Invoices</button>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleViewAllPaymentsClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '10px', padding: '5px', cursor: 'pointer' }}>
                            <img src="src/assets/9.png" alt="View Saved Details" style={{ width: '150px', height: '150px' }} />
                        </button>
                        <button style={{ 
                            cursor: 'pointer', 
                            fontSize: '20px', 
                            backgroundColor: 'white', 
                            border: '5px solid #7b3f00', 
                            borderRadius: '10px', 
                            padding: '10px 20px', 
                            color: 'black', 
                            fontWeight: 'bold' 
                        }} onClick={handleViewAllPaymentsClick}>View Saved Details</button>
                    </div>
                </div>
            </div>
            

            <Footer style={{ width: '250%' }} /> {/* Modify the Footer component to span the entire width */}
       
        </div>
    );
}

export default PaymentManagerHome;
