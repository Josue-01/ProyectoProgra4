import CategoryType from "./CategoryType"
type ProductType = {
    id: number;
    title: string;
    price: number;
    description: string;
    img: string;
    category: CategoryType; // objeto de category porque la api lo maneja como objeto
}

export default ProductType