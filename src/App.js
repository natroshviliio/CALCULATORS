import { Col } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import "../node_modules/bpg-arial-caps/css/bpg-arial-caps.min.css";
import CalculateFromXLSX from './Components/CalculateFromXLSX';

function App() {


  return (
    <Routes>
      <Route path='/' element={
        <Col className='d-flex gap-3 align-items-center p-4'>
          <Link to='/uniques'>UNIQUES</Link>
        </Col>
      } />
      <Route path='/uniques' element={<CalculateFromXLSX />} />
    </Routes>
  );
}

export default App;
