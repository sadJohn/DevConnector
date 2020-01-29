import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer, RootState } from "./redusers";

const initialStore: RootState = {
  alert: { open: false, msg: "", severity: "info" },
  register: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
