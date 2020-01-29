import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RegisterState,
  RegisterAction,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/constants";

const registerState: RegisterState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null
};

const registerReducer = (state = registerState, action: RegisterAction) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token as string);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};

export default registerReducer;
