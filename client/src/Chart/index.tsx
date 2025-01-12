import { BarChart } from "@mui/x-charts";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { FC } from "react";
import { DeviceMetric } from "../types";
import { generateMetrics, generateYAxisLabel } from "./utils";

type ChartProps = {
  metricDetails: DeviceMetric;
};

const Chart: FC<ChartProps> = ({ metricDetails }) => {
  const { metricName } = metricDetails;

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <Card variant="outlined" style={{ textAlign: "center", padding: "5px" }}>
        <CardHeader title={metricName} />

        <BarChart
          series={[
            {
              label: "Good",
              data: generateMetrics(metricDetails, "good"),
              stack: "total",
              valueFormatter: (value) => `${value}%`,
            },
            {
              label: "Needs Improvement",
              data: generateMetrics(metricDetails, "improvement"),
              stack: "total",
              valueFormatter: (value) => `${value}%`,
            },
            {
              label: "Poor",
              data: generateMetrics(metricDetails, "poor"),
              stack: "total",
              valueFormatter: (value) => `${value}%`,
            },
          ]}
          xAxis={[
            {
              scaleType: "linear",
              min: 0,
              max: 100,
              tickInterval: [0, 20, 40, 60, 80, 100],
              valueFormatter(value) {
                return `${value}%`;
              },
            },
          ]}
          yAxis={[
            {
              scaleType: "band",
              data: generateYAxisLabel(metricDetails),
              labelStyle: { transform: "rotate(0deg)" },
            },
          ]}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: -5,
              itemMarkWidth: 15,
              itemMarkHeight: 15,
              markGap: 5,
              itemGap: 15,
            },
            bar: {
              radius: 0,
            },
          }}
          colors={["#4CAF50", "#FFC107", "#F44336"]}
          layout="horizontal"
          barLabel={({ value }) => `${value}%`}
          margin={{ left: 60 }}
          height={270}
        />
      </Card>
    </Grid>
  );
};

export default Chart;
