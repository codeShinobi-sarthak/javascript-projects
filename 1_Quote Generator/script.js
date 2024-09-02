const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-button");
const newQuotebtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQoute() {
  removeLoadingSpinner();
  // picking random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
  quoteText.textContent = quote.text;
  // check author is null or not
  if (!quote.author) {
    //(quote.author == null) is equavalent to (!quote.author)
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQoute();
  } catch (error) {
    alert("there is some error");
    // carch error here
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuotebtn.addEventListener('click', newQoute);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();