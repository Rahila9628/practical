import { put } from 'redux-saga/effects';
import { store } from '@Stores/index';
import { getProductList } from '@Services/ProductService';
import { ProductDefault } from '@Reducers/Default/ProuctDefault';
import { SET_PRODUCTS } from '@Actions/Keys';

export function* getProductListSaga(action: any): any {
  console.log('TUEFWGEWFUEFDOIJFO');

  const product = store.getState().product;
  const params = action.payload;
  try {
    let response: any = yield getProductList();
    if (response.code === 200 && response.data) {
      yield put<{
        type: string;
        payload: ProductDefault;
      }>({
        type: SET_PRODUCTS,
        payload: {
          ...product,
          isLoading: false,
          products:
            response.data,
        },
      });
    }
  } catch (error) {
    yield put<{
      type: string;
      payload: ProductDefault;
    }>({
      type: SET_PRODUCTS,
      payload: {
        ...product,
        isLoading: false,
      },
    });
  }
}
