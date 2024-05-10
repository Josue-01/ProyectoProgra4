import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../Components/context/ProductProvider';
import ProductType from '../../Types/ProductType';
import { useParams } from 'react-router-dom';
import '../../../public/css/FormsStyles.css'
import { useNavigate } from 'react-router-dom';

const ProductsUpdate = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/products'); // Navega a la ruta "/products" al hacer clic en el botón
  };
    const { id } = useParams<{ id: string }>();
    const { getProductById, updateProduct } = useContext(ProductContext);
    const [productData, setProductData] = useState<ProductType | null>(null);
  
    useEffect(() => {
      const fetchProduct = async () => {
        const product = await getProductById(Number(id));
        if (product) {
          setProductData(product);
        } else {
          console.error(`No se encontró el producto con ID ${id}`);
        }
      };
      fetchProduct();
    }, [getProductById, id]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name === 'images') {
        setProductData((prevData) => ({ ...prevData!, [name]: [value] }));
      } else {
        setProductData((prevData) => ({ ...prevData!, [name]: value }));
      }
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!Array.isArray(productData?.images) || productData?.images.length < 1) {
        console.error('El campo de imágenes debe ser un array con al menos un elemento.');
        return;
      }
      if (!productData?.images.every((image) => isValidUrl(image))) {
        console.error('Cada valor en el campo de imágenes debe ser una dirección URL válida.');
        return;
      }
      await updateProduct(productData!.id, productData!); // Asegúrate de que productData no sea null aquí
    };
  
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };
  
    if (!productData) {
      return <div>Loading...</div>;
    }
  return (
    <div  className='formContainer'>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={productData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="number"
        name="price"
        value={productData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <textarea
        name="description"
        value={productData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="categoryId"
        value={productData.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
      />
      <input
        type="text"
        name="images"
        value={productData.images}
        onChange={handleChange}
        placeholder="Image URL"
      />
<div className='containerButtons'>
<button type="submit">Update Product</button>
      <button type="button" onClick={handleBack}>
      Back
    </button>
</div>
    </form>
    </div>
  );
};

export default ProductsUpdate;
