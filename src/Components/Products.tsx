import { useState } from 'react';
import { useContext } from 'react';
import { ProductContext } from '../Components/context/ProductProvider';
import ProductType from '../Types/ProductType';
import { Link } from 'react-router-dom';
import '../../public/css/styles.css';
import Pager from '../Components/extensions/Pager';

const Products = () => {
  const { products, deleteProduct } = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  const filteredProducts = products.filter((product: ProductType) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setProductIdToDelete(id); // Guarda el ID del producto a eliminar
    setShowModal(true); // Abre el modal de confirmación
  };

  const confirmDelete = () => {
    if (productIdToDelete !== null) {
      deleteProduct(productIdToDelete); // Elimina el producto
    }
    setShowModal(false); // Cierra el modal de confirmación
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal de confirmación sin eliminar el producto
  };

  return (
    <div className='container'>
      <h1>Products</h1>
      <Link className='button buttonCreate' to="/ProductsCreate">Crear Producto</Link>
      <div className="search-bar">
        <h3>Search Product</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Actualiza el texto de búsqueda al escribir
        />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Product</h2>
            <p>Are you sure you want to remove this product?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
         <tbody>
          {filteredProducts.map((product: ProductType) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td className='tittle'>{product.title}</td>
              <td className=''>${product.price}</td>
              <td className=''>{product.category.name}</td>
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
