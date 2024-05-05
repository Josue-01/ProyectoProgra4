import { Link } from 'react-router-dom';
import '../../../public/css/Navbar.css'; 

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
