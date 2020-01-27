import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export const SET_ALERT = "SET_ALERT";

export type AppThunk<T, ReturnType = void> = ThunkAction<
  ReturnType,
  T,
  null,
  Action<string>
>;

export interface AlertState {
  open: boolean;
  msg: string;
  severity?: "info" | "success" | "error";
}
export interface SetAlertAction {
  type: typeof SET_ALERT;
  payload: AlertState;
}
export type AlertAction = SetAlertAction;
