const { fetchCruxData } = require("../utils/apiHelper");

async function getCruxData(req, res, next) {
  const { urls, metrics } = req.body;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: "A list of URLs is required" });
  }

  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        const phoneData = await fetchCruxData(url, metrics, "PHONE");
        const desktopData = await fetchCruxData(url, metrics, "DESKTOP");
        return { url, phone: phoneData, desktop: desktopData };
      })
    );

    return res.json(results);
  } catch (error) {
    next(error);
  }
}

module.exports = { getCruxData };
