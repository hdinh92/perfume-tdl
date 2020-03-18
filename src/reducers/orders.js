import * as Types from "../constants/orders";
import { toastError, toastSuccess } from "../commons/helpers/toastHelpers";
const initialState = {
  listOrder: [],
  keyword: "",
  orderSelected: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_ORDERS: {
      return {
        ...state
      };
    }
    case Types.FETCH_ORDERS_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listOrder: data
      };
    }
    case Types.FETCH_ORDERS_FAILED: {
      const{ error} = action.payload
      toastError(error);
      return {
        ...state,
        listOrder: []
      };
    }

    case Types.FILTER_ORDER: {
      const { keyword } = action.payload;
      return {
        ...state,
        keyword
      };
    }
    case Types.FILTER_ORDER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listOrder: data
      };
    }

    case Types.DELETE_ORDER: {
      return {
        ...state
      };
    }
    case Types.DELETE_ORDER_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Đã hủy đơn hàng");
      return {
        ...state,
        listOrder: state.listOrder.filter(item => item.id !== data)
      };
    }
    case Types.DELETE_ORDER_FAILED: {
      const { error } = action.payload;
       toastError(error);
      return {
        ...state
      };
    }

    case Types.UPDATE_STATUS_ORDER: {
      return {
        ...state
      };
    }
    case Types.UPDATE_STATUS_ORDER_SUCCESS: {
      const { data } = action.payload;
      const { listOrder } = state;
      const index = listOrder.findIndex(item => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listOrder.slice(0, index),
          data,
          ...listOrder.slice(index + 1)
        ];
        toastSuccess("Cập nhật trạng thái đơn hàng thành công");
        return {
          ...state,
          listOrder: newList
        };
      }
      return {
        ...state
      };
    }
    case Types.UPDATE_STATUS_ORDER_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state
      };
    }

    case Types.ORDER_SELECTED: {
      const { order } = action.payload;
      return {
        ...state,
        orderSelected: order
      };
    }

    default:
      return state;
  }
};

export default reducer;
