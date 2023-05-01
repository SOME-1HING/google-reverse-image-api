const express = require("express");
const { json } = require("express");
const { ErrorResponseObject } = require("./common/http");
const routes = require("./routes");

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(json());
app.use("/", routes);

app.all("*", (req, res) =>
  res.status(404).json(new ErrorResponseObject("route not defined"))
);

module.exports = app;
