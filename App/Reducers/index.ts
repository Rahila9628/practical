import { combineReducers } from 'redux';
import UserReducer from '@Reducers/UserReducer';
import ProductReducer from '@Reducers/ProductReducer';

export default combineReducers({
  user: UserReducer,
  product: ProductReducer,
});
