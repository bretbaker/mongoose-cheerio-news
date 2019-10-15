const express = require("express");

const PORT = process.env.PORT || 8080;

var app = express();

var routes = require("./controllers/db_controller");

app.use(routes);

app.listen(PORT, function () {
  console.log("Server listening on PORT: " + PORT);
});