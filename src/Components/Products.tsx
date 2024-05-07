import { useContext } from 'react';
import { ProductContext } from '../Components/context/ProductProvider';
import ProductType from '../Types/ProductType';
import { Link } from 'react-router-dom';

const Products = () => {
  const { products, getProductById, deleteProduct } = useContext(ProductContext);

  const handleUpdate = (id: number) => {
    const productToUpdate = getProductById(id);
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  return (
    <div>
      <h1>Products</h1>
      <Link to="/ProductsCreate">Crear Producto</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductType) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.category.id}</td>
              <td>
                <button onClick={() => handleUpdate(product.id)}>Update</button>
                <Link to={`/ViewProducts/${product.id}`}>View</Link>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
