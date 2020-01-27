import { SET_ALERT, AlertState, AppThunk } from "./constants";

export const setAlert = ({
  open,
  msg,
  severity = "info"
}: AlertState): AppThunk<AlertState> => dispatch =>
  dispatch({
    type: SET_ALERT,
    payload: { open, msg, severity }
  });
