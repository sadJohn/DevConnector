import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AppThunk,
  User,
  AlertState,
  AppDispatch
} from "./constants";
import { setAlert } from "./alert";

export const register = ({
  name,
  email,
  password
}: User): AppThunk<User> | AppThunk<AlertState> => async (
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
    console.log("before");
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
