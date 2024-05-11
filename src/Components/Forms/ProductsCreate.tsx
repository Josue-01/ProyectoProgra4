import React, { useContext, useState } from 'react';
import { ProductContext } from '../../Components/context/ProductProvider';
import ProductType from '../../Types/ProductType';
import '../../../public/css/FormsStyles.css';
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
    images: [], // Ahora images es un array vacío para almacenar múltiples URL de imágenes
    category: { id: 0, name: '', image: '' },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if(name == "images"){
      productData.images.push(value)
    }else{
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    // Filtra las cadenas vacías del arreglo de imágenes
    const cleanedImages = productData.images.filter((image) => image.trim() !== '');
  
    // Verifica si quedan imágenes después de limpiar
    if (cleanedImages.length === 0) {
      console.error('No hay URLs válidas en la cadena de imágenes.');
      return; // Termina la función si no hay URLs válidas
    }
  
    // Actualiza el objeto productData con las imágenes limpias
    const updatedProductData = { ...productData, images: cleanedImages };
  
    // Agrega el producto utilizando addProduct (asegúrate de pasar los datos correctos)
    console.log(updatedProductData)
    await addProduct(updatedProductData);
  
    // Navega a la ruta '/products' después de agregar el producto
    navigate('/products');
  };
  


  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={productData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <label htmlFor="categoryId">Category Id</label>
        <input
          type="number"
          name="categoryId"
          value={productData.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
        />
        <label htmlFor="images">URL Images</label>
        <input
          type="text"
          name="images"
          value={productData.images} // Mostrar las URLs de imágenes como una lista separada por comas
          onChange={handleChange}
          placeholder="Image URLs"
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
