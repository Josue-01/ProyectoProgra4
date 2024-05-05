import React, { createContext, useState, useEffect, ReactNode } from "react";
import ProductType from "../../Types/ProductType";
// propiedades del producto

//Vamos a tener todas las funciones de una API GET GET/ID POST PUT DELETE
interface ProductContextType {
    products: ProductType[];
    getProducts: () => void;
    getProductById: (id: number) => ProductType | undefined;
    addProduct: (product: ProductType) => void;
    updateProduct: (id: number, updatedProduct: ProductType) => void;
    deleteProduct: (id: number) => void;
}


const ProductContext = createContext<ProductContextType | undefined>(undefined);
// Proveedor de contexto para operaciones de productos en las cuales van estar las funciones de la API
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ProductType[]>([]);

    // Función para obtener todos los productos de la API
    const getProducts = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();
            setProducts(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    
    useEffect(() => {
        getProducts();
    }, []);

    // Función para obtener un producto por su ID
    const getProductById = (id: number): ProductType | undefined => {
        return products.find(product => product.id === id);
    };

    // Función para agregar un nuevo producto
    const addProduct = (product: ProductType) => {
        setProducts([...products, product]);
    };

    // Función para actualizar un producto existente
    const updateProduct = (id: number, updatedProduct: ProductType) => {
        setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
    };

    // Función para eliminar un producto
    const deleteProduct = (id: number) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, getProducts, getProductById, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};


export default ProductContext;
