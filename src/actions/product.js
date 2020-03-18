import * as Types from "./../constants/product";

export const fetchAllProduct = (params = {}) => {
  return {
    type: Types.FETCH_ALL_PRODUCT,
    payload: {
      params
    }
  };
};
export const fetchAllProductSuccess = data => {
  return {
    type: Types.FETCH_ALL_PRODUCT_SUCCESS,
    payload: {
      data
    }
  };
};
export const fetchAllProductFailed = error => {
  return {
    type: Types.FETCH_ALL_PRODUCT_FAILED,
    payload: {
      error
    }
  };
};

export const filterProduct = keyword => {
  return {
    type: Types.FILTER_PRODUCT,
    payload: {
      keyword
    }
  };
};

export const filterProductSuccess = data => {
  return {
    type: Types.FILTER_PRODUCT_SUCCESS,
    payload: {
      data
    }
  };
};




export const addProduct = product => ({
  type: Types.ADD_PRODUCT,
  payload: {
    product
  }
});
export const addProductSuccess = data => ({
  type: Types.ADD_PRODUCT_SUCCESS,
  payload: {
    data
  }
});
export const addProductFailed = error => ({
  type: Types.ADD_PRODUCT_FAILED,
  payload: {
    error
  }
});


export const deleteProduct = id => ({
  type: Types.DELETE_PRODUCT,
  payload: {
    id
  }
});
export const deleteProductSuccess = data => ({
  type: Types.DELETE_PRODUCT_SUCCESS,
  payload: {
    data
  }
});
export const deleteProductFailed = error => ({
  type: Types.DELETE_PRODUCT_FAILED,
  payload: {
    error
  }
});


export const setProductEditing = product => ({
  type: Types.SET_PRODUCT_EDITING,
  payload: {
    product
  }
});
export const updateProduct = product => ({
  type: Types.UPDATE_PRODUCT,
  payload: {
    product
  }
});
export const updateProductSuccess = data => ({
  type: Types.UPDATE_PRODUCT_SUCCESS,
  payload: {
    data
  }
});
export const updateProductFailed = error => ({
  type: Types.UPDATE_PRODUCT_FAILED,
  payload: {
    error
  }
});



export const sortProduct = value => {
  return {
    type: Types.SORT_PRODUCT,
    payload: {
      value
    }
  };
};

export const sortProductSuccess = data => {
  return {
    type: Types.SORT_PRODUCT_SUCCESS,
    payload: {
      data
    }
  };
};