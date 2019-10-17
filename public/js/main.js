// UH-OH DISPLAY TOGGLE
let clear = true;
const dispToggle = () => {
  if (clear === true) {
    document.getElementById("if-no-arts").style = "display: block";
  } else if (clear === false) {
    document.getElementById("if-no-arts").style = "display: none";
  }
}
window.onload = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.response);
      if (xhttp.response == "[]") {
        clear = true;
      } else {
        clear = false;
      }
      dispToggle();
    }
  };
  xhttp.open("GET", "/api/articles", true);
  xhttp.send();
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

