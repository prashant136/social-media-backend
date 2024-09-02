const express = require("express");
const route = require("./routes/user-routes.js");
require("./connect.js");

const app = express();

app.use(express.json()); // This parses incoming requests with JSON payloads

app.use("/api/user", route);

app.listen(5000);
