import { useContext } from 'react';
import { ProductContext } from '../Components/context/ProductProvider';
import ProductType from '../Types/ProductType';
import { Link } from 'react-router-dom';
import '../../public/css/styles.css'
import Pager from '../Components/extensions/Pager';

const Products = () => {
  const { products, deleteProduct } = useContext(ProductContext);
  const handleDelete = (id: number) => {
    deleteProduct(id);
  };


  return (
    <div className='container'>
      <h1>Products</h1>
      <Link className='button buttonCreate' to="/ProductsCreate">Crear Producto</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductType) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td className='actions'>
                <Link className='button buttonUpdate' to={`/ProductsUpdate/${product.id}`}>Update</Link>
                <Link className='button buttonView' to={`/ViewProducts/${product.id}`}>View</Link>
                <button className='buttonDelete' onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
       <Pager />
     </div>
    </div>
  );
};

export default Products;
