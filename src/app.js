const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { ErrorResponseObject } = require("./common/http");
const routes = require("./routes");

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: "1mb" })); // Parse JSON payloads

// Limit each IP to 100 requests per windowMs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: new ErrorResponseObject(
    "Too many requests, please try again later."
  ),
});
app.use(limiter);

// Mount routes
app.use("/", routes);

// Catch-all route for undefined paths
app.all("*", (req, res) =>
  res.status(404).json(new ErrorResponseObject("Route not defined"))
);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  const status = err.status || 500;
  res
    .status(status)
    .json(new ErrorResponseObject(err.message || "Internal Server Error"));
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running in ${ENV} mode on http://localhost:${PORT}`)
);
