import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from "yup";
import { useFormik } from "formik";
import ToastContext from "../context/ToastContext";

const CreateCheckout = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { toast } = useContext(ToastContext);
    const { cart } = location.state || {};
    const navigate = useNavigate();

    const initialValues = {
        name: localStorage.getItem("name") || "",
        address: localStorage.getItem("address") || "",
        city: "",
        country: "",
        zip: "",
        phone: "",
        email: localStorage.getItem("email") || "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
        zip: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
    });

    const onSubmit = async (values) => {
        const res = await fetch('http://localhost:4000/api/checkouts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(values),
        });
        const result = await res.json();
        if (!result.error) {
            toast.success(`Created [${values.name}]`);
            navigate(`/createpayment`, { state: { cart } });
        } else {
            toast.error(result.error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    // List of countries with their phone codes
    const countriesWithPhoneCodes = {
        "Afghanistan": "+93",
        "Albania": "+355",
        "Algeria": "+213",
        "Andorra": "+376",
        "Angola": "+244",
        "Antigua and Barbuda": "+1-268",
        "Argentina": "+54",
        "Armenia": "+374",
        "Australia": "+61",
        "Austria": "+43",
        "Azerbaijan": "+994",
        "Bahamas": "+1-242",
        "Bahrain": "+973",
        "Bangladesh": "+880",
        "Barbados": "+1-246",
        "Belarus": "+375",
        "Belgium": "+32",
        "Belize": "+501",
        "Benin": "+229",
        "Bhutan": "+975",
        "Bolivia": "+591",
        "Bosnia and Herzegovina": "+387",
        "Botswana": "+267",
        "Brazil": "+55",
        "Brunei": "+673",
        "Bulgaria": "+359",
        "Burkina Faso": "+226",
        "Burundi": "+257",
        "Cabo Verde": "+238",
        "Cambodia": "+855",
        "Cameroon": "+237",
        "Canada": "+1",
        "Central African Republic": "+236",
        "Chad": "+235",
        "Chile": "+56",
        "China": "+86",
        "Colombia": "+57",
        "Comoros": "+269",
        "Congo": "+242",
        "Costa Rica": "+506",
        "Croatia": "+385",
        "Cuba": "+53",
        "Cyprus": "+357",
        "Czech Republic": "+420",
        "Denmark": "+45",
        "Djibouti": "+253",
        "Dominica": "+1-767",
        "Dominican Republic": "+1-809, +1-829, +1-849",
        "Ecuador": "+593",
        "Egypt": "+20",
        "El Salvador": "+503",
        "Equatorial Guinea": "+240",
        "Eritrea": "+291",
        "Estonia": "+372",
        "Eswatini": "+268",
        "Ethiopia": "+251",
        "Fiji": "+679",
        "Finland": "+358",
        "France": "+33",
        "Gabon": "+241",
        "Gambia": "+220",
        "Georgia": "+995",
        "Germany": "+49",
        "Ghana": "+233",
        "Greece": "+30",
        "Grenada": "+1-473",
        "Guatemala": "+502",
        "Guinea": "+224",
        "Guinea-Bissau": "+245",
        "Guyana": "+592",
        "Haiti": "+509",
        "Honduras": "+504",
        "Hungary": "+36",
        "Iceland": "+354",
        "India": "+91",
        "Indonesia": "+62",
        "Iran": "+98",
        "Iraq": "+964",
        "Ireland": "+353",
        "Israel": "+972",
        "Italy": "+39",
        "Jamaica": "+1-876",
        "Japan": "+81",
        "Jordan": "+962",
        "Kazakhstan": "+7",
        "Kenya": "+254",
        "Kiribati": "+686",
        "Kosovo": "+383",
        "Kuwait": "+965",
        "Kyrgyzstan": "+996",
        "Laos": "+856",
        "Latvia": "+371",
        "Lebanon": "+961",
        "Lesotho": "+266",
        "Liberia": "+231",
        "Libya": "+218",
        "Liechtenstein": "+423",
        "Lithuania": "+370",
        "Luxembourg": "+352",
        "Madagascar": "+261",
        "Malawi": "+265",
        "Malaysia": "+60",
        "Maldives": "+960",
        "Mali": "+223",
        "Malta": "+356",
        "Marshall Islands": "+692",
        "Mauritania": "+222",
        "Mauritius": "+230",
        "Mexico": "+52",
        "Micronesia": "+691",
        "Moldova": "+373",
        "Monaco": "+377",
        "Mongolia": "+976",
        "Montenegro": "+382",
        "Morocco": "+212",
        "Mozambique": "+258",
        "Myanmar": "+95",
        "Namibia": "+264",
        "Nauru": "+674",
        "Nepal": "+977",
        "Netherlands": "+31",
        "New Zealand": "+64",
        "Nicaragua": "+505",
        "Niger": "+227",
        "Nigeria": "+234",
        "North Korea": "+850",
        "North Macedonia": "+389",
        "Norway": "+47",
        "Oman": "+968",
        "Pakistan": "+92",
        "Palau": "+680",
        "Palestine": "+970",
        "Panama": "+507",
        "Papua New Guinea": "+675",
        "Paraguay": "+595",
        "Peru": "+51",
        "Philippines": "+63",
        "Poland": "+48",
        "Portugal": "+351",
        "Qatar": "+974",
        "Romania": "+40",
        "Russia": "+7",
        "Rwanda": "+250",
        "Saint Kitts and Nevis": "+1-869",
        "Saint Lucia": "+1-758",
        "Saint Vincent and the Grenadines": "+1-784",
        "Samoa": "+685",
        "San Marino": "+378",
        "Sao Tome and Principe": "+239",
        "Saudi Arabia": "+966",
        "Senegal": "+221",
        "Serbia": "+381",
        "Seychelles": "+248",
        "Sierra Leone": "+232",
        "Singapore": "+65",
        "Slovakia": "+421",
        "Slovenia": "+386",
        "Solomon Islands": "+677",
        "Somalia": "+252",
        "South Africa": "+27",
        "South Korea": "+82",
        "South Sudan": "+211",
        "Spain": "+34",
        "Sri Lanka": "+94",
        "Sudan": "+249",
        "Suriname": "+597",
        "Sweden": "+46",
        "Switzerland": "+41",
        "Syria": "+963",
        "Taiwan": "+886",
        "Tajikistan": "+992",
        "Tanzania": "+255",
        "Thailand": "+66",
        "Timor-Leste": "+670",
        "Togo": "+228",
        "Tonga": "+676",
        "Trinidad and Tobago": "+1-868",
        "Tunisia": "+216",
        "Turkey": "+90",
        "Turkmenistan": "+993",
        "Tuvalu": "+688",
        "Uganda": "+256",
        "Ukraine": "+380",
        "United Arab Emirates": "+971",
        "United Kingdom": "+44",
        "United States": "+1",
        "Uruguay": "+598",
        "Uzbekistan": "+998",
        "Vanuatu": "+678",
        "Vatican City": "+379",
        "Venezuela": "+58",
        "Vietnam": "+84",
        "Yemen": "+967",
        "Zambia": "+260",
        "Zimbabwe": "+263",
    };

    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        const phoneCode = countriesWithPhoneCodes[countryCode];
        formik.setFieldValue('country', countryCode);
        formik.setFieldValue('phone', phoneCode);
    };

    // Function to handle key press event for the full name input
  const handleKeyPress = (event) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleKeyPress1 = (event) => {
    const regex = /^\d+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };



  return (
    <div style={{
        minHeight: "100vh",
        backgroundColor: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    }}>
        <div style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            padding: "40px 30px",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Poppins', sans-serif"
        }}>
            <h2
            style={{
                textAlign: "center", // Aligns the text to the center
                fontWeight: "600",
                fontSize: "30px",
                marginBottom: "3px",
                color: "rgb(255, 255, 255)", // Text color white for contrast
                fontStyle: "italic",
                textDecoration: "underline",
                padding: "10px",
                backgroundColor: "#f5a623", // Added background color (you can change this)
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                display: "inline-block",
                width: "100%", // Ensures full width for centering
                position: "relative",
                top: "50%", // Centers vertically
                transform: "translateY(-50%)", // Centers vertically with translation
                background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            }}
            >
            Checkout Details
            </h2>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: "500", marginBottom: "5px" }}>Customer Name :</Form.Label>
                    <Form.Control
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter Customer Name"
                        onKeyPress={handleKeyPress}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.name && formik.errors.name}
                        style={{ borderRadius: "8px" }}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label style={{ fontWeight: "500", marginBottom: "5px" }}>Customer Address :</Form.Label>
                    <Form.Control
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter Customer Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.address && formik.errors.address}
                        style={{ borderRadius: "8px" }}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="city">
                    <Form.Label style={{ fontWeight: "500", marginBottom: "5px" }}>City : </Form.Label>
                    <Form.Control
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Enter City"
                        onKeyPress={handleKeyPress}
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.city && formik.errors.city}
                        style={{ borderRadius: "8px" }}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="country">
                    <Form.Label style={{ fontWeight: "500", marginBottom: "5px" }}>Country :</Form.Label>
                    <Form.Control
                        as="select"
                        id="country"
                        name="country"
                        value={formik.values.country}
                        onChange={handleCountryChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.country && formik.errors.country}
                        style={{ borderRadius: "8px" }}
                    >
                        <option value="">Select Country</option>
                        {Object.keys(countriesWithPhoneCodes).map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="zip">
                    <Form.Label style={{ fontWeight: "500", marginBottom: "5px" }}>ZIP : </Form.Label>
                    <Form.Control
                        id="zip"
                        name="zip"
                        type="number"
                        placeholder="Enter zip"
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.zip && formik.errors.zip}
                        style={{ borderRadius: "8px" }}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.zip}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label style={{ fontWeight: "500", marginBottom: "5px" }}>Phone : </Form.Label>
                    <Form.Control
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter phone"
                        onKeyPress={handleKeyPress1}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.phone && formik.errors.phone}
                        style={{ borderRadius: "8px" }}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label style={{ fontWeight: "500", marginBottom: "5px" }}>Email : </Form.Label>
                    <Form.Control
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.email && formik.errors.email}
                        style={{ borderRadius: "8px" }}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Button
                    id="btn"
                    name="submit"
                    variant="warning"
                    type="submit"
                    style={{
                        width: "100%",
                        background: "linear-gradient(90deg, #ff8a00, #e52e71)",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "18px",
                        padding: "14px 0",
                        fontWeight: "700",
                        marginTop: "20px",
                        color: "#fff",
                        transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                    >
                    Place Order
                    </Button>

            </Form>
        </div>
    </div>
);


};

export default CreateCheckout;
