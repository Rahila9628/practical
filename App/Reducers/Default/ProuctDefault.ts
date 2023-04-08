import { ProductData } from "Utils/Interfaces";

export interface ProductDefault {
  products: ProductData[];
  isLoading: boolean;
}
const productDefault: ProductDefault = {
  products: [],
  isLoading: false
};

export default productDefault;
