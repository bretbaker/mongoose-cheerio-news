// ==============================================================================================
// ! ! ! ! ! ! I M P O R T A N T ! ! ! ! ! ! !
// IF ON LOCAL HOST USE URL: http://localhost:8080/
// IF DEPLOYED USE URL: https://mongoose-cheerio-news.herokuapp.com/

// UH-OH DISPLAY TOGGLE
let startClear = true;
let saveClear = true;
let articleTitle;
const dispToggle = () => {
  if (startClear === true && window.location.href === "https://mongoose-cheerio-news.herokuapp.com/") {
    document.getElementById("if-no-arts").style = "display: block";
    document.getElementById("footer").style = "position: absolute";
  } else if (startClear === false && window.location.href === "https://mongoose-cheerio-news.herokuapp.com/") {
    document.getElementById("if-no-arts").style = "display: none";
    document.getElementById("footer").style = "position: relative";
    let articleTitles = document.getElementsByClassName("article-titles");
    for (let i = 0; i < articleTitles.length; i++) {
      articleTitles[i].setAttribute('value', i);
    };
    let saveArtBtns = document.getElementsByClassName("save-art-btn");
    for (let i = 0; i < saveArtBtns.length; i++) {
      saveArtBtns[i].setAttribute('value', i);
      saveArtBtns[i].addEventListener('click', () => {
        articleTitle = articleTitles[i].innerHTML;
        alert("Article saved! Refresh the page!");
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(articleTitle);
          }
        };
        xhttp.open("GET", "/api/saved/" + articleTitle, true);
        xhttp.send();
      }, false);
    };
  } else if (saveClear === true && window.location.href === "https://mongoose-cheerio-news.herokuapp.com/saved") {
    document.getElementById("if-no-arts").style = "display: block";
    document.getElementById("footer").style = "position: absolute";
  } else if (saveClear === false && window.location.href === "https://mongoose-cheerio-news.herokuapp.com/saved") {
    document.getElementById("if-no-arts").style = "display: none";
    document.getElementById("footer").style = "position: relative";
    let articleTitles = document.getElementsByClassName("article-titles");
    for (let i = 0; i < articleTitles.length; i++) {
      articleTitles[i].setAttribute('value', i);
    };
    let unsaveArtBtns = document.getElementsByClassName("delete-saved-button");
    for (let i = 0; i < unsaveArtBtns.length; i++) {
      unsaveArtBtns[i].setAttribute('value', i);
      unsaveArtBtns[i].addEventListener('click', () => {
        articleTitle = articleTitles[i].innerHTML;
        alert("Article removed from saved! Refresh the page!");
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(articleTitle);
          }
        };
        xhttp.open("GET", "/api/unsaved/" + articleTitle, true);
        xhttp.send();
      }, false);
    };
    // let noteButtons = document.getElementsByClassName("note-button");
    // for (let i = 0; i < noteButtons.length; i++) {
    //   noteButtons[i].setAttribute('value', i);
    //   noteButtons[i].addEventListener('click', () => {
    //     articleTitle = articleTitles[i].innerHTML;
    //     let xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function () {
    //       if (this.readyState == 4 && this.status == 200) {
    //         console.log(articleTitle);
    //       }
    //     };
    //     xhttp.open("GET", "/api/notes/" + articleTitle, true);
    //     xhttp.send();
    //   }, false);
    // };
  } 
};

// WINDOW ONLOAD FUNCTION
window.onload = () => {
  if (window.location.href === "https://mongoose-cheerio-news.herokuapp.com/") {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.response);
        if (xhttp.response == "[]") {
          startClear = true;
        } else {
          startClear = false;
        }
        dispToggle();
      }
    };
    xhttp.open("GET", "/api/articles", true);
    xhttp.send();
  } else if (window.location.href === "https://mongoose-cheerio-news.herokuapp.com/saved") {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.response);
        if (xhttp.response == "[]") {
          saveClear = true;
        } else {
          saveClear = false;
        }
        dispToggle();
      }
    };
    xhttp.open("GET", "/api/savedarticles", true);
    xhttp.send();
  }
  
}

// SCRAPE FUNCTION
const scrape = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("Scrape success! Refresh the page!");
    }
  };
  xhttp.open("GET", "/scrape", true);
  xhttp.send();
};

// CLEAR FUNCTION
const clearArticles = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("clear!");
    }
  };
  xhttp.open("GET", "/clear", true);
  xhttp.send();
};

// UNSAVE ARTICLE FUNCTION
// const unsave = () => {
  
// }

// HTTP REQUEST TO SCRAPE NEW ARTICLES ONCLICK SCRAPE BUTTON
document.getElementById("scrape-btn").onclick = () => {
  scrape();
  dispToggle();
};

// HTTP REQUEST TO SCRAPE NEW ARTICLES ONCLICK SCRAPE LINK
document.getElementById("scrape-link").onclick = () => {
  scrape();
  dispToggle();
};


// HTTP REQUEST TO CLEAR ARTICLES ONLCICK CLEAR BUTTON
document.getElementById("clear-articles").onclick = () => {
  clearArticles();
  dispToggle();
};
