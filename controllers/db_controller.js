var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
  axios.get("https://www.theonion.com/").then(function(response) {
    
    var $ = cheerio.load(response.data);

    for (let i = 0; i < 10; i++) {
      console.log("THIS IS ARTICLE: " + i)
      // console.log($("main article a")[i].attribs.href);
      console.log($("main article a h1")[i].children[0].data);
      console.log($("main article a h1")[i].parent.attribs.href);
    }
    // console.log($("main article")[0].children[3].children[1].children[1].children[0].attribs.href);
    // console.log($("main article")[0].children[3].children[1].children[1].children[0].children[0].children[0].data);

    // for (let i = 0; i < $.length; i++) {
    //   console.log($("main article")[i].children[3].children[1].children[1].children[0].attribs.href);
    //   console.log($("main article")[i].children[3].children[1].children[1].children[0].children[0].children[0].data);
    // }
  
    // $("article").each(function(i, element) {

    //   var result = {};

    //   result.title = $(this).children("h1").text();
    //   result.link = $(this).children("a").attr("href");

    //   db.Article.create(result).then(function(dbArticle) {
    //     console.log(dbArticle);
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //   });

    // });

    res.send("Scrape Complete");

  });
});

module.exports = router;