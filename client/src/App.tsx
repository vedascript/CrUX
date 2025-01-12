import { FC, useState } from "react";
import { Container } from "@mui/material";
import { ToastContainer, Bounce, toast } from "react-toastify";

import { useFetchCruxDetails } from "./hooks";
import { metricsArray, responseMapper } from "./helpers";
import { MetricEnum, Payload, TCruxData } from "./types";
import Form from "./Form";
import DataGrid from "./DataGrid";
import Chart from "./Chart";
import Spinner from "./Spinner";

import "./App.css";

const App: FC = () => {
  const [urlsToFetch, setUrlsToFetch] = useState<Array<string>>([]);
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
        toast.error("Error fetching CRUX data");
      },
    });
  }

  function handleSearch(urls: Array<string>) {
    const payload: Payload = { urls, metrics: selectedMetrics };
    handleApiRequest(payload);
  }

  function onFilterChange(metrics: Array<MetricEnum>) {
    setSelectedMetrics(metrics);

    const payload: Payload = { urls: urlsToFetch, metrics };
    handleApiRequest(payload);
  }

  function handleResetData() {
    setCruxData([]);
    setUrlsToFetch([]);
    setSelectedMetrics(metricsArray.map((metric) => metric.value));
  }

  return (
    <Container className="container">
      <h1>Chrome UX Report Viewer</h1>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <Form
        isLoading={isLoading}
        selectedMetrics={selectedMetrics}
        metricsArray={metricsArray}
        urls={urlsToFetch}
        setSelectedMetrics={onFilterChange}
        handleSearch={handleSearch}
        addUrl={setUrlsToFetch}
        resetData={handleResetData}
      />

      <Spinner isLoading={isLoading}>
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
      </Spinner>
    </Container>
  );
};

export default App;
