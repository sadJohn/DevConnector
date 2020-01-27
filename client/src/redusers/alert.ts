import { SET_ALERT, AlertState, AlertAction } from "../actions/constants";

const alertState: AlertState = { open: false, msg: "", severity: "info" };

const alertReducer = (state = alertState, action: AlertAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return { ...payload };
    default:
      return state;
  }
};

export default alertReducer;
