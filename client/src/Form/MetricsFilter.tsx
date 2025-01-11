import { FC } from "react";
import { MetricEnum, MetricsArray } from "../types";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { renderSelectLabel } from "./helpers";

import "./style.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type MetricsFilterProps = {
  selectedMetrics: Array<MetricEnum>;
  metrics: MetricsArray;
  isDisabled: boolean;
  setSelectedMetrics: (metrics: Array<MetricEnum>) => void;
};

const MetricsFilter: FC<MetricsFilterProps> = ({
  selectedMetrics,
  metrics,
  isDisabled,
  setSelectedMetrics,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedMetrics>) => {
    const {
      target: { value },
    } = event;

    setSelectedMetrics(
      typeof value === "string"
        ? value.split(",").map((v) => MetricEnum[v as keyof typeof MetricEnum])
        : value
    );
  };

  return (
    <div className="filter">
      <FormControl className="formControl" size="small">
        <InputLabel id="metric-label">Metrics</InputLabel>
        <Select
          labelId="metric-label"
          id="checkbox-metric"
          multiple
          value={selectedMetrics}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => renderSelectLabel(selected, metrics)}
          MenuProps={MenuProps}
          disabled={isDisabled}
          className="input"
        >
          {metrics.map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              <Checkbox checked={selectedMetrics.indexOf(value) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MetricsFilter;
