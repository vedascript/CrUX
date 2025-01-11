import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";

type SpinnerProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

const Spinner: FC<SpinnerProps> = ({ isLoading, children }) => {
  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
        title="Loading"
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </>
  );
};

export default Spinner;
