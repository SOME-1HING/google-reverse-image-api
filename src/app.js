const express = require("express");
const { json } = require("express");
const { ErrorResponseObject } = require("./common/http");
const routes = require("./routes");
const { inject } = require("@vercel/analytics");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
inject();
app.use(json());
app.use("/", routes);

app.all("*", (req, res) =>
  res.status(404).json(new ErrorResponseObject("route not defined"))
);

app.listen(PORT, () =>
  console.log(`server running in http://localhost:${PORT}`)
);
