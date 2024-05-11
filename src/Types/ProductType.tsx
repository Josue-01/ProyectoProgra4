import CategoryType from "./CategoryType"
type ProductType = {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
    category:CategoryType;
}

export default ProductType