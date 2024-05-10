import { createContext, useState, ReactNode, useEffect } from 'react';
import ProductType from '../../Types/ProductType';

//mcrea los metodos y los parametros o tipoa dw datos que recibe
type ProductContextType = {
  products: ProductType[];
  getProducts: (pageNumber: number, pageSize: number) => void;
  getProductById: (id: number) => Promise<ProductType | undefined>;
  addProduct: (product: ProductType) => Promise<void>;
  updateProduct: (id: number, updatedProduct: ProductType) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  pageNumber: number;
  pageSize: number;
  //para asignarle valores mas adewlante
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
};
//se le aasigna una valor por dewfault
export const ProductContext = createContext<ProductContextType>({
  products: [],
  getProducts: () => {},
  //devuelve un undefine
  getProductById: () => Promise.resolve(undefined),
  //devuevle un arreglo vacio
  addProduct: () => Promise.resolve(),
  //
  updateProduct: () => Promise.resolve(),
  deleteProduct: () => Promise.resolve(),
  pageNumber: 0,
  pageSize: 10,
  setPageNumber: () => {},
  setPageSize: () => {},
});

//investigar
type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const getProducts = async (pageNumber: number, pageSize: number) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${pageNumber * pageSize}&limit=${pageSize}`);
      //llenamos la data con la   que devuelva la API
      const data: ProductType[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    getProducts(pageNumber, pageSize);
  }, [pageNumber, pageSize]); // Se ejecutará cada vez que pageNumber o pageSize cambien


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
      getProducts(pageNumber, pageSize); // Usar pageNumber y pageSize actuales
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
      getProducts(pageNumber, pageSize); // Usar pageNumber y pageSize actuales
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      // Eliminar de la api
      await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'DELETE',
      });
      // Eliminar del array local
      getProducts(pageNumber, pageSize); // Usar pageNumber y pageSize actuales
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  //los valores que van a contener, es tdoo lo que puede recibir y llmar, llama a todos los metodos
  const contextValue: ProductContextType = {
    products,
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
  };

  return (
    //para retornar el product proviter
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
