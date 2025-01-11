import { Button, TextField } from "@mui/material";

import { Dispatch, FC, SetStateAction, useState } from "react";
import MetricsFilter from "./MetricsFilter";
import { MetricEnum } from "../types";
import AddIcon from "../assets/AddIcon";
import { isUrlValid } from "./helpers";
import UrlList from "./UrlList";

import "./style.css";

type FormProps = {
  isLoading: boolean;
  selectedMetrics: Array<MetricEnum>;
  metricsArray: {
    label: string;
    value: MetricEnum;
  }[];
  urls: Array<string>;
  setSelectedMetrics: (metrics: Array<MetricEnum>) => void;
  handleSearch: (urls: Array<string>) => void;
  addUrl: Dispatch<SetStateAction<Array<string>>>;
};

const Form: FC<FormProps> = ({
  isLoading,
  selectedMetrics,
  metricsArray,
  urls,
  setSelectedMetrics,
  handleSearch,
  addUrl,
}) => {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);

  function handleUrlChange(value: string) {
    setInputUrl(value);

    const isValid = isUrlValid(value);
    setIsValidUrl(isValid);
  }

  function addUrlInput() {
    addUrl((prevUrls) => [...prevUrls, inputUrl]);
    setInputUrl("");
  }

  return (
    <div className="formContainer">
      <div className="filterContainer">
        <MetricsFilter
          selectedMetrics={selectedMetrics}
          metrics={metricsArray}
          isDisabled={isLoading}
          setSelectedMetrics={setSelectedMetrics}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto", paddingBlock: "6px" }}
          onClick={() => handleSearch(urls)}
          disabled={isLoading || !urls.length}
        >
          Search
        </Button>
      </div>

      <UrlList urls={urls} />

      <div className="addUrlContainer">
        <TextField
          label="Enter URL"
          variant="outlined"
          className="input"
          size="small"
          value={inputUrl}
          disabled={isLoading}
          error={!isValidUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
        />

        <Button
          variant="outlined"
          style={{ marginLeft: "auto" }}
          size="small"
          startIcon={<AddIcon />}
          disabled={isLoading || !inputUrl.trim() || !isValidUrl}
          onClick={addUrlInput}
        >
          Add URL
        </Button>
      </div>
    </div>
  );
};

export default Form;
