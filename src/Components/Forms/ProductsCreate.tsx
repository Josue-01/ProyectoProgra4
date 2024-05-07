import { useState } from 'react';
import { useContext } from 'react';
import { ProductContext } from '../../Components/context/ProductProvider';
import ProductType from '../../Types/ProductType';

const ProductsCreate = () => {
  const { addProduct } = useContext(ProductContext);

  //Valor por default en caso de no llenar todo los campos
  const initialProductState: ProductType = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    category: { id: 1, name: '', image: '' },
    img: '',
  };

  const [product, setProduct] = useState<ProductType>(initialProductState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'category') {
      // Actualiza solo la propiedad 'name' dentro de 'category'
      setProduct(prevProduct => ({
        ...prevProduct,
        category: { ...prevProduct.category, id : 1, name: value, image: '' },
      }));
    } else {
      // Actualiza los demás campos del producto
      setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct(product);
    setProduct(initialProductState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={product.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={product.description} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} />
      </label>
      <label>
        Category Name:
        <input type="text" name="category" value={product.category.name} onChange={handleChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="img" value={product.img} onChange={handleChange} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductsCreate;
