import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../Components/context/ProductProvider';
import ProductType from '../../Types/ProductType';

const ProductsView = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useContext(ProductContext);
  const [product, setProduct] = useState<ProductType | undefined>(undefined);

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
    <div>
      <h2>Detalles del Producto</h2>
      <div key={product.id}>
        <h2>{product.id}</h2>
        <h3>Titulo: {product.title}</h3>
        <span>{product.description}</span>
        <img src={product.img} alt={product.title} />
      </div>
    </div>
  );
};

export default ProductsView;
