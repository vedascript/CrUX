import { TextField } from "@mui/material";
import { FC } from "react";

import "./style.css";

type UrlListProps = {
  urls: Array<string>;
};

const UrlList: FC<UrlListProps> = ({ urls }) => {
  const urlList = urls.filter((url) => url.trim() !== "");

  return (
    <>
      {urls.length > 1 ? (
        urlList.map((url, ind) => (
          <div className="inputContainer" key={`${url}.${ind}`}>
            <TextField
              key={`${url}.${ind}`}
              variant="outlined"
              value={url}
              className="input"
              size="small"
              disabled={true}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default UrlList;
