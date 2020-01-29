import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const SET_ALERT = "SET_ALERT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";

export type AppThunk<T, ReturnType = void> = ThunkAction<
  ReturnType,
  T,
  null,
  Action<string>
>;
export type AppDispatch<T> = ThunkDispatch<T, null, Action<string>>;

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

export interface User {
  name: string;
  email: string;
}
export interface UserAuth extends User {
  password: string;
}
export interface UserProfile extends User {
  avatar: string;
}
export interface RegisterState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: UserProfile | null;
}
export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: RegisterState;
}
export interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
}
export interface UserLoadedAction {
  type: typeof USER_LOADED;
  payload: UserProfile;
}
export interface AuthErrorAction {
  type: typeof AUTH_ERROR;
}
export type RegisterAction =
  | RegisterSuccessAction
  | RegisterFailAction
  | UserLoadedAction
  | AuthErrorAction;
