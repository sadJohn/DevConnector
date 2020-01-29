import { combineReducers } from "redux";
import alert from "./alert";
import register from "./auth";

export const rootReducer = combineReducers({ alert, register });

export type RootState = ReturnType<typeof rootReducer>;
