import { takeLatest } from 'redux-saga/effects';
import { GET_PRODUCTS, GET_USER } from '@Keys';
import { getUserSaga } from '@Sagas/UserSaga';
import { getProductListSaga } from '@Sagas/ProductSaga';

export default function* rootSaga() {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(GET_PRODUCTS, getProductListSaga);
}
