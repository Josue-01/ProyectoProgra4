import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../Components/context/ProductProvider';
import ProductType from '../../Types/ProductType';
import '../../../public/css/view.css'
import { useNavigate } from 'react-router-dom';

const ProductsView = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useContext(ProductContext);
  const [product, setProduct] = useState<ProductType | undefined>(undefined);
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/products'); // Navega a la ruta "/products" al hacer clic en el botón
  };
  useEffect(() => {
    const fetchData = async () => {
      const productData = await getProductById(Number(id));
      setProduct(productData);
    };
    fetchData();
  }, [id, getProductById]);

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div className='view'>
      <h2>Detalles del Producto</h2>
      <div className='containerView' key={product.id}>
        <h2>#{product.id}</h2>
        <h3>Titulo: {product.title}</h3>
        <span>{product.description}</span>
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className='containerButtons'>
      <button type="button" onClick={handleBack}>
      Back
    </button>
</div>
    </div>
  );
};

export default ProductsView;
