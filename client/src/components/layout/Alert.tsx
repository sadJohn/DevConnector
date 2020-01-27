import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redusers";
import { setAlert } from "../../actions/alert";

export interface AlertBarProps {}

const AlertBar: React.FC<AlertBarProps> = React.memo(() => {
  const { open, msg, severity } = useSelector(
    (store: RootState) => store.alert
  );
  const dispatch = useDispatch();
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => dispatch(setAlert({ open: false, msg, severity }))}
      onExited={() => dispatch(setAlert({ open: false, msg: "" }))}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} elevation={6} variant="filled">
        {msg}
      </Alert>
    </Snackbar>
  );
});

export default AlertBar;
