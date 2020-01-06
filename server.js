let express = require("express");
let exphbs = require("express-handlebars");
let db = require("./models");
let routes = require("./controllers/burgerController");

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(routes);

let PORT = process.env.PORT || 8080;
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("Web server listening on PORT " + PORT);
    });
});
