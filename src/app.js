const express = require("express");
const { json } = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

let userTokens;
getAllTokens().then((tokens) => (userTokens = new Set(tokens)));

function refreshToken() {
  getAllTokens().then((tokens) => (userTokens = new Set(tokens)));
}
setInterval(refreshToken, 10000);

function validateToken(req, res, next) {
  const { token } = req.query;

  if (!token) {
    return res.status(404).send("Token not found.");
  }

  const isValid = userTokens.has(token);

  if (!isValid) {
    return res.status(402).send("Invalid token.");
  }

  next();
}

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(json());
app.use("/api", require("./routes/api"));
app.use("/ask", validateToken, require("./routes/ask"));
app.use("/image", validateToken, require("./routes/image"));
app.use("/news", validateToken, require("./routes/news"));
app.use("/search", validateToken, require("./routes/search"));
app.use("/videos", validateToken, require("./routes/videos"));
app.use("/wiki", validateToken, require("./routes/wikipedia"));
app.use("/chat", validateToken, require("./routes/chat"));

app.listen(PORT, () =>
  console.log(`server running in http://localhost:${PORT}`)
);
