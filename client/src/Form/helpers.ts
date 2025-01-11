import { MetricEnum, MetricsArray } from "../types";

export function renderSelectLabel(
  selected: Array<MetricEnum>,
  metricsArray: MetricsArray
) {
  return selected
    .map((item) => metricsArray.find((metric) => metric.value === item)?.label)
    .join(", ");
}

export function isUrlValid(url: string): boolean {
  const regex = /^(https:\/\/)[\w.-]+(\.[a-z]{2,})+(\/[\w.-]*)*\/?$/i;
  return regex.test(url);
}
