import { Button, CircularProgress, TextField } from "@mui/material";

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
  handleSearch: (urls: Array<string>, inputUrl: string) => void;
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
    if (!urls.length) {
      addUrl([inputUrl, ""]);
    } else {
      addUrl((prevUrls) => [...prevUrls, inputUrl]);
    }
    setInputUrl("");
  }

  function onSearch(urls: Array<string>, inputUrl: string) {
    handleSearch(urls, inputUrl);
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
          variant="outlined"
          style={{ marginLeft: "auto", paddingBlock: "6px" }}
          startIcon={<AddIcon />}
          disabled={isLoading || !inputUrl.trim() || !isValidUrl}
          onClick={addUrlInput}
        >
          Add URL
        </Button>
      </div>

      <UrlList urls={urls} />

      <div className="addUrlContainer">
        <TextField
          label="Enter URL"
          variant="outlined"
          value={inputUrl}
          className="input"
          disabled={isLoading}
          error={!isValidUrl}
          size="small"
          onChange={(e) => handleUrlChange(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => onSearch(urls, inputUrl)}
          disabled={
            isLoading || !isValidUrl || !urls.some((url) => !!url.trim())
          }
        >
          {isLoading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </div>
    </div>
  );
};

export default Form;
