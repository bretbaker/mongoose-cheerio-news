// UH-OH DISPLAY TOGGLE
let startClear = true;
let saveClear = true;
let articleTitle;
const dispToggle = () => {
  if (startClear === true && window.location.href === "http://localhost:8080/home") {
    document.getElementById("if-no-arts").style = "display: block";
    document.getElementById("footer").style = "position: absolute";
  } else if (startClear === false && window.location.href === "http://localhost:8080/home") {
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
        console.log(articleTitle);
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
  } else if (saveClear === true && window.location.href === "http://localhost:8080/saved") {
    document.getElementById("if-no-arts").style = "display: block";
    document.getElementById("footer").style = "position: absolute";
  } else if (saveClear === false && window.location.href === "http://localhost:8080/saved") {
    document.getElementById("if-no-arts").style = "display: none";
    document.getElementById("footer").style = "position: relative";
  }
  
}
window.onload = () => {
  if (window.location.href === "http://localhost:8080/home") {
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
  } else if (window.location.href === "http://localhost:8080/saved") {
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
