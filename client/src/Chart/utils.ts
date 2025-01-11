import { DeviceMetric, MetricProperties } from "../types";

export function generateYAxisLabel(metricDetails: DeviceMetric) {
  const { phone, desktop } = metricDetails;

  const yAxisLabel = [];

  if (desktop) {
    yAxisLabel.push("Desktop");
  }
  if (phone) {
    yAxisLabel.push("Phone");
  }

  return yAxisLabel;
}

export function generateMetrics(
  metricDetails: DeviceMetric,
  metricName: keyof MetricProperties
) {
  const { phone, desktop } = metricDetails;

  const metrics = [];

  if (desktop) {
    metrics.push(desktop.values[metricName]);
  }
  if (phone) {
    metrics.push(phone.values[metricName]);
  }

  return metrics;
}
