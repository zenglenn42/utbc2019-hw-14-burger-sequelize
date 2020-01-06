let express = require("express");
let router = express.Router();
let db = require("../models/");

router.get("/", function(req, res) {
  res.redirect("/burgers");
});

// get route, edited to match sequelize
router.get("/burgers", function(req, res) {
  // replace old function with sequelize function
    let condition = "devoured = false";
    let renderObj = {};
    db.Burger.findAll({
        where: {
            devoured: false
        }
    })
    .then (result => {
        if (result.length > 0) {
            renderObj.toDevour = result;
        }
        db.Burger.findAll({
            where: {
                devoured: true
            }
        })
        .then (result => {
            if (result.length > 0) {
                renderObj.devoured = result;
            }
            console.log("rendering: ", renderObj);
            res.render("index", renderObj);
        })
    });
});

router.post("/api/burger", (req, res) => {
    db.Burger.create({burger: req.body.burger})
    .then(results => {
        console.log("results from creating burger:", results);
        res.redirect("/");
    });
});

router.put("/api/burger/devour/:id", (req, res) => {
    db.Burger.update(
        {devoured: true},
        {where: {
            id: req.params.id
        }}
    ).then (result => {
        res.json("/");
    });
});

module.exports = router;
