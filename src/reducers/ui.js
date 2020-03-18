import * as Types from "./../constants/index";
const initialState = {
  showSidebar: true,
  showLoading: false,
  showModal: false,
  component: null,
  title: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SHOW_SIDEBAR: {
      return {
        ...state,
        showSidebar: true
      };
    }
    case Types.HIDE_SIDEBAR: {
      return {
        ...state,
        showSidebar: false
      };
    }
    case Types.SHOW_LOADING: {
      return {
        ...state,
        showLoading: true
      };
    }
    case Types.HIDE_LOADING: {
      return {
        ...state,
        showLoading: false
      };
    }

    case Types.SHOW_MODAL: {
      return {
        ...state,
        showModal: true
      };
    }
    case Types.HIDE_MODAL: {
      return {
        ...state,
        showModal: false
      };
    }

    case Types.CHANGE_MODAL_TITLE: {
      const { title } = action.payload;
      return {
        ...state,
        title
      };
    }
    case Types.CHANGE_MODAL_CONTENT: {
      const { component } = action.payload;
      return {
        ...state,
        component
      };
    }
    default:
      return state;
  }
};

export default reducer;
