import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { CruxResponse, MetricEnum, Payload } from "../types";

async function fetchCruxDetails(
  urls: Array<string>,
  metrics: MetricEnum[]
): Promise<Array<CruxResponse>> {
  try {
    const response = await axios.post(
      "https://crux-server-sygo.onrender.com/api/crux",
      {
        urls,
        metrics,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching CrUX data:", error);
    return null as unknown as CruxResponse[];
  }
}

function useFetchCruxDetails() {
  return useMutation({
    mutationFn: (payload: Payload) =>
      fetchCruxDetails(payload.urls, payload.metrics),
  });
}

export default useFetchCruxDetails;
