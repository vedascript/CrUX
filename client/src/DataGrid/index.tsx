import Grid from "@mui/material/Grid2";

import { FC, ReactNode } from "react";

import "./styles.css";

type DataGridProps = {
  urlTitle: string;
  children: ReactNode;
};

const DataGrid: FC<DataGridProps> = ({ urlTitle, children }) => {
  return (
    <div className="cruxContainer">
      <h3>{urlTitle}</h3>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {children}
      </Grid>

      <div className="divider"></div>
    </div>
  );
};

export default DataGrid;
