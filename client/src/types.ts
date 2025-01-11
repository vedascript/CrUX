export type CruxResponse = {
  url: string;
  phone: CruxDetails;
  desktop: CruxDetails;
};

type CruxDetails = {
  record: Metrics;
};

export type MetricDetails = {
  histogram: Array<MetricValue>;
};

type MetricValue = {
  start: number | string;
  end?: number | string;
  density: number;
};

export enum MetricEnum {
  CLS = "cumulative_layout_shift",
  INP = "interaction_to_next_paint",
  FCP = "first_contentful_paint",
  LCP = "largest_contentful_paint",
  TTFB = "experimental_time_to_first_byte",
}

type Metrics = {
  metrics: Record<MetricEnum, MetricDetails>;
};

export type TMetricDetail = {
  values: MetricProperties;
};

export type MetricProperties = {
  good: number;
  improvement: number;
  poor: number;
};

export type TCruxData = {
  [k in MetricEnum | "url"]: DeviceMetric | string;
};

export type DeviceMetric = {
  metricName: string;
  phone?: TMetricDetail;
  desktop?: TMetricDetail;
};

export type MetricsArray = Array<{ label: string; value: MetricEnum }>;

export type Payload = {
  urls: Array<string>;
  metrics: Array<MetricEnum>;
};
