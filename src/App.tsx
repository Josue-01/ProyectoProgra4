import Navbar from "./Components/layout/Navbar";
import Home from "./Components/layout/Home";
import Products from "./Components/Products";
import ProductsViews from "./Components/Forms/ProductsView";
import ProductsCreate from "./Components/Forms/ProductsCreate";
import ProductsUpdate from "./Components/Forms/ProductsUpdate";
import { ProductProvider } from './Components/context/ProductProvider';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container-1">
      <Router>
        <Navbar></Navbar>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/ViewProducts/:id" element={<ProductsViews />} />
            <Route path="/ProductsCreate" element={<ProductsCreate />} />
            <Route path="/ProductsUpdate/:id" element={<ProductsUpdate />} />
          </Routes>
        </ProductProvider>
      </Router>
    </div>
  );
}

export default App;
