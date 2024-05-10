import React, { useContext, useState } from 'react';
import { ProductContext } from '../../Components/context/ProductProvider';
import ProductType from '../../Types/ProductType';
import '../../../public/css/FormsStyles.css'
import { useNavigate } from 'react-router-dom';

const ProductsCreate = () => {
  const { addProduct } = useContext(ProductContext);

    const navigate = useNavigate();
  
    const handleBack = () => {
      navigate('/products'); // Navega a la ruta "/products" al hacer clic en el botón
    };
  const [productData, setProductData] = useState<ProductType>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'images') {
      setProductData((prevData) => ({ ...prevData, [name]: [value] })); 
    } else {

      setProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Array.isArray(productData.images) || productData.images.length < 1) {
      console.error('El campo de imágenes debe ser un array con al menos un elemento.');
      return;
    }
    if (!productData.images.every((image) => isValidUrl(image))) {
      console.error('Cada valor en el campo de imágenes debe ser una dirección URL válida.');
      return;
    }
    await addProduct(productData);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
<div className='formContainer'>
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
<button type="submit">Add Product</button>
      <button type="button" onClick={handleBack}>
      Back
    </button>
</div>
    </form>
</div>
  );
};

export default ProductsCreate;
