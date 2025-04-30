import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
import logo123 from '../assets/logo123.jpg';

const Login = () => {
  const { toast } = useContext(ToastContext);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error('Please enter all the required fields!!');
      return;
    }

    try {
      const { user } = await loginUser(credentials);
      localStorage.setItem('email', user.email);
      localStorage.setItem('id', user._id);
      localStorage.setItem('name', user.name);
      localStorage.setItem('address', user.address);
      localStorage.setItem('phone', user.phone);

      toast.success(`Logged in ${user.name}`);
      if (user && user.userRole) {
        switch (user.userRole) {
          case 'EMPLOYEE_MANAGER':
            navigate('/employee-manager');
            break;
          case 'INVENTORY_MANAGER':
            navigate('/inventory-manager');
            break;
          case 'SUPPLIER_MANAGER':
            navigate('/supplier-manager');
            break;
          case 'DELIVERY_MANAGER':
            navigate('/delivery-manager');
            break;
          case 'TRANSPORT_MANAGER':
            navigate('/transport-manager');
            break;
          case 'PRODUCT_MANAGER':
            navigate('/product-manager');
            break;
          case 'PAYMENT_MANAGER':
            navigate('/payment-manager');
            break;
          case 'CUSTOMER_MANAGER':
            navigate('/customer-manager');
            break;
          default:
            navigate('/customer');
            break;
        }
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to login.Please try again');
    }
  };

  return (
    <>
      <div
        className="row"
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f7fa',
        }}
      >
        <div className="col-md-6 d-flex align-items-stretch">
          <img
            src={logo123}
            alt="Login Image"
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6" style={{ padding: '40px' }}>
          <h3 style={{ marginBottom: '30px', color: '#333', fontWeight: '600' }}>
            Login
          </h3>
          <Form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: '#ffffff',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={credentials.email}
                onChange={handleInputChange}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button
              id="btn"
              name="submit"
              variant="primary"
              type="submit"
              style={{ width: '100%', marginTop: '15px' }}
            >
              Login
            </Button>

            <Form.Group>
              <p style={{ marginTop: '20px', fontSize: '14px' }}>
                Don't Have an Account?
                <Link to="/register" style={{ marginLeft: '5px', color: '#0d6efd', textDecoration: 'none' }}>
                  Register
                </Link>
              </p>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
