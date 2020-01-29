import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AppThunk,
  AlertState,
  AppDispatch,
  USER_LOADED,
  AUTH_ERROR,
  UserProfile,
  UserAuth
} from "./constants";
import { setAlert } from "./alert";
import setAuthToken from "../util/setAuthToken";

export const loadUser = (): AppThunk<UserProfile> => async dispatch => {
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({
  name,
  email,
  password
}: UserAuth): AppThunk<UserProfile> | AppThunk<AlertState> => async (
  dispatch: AppDispatch<AlertState>
) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(
      setAlert({
        open: true,
        msg: "Registor success! ",
        severity: "success"
      })
    );
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
    dispatch(
      setAlert({
        open: true,
        msg: err.response.data,
        severity: "error"
      })
    );
  }
};
