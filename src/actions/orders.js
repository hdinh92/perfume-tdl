import * as Types from "./../constants/orders";
import { ORDER_STATUS } from "../constants/orders";

export const fetchOrders = (params = {}) => {
  return {
    type: Types.FETCH_ORDERS,
    payload: {
      params
    }
  };
};
export const fetchOrdersSuccess = data => {
  return {
    type: Types.FETCH_ORDERS_SUCCESS,
    payload: {
      data
    }
  };
};
export const fetchOrdersFailed = error => {
  return {
    type: Types.FETCH_ORDERS_FAILED,
    payload: {
      error
    }
  };
};

export const filterOrder = keyword => {
  return {
    type: Types.FILTER_ORDER,
    payload: {
      keyword
    }
  };
};

export const filterOrderSuccess = data => {
  return {
    type: Types.FILTER_ORDER_SUCCESS,
    payload: {
      data
    }
  };
};

export const deleteOrder = id => ({
  type: Types.DELETE_ORDER,
  payload: {
    id
  }
});
export const deleteOrderSuccess = data => ({
  type: Types.DELETE_ORDER_SUCCESS,
  payload: {
    data
  }
});
export const deleteOrderFailed = error => ({
  type: Types.DELETE_ORDER_FAILED,
  payload: {
    error
  }
});

export const orderSelected = order => ({
  type: Types.ORDER_SELECTED,
  payload: {
    order
  }
});

export const updateStatusOrder = (data, status = ORDER_STATUS[1].value) => ({
  type: Types.UPDATE_STATUS_ORDER,
  payload: {
    data,
    status
  }
});
export const updateStatusOrderSuccess = data => ({
  type: Types.UPDATE_STATUS_ORDER_SUCCESS,
  payload: {
    data
  }
});
export const updateStatusOrderFailed = error => ({
  type: Types.UPDATE_STATUS_ORDER_FAILED,
  payload: {
    error
  }
});


