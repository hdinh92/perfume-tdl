import axiosService from "./../commons/axiosService";
import { API_ENDPOINT } from "./../constants/index";
import qs from "query-string";
const url = "orders";

export const getListOrder = (params = {}) => {
  let queryParams = "";
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`);
};

export const getOrder = orderID => {
  return axiosService.get(`${API_ENDPOINT}/${url}/${orderID}`);
};

// export const addProduct = product =>{
//   return axiosService.post(`${API_ENDPOINT}/${url}`, product);
// }

export const deleteOrder = orderID => {
  return axiosService.delete(`${API_ENDPOINT}/${url}/${orderID}`);
};

export const updateOrderStatus = (data, orderID) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${orderID}`, data);
};
// export const updateProduct = (product, productID) =>{
//   return axiosService.put(`${API_ENDPOINT}/${url}/${productID}`,product)
// }
