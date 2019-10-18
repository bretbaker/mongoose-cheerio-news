var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

var db = require("../models");

// SCRAPE ROUTE
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
        summary: "The title says it all...",
        saved: false
      }, function (err, dbArticle) {
        if (err) throw err;
        console.log(dbArticle);
      });

    }

  });

  res.send("Scrape Complete!");

});

// API ARTICLES ROUTE
router.get("/api/articles", function (req, res) {

  db.Article.find({})
    .then(function (dbArticles) {
      res.json(dbArticles);
    })
    .catch(function (err) {
      res.json(err);
    });

});

// HOME PAGE ROUTE
router.get("/home", function (req, res) {

  // if using localhost, url = http://localhost:8080/api/articles
  // if deployed, url = ...
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

// SAVED ARTICLES PAGE ROUTE
router.get("/saved", function (req, res) {

  // if using localhost, url = http://localhost:8080/api/articles
  // if deployed, url = ...
  axios.get("http://localhost:8080/api/articles").then(function (response) {
    // console.log(response);
    let dbArticles = response.data;
    // res.json(response.data);
    console.log(dbArticles);
    // res.json(dbArticles);
    res.render("saved", { dbArticles });
  }).catch(function (err) {
    res.send(err);
  });

});

// CLEAR ARTICLES ROUTE
router.get("/clear", function (req, res) {

  db.Article.remove({}, function (err) {
    if (err) throw err;
    res.send("Articles Cleared!");
  });

});


module.exports = router;