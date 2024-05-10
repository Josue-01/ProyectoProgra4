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
      const imageUrl = value.trim(); // Eliminar espacios en blanco al inicio y al final
      if (imageUrl) {
        const updatedImages = imageUrl.split(',').map((url) => url.trim());
        setProductData((prevData) => ({ ...prevData, [name]: updatedImages }));
      } else {
        setProductData((prevData) => ({ ...prevData, [name]: [] }));
      }
    } else {
      setProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addProduct(productData);
  };


  return (
<div className='formContainer'>
<form onSubmit={handleSubmit}>
  <label htmlFor="">Title</label>
    <input
        type="text"
        name="title"
        value={productData.title}
        onChange={handleChange}
        placeholder="Title"
      />
       <label htmlFor="">Price</label>
      <input
        type="number"
        name="price"
        value={productData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <label htmlFor="">Description</label>
      <textarea
        name="description"
        value={productData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <label htmlFor="">Category Id</label>
      <input
        type="number"
        name="categoryId"
        value={productData.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
      />
      <label htmlFor="">URL Images</label>
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
