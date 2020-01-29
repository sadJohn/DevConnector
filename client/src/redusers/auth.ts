import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RegisterState,
  RegisterAction
} from "../actions/constants";

const registerState: RegisterState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null
};

const registerReducer = (state = registerState, action: RegisterAction) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token as string);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};

export default registerReducer;
