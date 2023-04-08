import { GET_PRODUCTS, SET_PRODUCTS } from '@Keys';

export const getProductList = () => ({
  type: GET_PRODUCTS,
});

export const setProductList = (payload: any) => ({
  type: SET_PRODUCTS,
  payload
});