import { useState } from "react";
import { Alert, Container, AlertTitle } from "@mui/material";

import "./App.css";
import { useFetchCruxDetails } from "./hooks";
import Form from "./Form";

import { metricsArray, responseMapper } from "./helpers";
import { MetricEnum, Payload, TCruxData } from "./types";
import DataGrid from "./DataGrid";
import Chart from "./Chart";

const App = () => {
  const [urlsToFetch, setUrlsToFetch] = useState<Array<string>>([]);
  const [isError, setIsError] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<Array<MetricEnum>>(
    () => metricsArray.map((metric) => metric.value)
  );

  const [cruxData, setCruxData] = useState<Array<TCruxData>>([]);

  const { isPending: isLoading, mutate: fetchCruxDetails } =
    useFetchCruxDetails();

  function handleApiRequest(payload: Payload) {
    fetchCruxDetails(payload, {
      onSuccess: (data) => {
        const mappedResponse = responseMapper(data);
        setCruxData(mappedResponse);
      },
      onError: () => {
        setIsError(true);
      },
      onSettled: () => {
        setTimeout(() => {
          setIsError(false);
        }, 3500);
      },
    });
  }

  function handleSearch(urls: Array<string>, inputUrl: string) {
    let urlsToFetch: Array<string> = [];

    if (!urls.length) {
      setUrlsToFetch([inputUrl]);
      urlsToFetch = [inputUrl];
    } else {
      const newUrls = [...urls, inputUrl];
      setUrlsToFetch(newUrls);
      urlsToFetch = newUrls.filter((url) => url.trim() !== "");
    }

    const payload: Payload = { urls: urlsToFetch, metrics: selectedMetrics };
    handleApiRequest(payload);
  }

  function onFilterChange(metrics: Array<MetricEnum>) {
    setSelectedMetrics(metrics);

    const payload: Payload = { urls: urlsToFetch, metrics };
    handleApiRequest(payload);
  }

  return (
    <Container className="container">
      <h1>Chrome UX Report Viewer</h1>

      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to get CrUX details.
        </Alert>
      )}

      <Form
        isLoading={isLoading}
        selectedMetrics={selectedMetrics}
        metricsArray={metricsArray}
        urls={urlsToFetch}
        setSelectedMetrics={onFilterChange}
        handleSearch={handleSearch}
        addUrl={setUrlsToFetch}
      />

      {cruxData?.map((data) => {
        return (
          <DataGrid urlTitle={data.url as string}>
            {Object.entries(data).map(([, metricData]) => {
              return (
                typeof metricData === "object" && (
                  <Chart metricDetails={metricData} />
                )
              );
            })}
          </DataGrid>
        );
      })}
    </Container>
  );
};

export default App;
