import { createContext, useState, useEffect, ReactNode } from 'react';
import ProductType from '../../Types/ProductType';

type ProductContextType = {
  products: ProductType[];
  getProducts: () => void;
  getProductById: (id: number) => Promise<ProductType | undefined>;
  addProduct: (product: ProductType) => Promise<void>;
  updateProduct: (id: number, updatedProduct: ProductType) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  getProducts: () => {},
  getProductById: () => Promise.resolve(undefined),
  addProduct: () => Promise.resolve(),
  updateProduct: () => Promise.resolve(),
  deleteProduct: () => Promise.resolve(),
});

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data: ProductType[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const getProductById = async (id: number): Promise<ProductType | undefined> => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      const productData: ProductType = await response.json();
      return productData;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      return undefined;
    }
  };

  const addProduct = async (product: ProductType) => {
    try {
       await fetch('https://api.escuelajs.co/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      getProducts();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  const updateProduct = async (id: number, updatedProduct: ProductType) => {
    try {
      await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      getProducts();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      //Eliminar de la api
      await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'DELETE',
      });
      //Eliminar del array local 
      getProducts();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const contextValue: ProductContextType = {
    products,
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
