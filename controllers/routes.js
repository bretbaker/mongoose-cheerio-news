var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

var db = require("../models");

router.get("/scrape", function(req, res) {
  
  db.Article.remove({}, function (err) {
    if (err) throw err;
    console.log("DB cleared!");
  });
  
  axios.get("https://www.theonion.com/").then(function(response) {
    
    var $ = cheerio.load(response.data);

    for (let i = 0; i < 10; i++) {
      
      db.Article.create({ 
        title: $("main article a h1")[i].children[0].data, 
        link: $("main article a h1")[i].parent.attribs.href, 
        summary: "The title says it all..."
      }, function (err, dbArticle) {
        if (err) throw err;
        console.log(dbArticle);
      });

    }

  });

  res.send("Scrape Complete!");

});

router.get("/api/articles", function (req, res) {

  db.Article.find({})
    .then(function (dbArticles) {
      res.json(dbArticles);
    })
    .catch(function (err) {
      res.json(err);
    });

});

router.get("/home", function (req, res) {

  axios.get("http://localhost:8080/api/articles").then(function(response) {
    // console.log(response);
    let dbArticles = response.data;
    // res.json(response.data);
    console.log(dbArticles);
    // res.json(dbArticles);
    res.render("index", { dbArticles });
  }).catch(function(err) {
    res.send(err);
  });

});

router.get("/clear", function (req, res) {

  db.Article.remove({}, function (err) {
    if (err) throw err;
    res.send("Articles Cleared!");
  });

});


module.exports = router;