const axios = require("axios");
const { baseUrl } = require("../config");

async function fetchCruxData(url) {
  try {
    const response = await axios.post(
      baseUrl,
      { url },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: { key: process.env.API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch CrUX data: ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }
}

module.exports = { fetchCruxData };
