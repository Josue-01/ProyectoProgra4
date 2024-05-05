import React, { useContext, useEffect } from "react";
import ProductContext from "./ProductContext";

const ProductTable = () => {
  const { products, getProducts } = useContext(ProductContext) || { products: [], getProducts: () => {} };

  useEffect(() => {
    getProducts(); // Llama a la función getProducts para cargar los productos cuando el componente se monte
  }, [getProducts]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Titulo</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
