import * as Types from "./../constants/index";
// export const loginSuccess = () => ({
//   type: Types.LOGIN_SUCCESS
// });
export const signOutSuccess = () => ({
  type: Types.SIGN_OUT_SUCCESS
});

export const loginSuccess = (user) => ({
  type: Types.LOGIN_SUCCESS,
  payload : {
    user
  }
});

export const signUp = (user) => ({
  type: Types.SIGN_UP,
  payload: {
    user
  }
});
export const signUpSuccess = data => ({
  type: Types.SIGN_UP_SUCCESS,
  payload: {
    data
  }
});
export const signUpFailed = error => ({
  type: Types.SIGN_UP_FAILED,
  payload: {
    error
  }
});
