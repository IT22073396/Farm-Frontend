import Spinner from 'react-bootstrap/Spinner';

const Spinner = ({splash = "Loading..."}) => {
    <Spinner animation="border" role="status">
      <span className="visually-hidden" >{splash}</span>
      <h3>Loading Employees</h3>
    </Spinner>
}

export default Spinner;