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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
