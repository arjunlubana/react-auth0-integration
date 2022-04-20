import { useContext } from "react";
import { SnackbarContext } from "context/SnackbarContext";

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
