const express = require("express");
const { getCruxData } = require("../controllers/cruxController");

const router = express.Router();

router.post("/crux", getCruxData);

module.exports = router;
