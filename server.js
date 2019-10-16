const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

// serve statis from public dir
app.use(express.static("public"));

// set handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes
const routes = require("./controllers/routes");
app.use(routes);

app.listen(PORT, function () {
  console.log("Server listening on PORT: " + PORT);
});