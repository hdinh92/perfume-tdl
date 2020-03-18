import * as Types from "../constants/index";
import { toastError, toastSuccess } from "../commons/helpers/toastHelpers";
const initialState = {
  isAuthenticated: false,
  listUser : []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS: {
      toastSuccess("Đăng nhập thành công");
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case Types.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    case Types.SIGN_UP: {
      return {
        ...state
      };
    }
    case Types.SIGN_UP_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Đăng ký thành công");
      return {
        ...state,
        listUser: state.listUser.concat([data])
      };
    }
    case Types.SIGN_UP_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default reducer;
