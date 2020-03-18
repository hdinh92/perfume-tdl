import * as PDConstants from "./../constants/product";
import * as ODConstants from "./../constants/orders";
import * as AUConstants from "./../constants/index";
import * as PDActions from "./../actions/product";
import * as ODActions from "./../actions/orders";
import * as auActions from "./../actions/auth";
import { showLoading, hideLoading, hideModal } from "./../actions/ui";
import {
  fork,
  take,
  call,
  put,
  select,
  delay,
  takeLatest,
  takeEvery
} from "redux-saga/effects";
import {
  getList,
  addProduct,
  deleteProduct,
  updateProduct
} from "../apis/product";
import { getListOrder, deleteOrder, updateOrderStatus } from "../apis/order";
import { addUser } from "../apis/user";
import { STATUS_CODE } from "../constants";
function* watchFetchAllProduct() {
  while (true) {
    const action = yield take(PDConstants.FETCH_ALL_PRODUCT);
    const { params } = action.payload;
    yield put(showLoading());
    const resp = yield call(getList, params);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(PDActions.fetchAllProductSuccess(data));
    } else {
      yield put(PDActions.fetchAllProductFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}
function* filterProductSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(PDActions.fetchAllProduct({ filter: keyword }));
}
function* sortProductSaga({ payload }) {
  const { value } = payload;
  yield put(PDActions.fetchAllProduct({ search: value }));
}
function* addProductSaga({ payload }) {
  const { product } = payload;
  yield put(showLoading());
  const resp = yield call(addProduct, product);
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(PDActions.addProductSuccess(data));
    yield put(hideModal());
  } else {
    yield put(PDActions.addProductFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}
function* deleteProductSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteProduct, id);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(PDActions.deleteProductSuccess(id));
    yield put(hideModal());
  } else {
    yield put(PDActions.deleteProductFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}
function* updateProductSaga({ payload }) {
  const { product } = payload;
  const productEditing = yield select(state => state.product.productEditing);
  yield put(showLoading());
  const resp = yield call(updateProduct, product, productEditing.id);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(PDActions.updateProductSuccess(data));
    yield put(hideModal());
  } else {
    yield put(PDActions.updateProductFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* watchFetchOrders() {
  while (true) {
    const action = yield take(ODConstants.FETCH_ORDERS);
    const { params } = action.payload;
    yield put(showLoading());
    const resp = yield call(getListOrder, params);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(ODActions.fetchOrdersSuccess(data));
    } else {
      yield put(ODActions.fetchOrdersFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}
function* filterOrderSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(ODActions.fetchOrders({ filter: keyword }));
}
function* deleteOrderSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteOrder, id);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(ODActions.deleteOrderSuccess(id));
    yield put(hideModal());
  } else {
    yield put(ODActions.deleteOrderFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}
function* updateOrderStatusSaga({ payload }) {
  const { data: order } = payload;
  const orderSelected = yield select(state => state.orders.orderSelected);
  yield put(showLoading());
  const resp = yield call(updateOrderStatus, order, orderSelected.id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(ODActions.updateStatusOrderSuccess(data));
    yield put(hideModal());
  } else {
    yield put(ODActions.updateStatusOrderFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* loginSuccessSaga() {
  yield put(showLoading());
  yield delay(2000);
  yield put(hideLoading());
}
function* addUserSaga({ payload }) {
  const { user } = payload;
  yield put(showLoading());
  const resp = yield call(addUser, user);
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(auActions.signUpSuccess(data));
    // localStorage.setItem("token", data.token)
  } else {
    yield put(auActions.signUpFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}
function* rootSaga() {
  yield fork(watchFetchAllProduct);
  yield takeLatest(PDConstants.FILTER_PRODUCT, filterProductSaga);
  yield takeEvery(PDConstants.SORT_PRODUCT, sortProductSaga);
  yield takeEvery(PDConstants.ADD_PRODUCT, addProductSaga);
  yield takeEvery(PDConstants.UPDATE_PRODUCT, updateProductSaga);
  yield takeEvery(PDConstants.DELETE_PRODUCT, deleteProductSaga);

  yield fork(watchFetchOrders);
  yield takeLatest(ODConstants.FILTER_ORDER, filterOrderSaga);
  yield takeEvery(ODConstants.DELETE_ORDER, deleteOrderSaga);
  yield takeEvery(ODConstants.UPDATE_STATUS_ORDER, updateOrderStatusSaga);

  yield takeEvery(AUConstants.LOGIN_SUCCESS, loginSuccessSaga);
  yield takeEvery(AUConstants.SIGN_UP, addUserSaga);
}
export default rootSaga;

