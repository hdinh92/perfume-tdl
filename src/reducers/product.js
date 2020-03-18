import * as Types from "../constants/product";
import { toastError, toastSuccess } from "../commons/helpers/toastHelpers";
const initialState = {
  listProduct: [],
  keyword: "",
  sortValue:'',
  productEditing: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_ALL_PRODUCT: {
      return {
        ...state
      };
    }
    case Types.FETCH_ALL_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProduct: data
      };
    }
    case Types.FETCH_ALL_PRODUCT_FAILED: {
      return {
        ...state,
        listProduct: []
      };
    }
    case Types.FILTER_PRODUCT: {
      const { keyword } = action.payload;
      return {
        ...state,
        keyword
      };
    }
    case Types.FILTER_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProduct: data
      };
    }
    case Types.ADD_PRODUCT: {
      return {
        ...state
      };
    }
    case Types.ADD_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Thêm mới sản phẩm thành công");
      return {
        ...state,
        listProduct: state.listProduct.concat([data])
      };
    }
    case Types.ADD_PRODUCT_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state
      };
    }
    case Types.DELETE_PRODUCT: {
      return {
        ...state
      };
    }
    case Types.DELETE_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Xóa sản phẩm thành công");
      return {
        ...state,
        listProduct: state.listProduct.filter(item => item.id !== data)
      };
    }
    case Types.DELETE_PRODUCT_FAILED: {
      const {error} = action.payload
      toastError(error);
      return {
        ...state
      };
    }
    case Types.SET_PRODUCT_EDITING: {
      const { product } = action.payload;
      return {
        ...state,
        productEditing: product
      };
    }
    case Types.UPDATE_PRODUCT: {
      return {
        ...state
      };
    }
    case Types.UPDATE_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      const index = state.listProduct.findIndex(item => item.id === data.id);
      if (index !== -1) {
        const newListProduct = [
          ...state.listProduct.slice(0, index),
          data,
          ...state.listProduct.slice(index + 1)
        ];
        toastSuccess("Cập nhật sản phẩm thành công");
        return {
          ...state,
          listProduct: newListProduct
        };
      }
      return {
        ...state
      };
    }
    case Types.UPDATE_PRODUCT_FAILED: {
      const { error } = action.payload
      toastError(error);
      return {
        ...state
      };
    }
    case Types.SORT_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProduct: data
      };
    }
    case Types.SORT_PRODUCT: {
      const { value } = action.payload;
      return {
        ...state,
        sortValue : value
      };
    }
    default:
      return state;
  }
};

export default reducer;
