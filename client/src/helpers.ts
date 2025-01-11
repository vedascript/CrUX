import {
  CruxResponse,
  DeviceMetric,
  MetricDetails,
  MetricEnum,
  TCruxData,
  TMetricDetail,
} from "./types";

export function mapMetricName(metricName: MetricEnum): string {
  switch (metricName) {
    case MetricEnum.CLS:
      return "Cumulative Layout Shift (CLS)";
    case MetricEnum.INP:
      return "Interaction to Next Paint (INP)";
    case MetricEnum.FCP:
      return "First Contentful Paint (FCP)";
    case MetricEnum.LCP:
      return "Largest Contentful Paint (LCP)";
    case MetricEnum.TTFB:
      return "Time to First Byte (TTFB)";
    default:
      return "";
  }
}

export function getMetricValue(value: number): number {
  return Math.round(value * 100);
}

export function responseMapper(
  response: Array<CruxResponse>
): Array<TCruxData> {
  return response.map((res) => mapResponseToTCruxData(res));
}

export function mapResponseToTCruxData(response: CruxResponse): TCruxData {
  const phoneMetrics = response.phone.record.metrics;
  const desktopMetrics = response.desktop.record.metrics;

  const result: Partial<TCruxData> = {
    url: response.url,
  };

  for (const key in phoneMetrics) {
    const metricName = key as MetricEnum;
    const metricDetails = phoneMetrics[metricName];

    if (!metricDetails?.histogram) {
      continue;
    }

    result[metricName] = {
      phone: mapMetrics(metricDetails),
      metricName: mapMetricName(metricName),
    };
  }

  for (const key in desktopMetrics) {
    const metricName = key as MetricEnum;
    const metricDetails = desktopMetrics[metricName];

    if (!metricDetails?.histogram) {
      continue;
    }

    if (!result[metricName]) {
      result[metricName] = {
        metricName: mapMetricName(metricName),
      };
    }

    (result[metricName] as DeviceMetric).desktop = mapMetrics(metricDetails);
  }

  return result as TCruxData;
}

function mapMetrics(metric: MetricDetails): TMetricDetail {
  const [goodMetric, avgMetric, poorMetric] = metric.histogram;

  return {
    values: {
      good: getMetricValue(goodMetric.density),
      improvement: getMetricValue(avgMetric.density),
      poor: getMetricValue(poorMetric.density),
    },
  };
}

export const metricsArray = [
  {
    label: "CLS",
    value: MetricEnum.CLS,
  },
  {
    label: "INP",
    value: MetricEnum.INP,
  },
  {
    label: "FCP",
    value: MetricEnum.FCP,
  },
  {
    label: "LCP",
    value: MetricEnum.LCP,
  },
  {
    label: "TTFB",
    value: MetricEnum.TTFB,
  },
];
