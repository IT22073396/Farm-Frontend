import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ToastContext from "../context/ToastContext";
import "../css/PaymentPage.css";

// Import credit card icons

const visaIcon = "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg";
const mastercardIcon = "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg";
const amexIcon = "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg";

// Usage remains the same:
<img src={visaIcon} alt="Visa" />

const CreatePayment = () => {
  const { toast } = useContext(ToastContext);
  const location = useLocation();
  const { cart } = location.state || {};
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      expiryDate: "",
      cvv: "",
      issuingBank: ""
    },
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      const errors = {};
      
      if (!values.name.trim()) errors.name = "Cardholder name is required";
      
      if (!values.number) {
        errors.number = "Card number is required";
      } else if (!/^\d{16}$/.test(values.number.replace(/\s/g, ""))) {
        errors.number = "Please enter a valid 16-digit card number";
      }
      
      if (!values.expiryDate) {
        errors.expiryDate = "Expiry date is required";
      } else {
        const [year, month] = values.expiryDate.split("-");
        const expiry = new Date(year, month);
        const currentDate = new Date();
        if (expiry < currentDate) {
          errors.expiryDate = "Card has expired";
        }
      }
      
      if (!values.cvv) {
        errors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(values.cvv)) {
        errors.cvv = "Please enter a valid CVV";
      }
      
      if (!values.issuingBank) errors.issuingBank = "Issuing bank is required";
      
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:4000/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ 
            ...values, 
            cart, 
            userId: localStorage.getItem("id"), 
            totalPrice: calculateTotalPrice(),
            paymentMethod
          })
        });

        const result = await res.json();

        if (!result.error) {
          localStorage.setItem("orderDetails", JSON.stringify(result));
          toast.success("Payment Successful");
          localStorage.setItem("lastCart", JSON.stringify(cart));
          localStorage.removeItem("cart");
          formik.resetForm();
          navigate("/order-summary", { state: { cart } });
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.error("Payment error:", err);
        toast.error("Payment failed. Please try again.");
      }
    }
  });

  const calculateTotalPrice = () => {
    if (!cart) return 0;
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    formik.setFieldValue("number", formattedValue);
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Payment Information</h2>
        <p>Complete your purchase with secure payment</p>
      </div>

      <div className="payment-methods">
        <div 
          className={`payment-method ${paymentMethod === "card" ? "active" : ""}`}
          onClick={() => setPaymentMethod("card")}
        >
          <img src={visaIcon} alt="Credit Card" />
          <span>Credit/Debit Card</span>
        </div>
      </div>

      {paymentMethod === "card" && (
        <div className="payment-card">
          <div className="payment-card-icons">
            <img src={visaIcon} alt="Visa" className={formik.values.number.startsWith("4") ? "active" : ""} />
            <img src={mastercardIcon} alt="Mastercard" className={formik.values.number.startsWith("5") ? "active" : ""} />
            <img src={amexIcon} alt="American Express" className={formik.values.number.startsWith("3") ? "active" : ""} />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="John Smith"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error-message">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                name="number"
                className="form-control"
                value={formik.values.number}
                onChange={handleCardNumberChange}
                onBlur={formik.handleBlur}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {formik.touched.number && formik.errors.number && (
                <div className="error-message">{formik.errors.number}</div>
              )}
            </div>

            <div className="expiry-cvv">
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input
                  type="month"
                  name="expiryDate"
                  className="form-control"
                  value={formik.values.expiryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate && (
                  <div className="error-message">{formik.errors.expiryDate}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  className="form-control"
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="123"
                  maxLength={4}
                />
                {formik.touched.cvv && formik.errors.cvv && (
                  <div className="error-message">{formik.errors.cvv}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Issuing Bank</label>
              <select
                name="issuingBank"
                className="form-control"
                value={formik.values.issuingBank}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select your bank</option>
                <option value="BOC">Bank of Ceylon</option>
                <option value="HNB">Hatton National Bank</option>
                <option value="Peoples">People's Bank</option>
                <option value="Commercial">Commercial Bank</option>
                <option value="Sampath">Sampath Bank</option>
              </select>
              {formik.touched.issuingBank && formik.errors.issuingBank && (
                <div className="error-message">{formik.errors.issuingBank}</div>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Processing..." : `Pay $${calculateTotalPrice().toFixed(2)}`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePayment;