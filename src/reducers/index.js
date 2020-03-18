import { combineReducers } from "redux";
import productReducer from "./product";
import uiReducer from "./ui";
import ordersReducer from "./orders";
import authReducer from "./auth";
import { reducer as formReducer } from 'redux-form'
const rootReducer = combineReducers({
  product: productReducer,
  ui: uiReducer,
  form : formReducer,
  orders: ordersReducer,
  auth: authReducer
});

export default rootReducer;
