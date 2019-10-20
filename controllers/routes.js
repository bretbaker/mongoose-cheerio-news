// ==============================================================================================
// ! ! ! ! ! ! I M P O R T A N T ! ! ! ! ! ! !
// IF ON LOCAL HOST USE URL: http://localhost:8080/
// IF DEPLOYED USE URL: https://mongoose-cheerio-news.herokuapp.com/

var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

const app = express();
var router = express.Router();

var db = require("../models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

  db.Article.find({ saved: false })
    .then(function (dbArticles) {
      res.json(dbArticles);
    })
    .catch(function (err) {
      res.json(err);
    });

});

// API SAVED ARTICLES ROUTE
router.get("/api/savedarticles", function (req, res) {

  db.Article.find({ saved: true })
    .then(function (dbArticles) {
      res.json(dbArticles);
    })
    .catch(function (err) {
      res.json(err);
    });

});

// HOME PAGE ROUTE
router.get("/", function (req, res) {

  // if using localhost, url = http://localhost:8080/api/articles
  // if deployed, url = https://mongoose-cheerio-news.herokuapp.com/
  axios.get("https://mongoose-cheerio-news.herokuapp.com/api/articles").then(function(response) {
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

// ROUTE FOR UPDATING DB WHEN ARTICLE IS SAVED
router.get("/api/saved/:title", function (req, res) {

  db.Article.findOneAndUpdate({ 
    title: req.params.title,
   },{
     saved: true
   })
    .then(function (dbArticle) {
      console.log(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });

});

// ROUTE FOR UPDATING DB WHEN ARTICLE IS UNSAVED
router.get("/api/unsaved/:title", function (req, res) {

  db.Article.findOneAndUpdate({
    title: req.params.title,
  }, {
    saved: false
  })
    .then(function (dbArticle) {
      console.log(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });

});


// SAVED ARTICLES PAGE ROUTE
router.get("/saved", function (req, res) {

  // if using localhost, url = http://localhost:8080/api/articles
  // if deployed, url = https://mongoose-cheerio-news.herokuapp.com/
  axios.get("https://mongoose-cheerio-news.herokuapp.com/api/savedarticles").then(function (response) {
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