import { createContext, useContext } from 'react';
import ProductType from '../../Types/ProductType';


type ProductContextType = {
    products: ProductType[]; // Usa ProductType como tipo de los productos
    fetchProducts: () => void;
  };

export const ProductContext = createContext<ProductContextType | undefined>(undefined);


export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext debe usarse dentro de un ProductProvider');
  }
  return context;
};

export default ProductContext;
