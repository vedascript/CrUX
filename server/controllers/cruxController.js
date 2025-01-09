const { fetchCruxData } = require("../utils/apiHelper");

async function getCruxData(req, res, next) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const data = await fetchCruxData(url);
    const result = await res.json(data);
    console.log({ result });
  } catch (error) {
    logger.error(`Error fetching CrUX data: ${error.message}`);
    next(error);
  }
}

module.exports = { getCruxData };
