import { SET_PRODUCTS, SET_USER } from '@Keys';
import DefaultState from '@Default';
import { ProductDefault } from '@Default/ProuctDefault';

const INIT_STATE = DefaultState.product;

const ProductReducer = (state = INIT_STATE, action: any): ProductDefault => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default ProductReducer;
