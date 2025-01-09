require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cruxRoutes = require("./routes/cruxRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", cruxRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;
