import Navbar from './Components/layout/Navbar';
import Home from './Components/layout/Home';
import Products from './Components/context/ProductProvider';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
<div className='container-1'>
<Router>
<Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
</div>
  )
}

export default App
