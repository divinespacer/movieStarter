// Add DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const filterMovie = document.querySelector("#filter");
const myMovieList = document.querySelector("ul");
const addMovieButton = document.querySelector("#addMovieButton");
const movieHistory = document.querySelector("#movieHistory");
let myMovies = {};
let movieList = [];

function pressEnter(event) {
  if (event.key === "Enter") {
    addMovie(); // Call the same function as for click
  }
}

function createTable() {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");

  table.appendChild(tbody);
  table.appendChild(thead);
  movieHistory.appendChild(table);

  headerRow.innerHTML = "<th>Titles</th><th>Watched</th>";
  thead.appendChild(headerRow);
}
// Example of a simple function that clears the input after a user types something in
function clearInput() {
  inp.value = "";
}

function clearMovies() {
  // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
  myMovieList.innerHTML = "";
  movieList = [];
}

function createMovieList(list) {
  const movieString = list.map((titles) => `<li>${titles}</li>`).join("");
  myMovieList.innerHTML = movieString;
}
function createMovieHist() {
  const movieDbString = Object.entries(myMovies)
    .map(([key, value]) => {
      return `<tr><td>${key}</td><td>${value}</dt></tr>`;
    })
    .join("");
  movieDb.innerHTML = movieDbString;
}
function loweredMovieList() {
  const loweredList = movieList.map((title) => {
    return title.toLowerCase();
  });
  return loweredList;
}
// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
  // Step 1: Get value of input and alert if empty
  const userTypedText = inp.value;
  if (userTypedText === "") {
    alert("Please enter a movie name");
    return;
  }

  //creates lowered titles for movie db
  const loweredTitles = Object.keys(myMovies).map((keys) => {
    return keys.toLowerCase();
  });
  //creates lower titles for movielist
  loweredList = loweredMovieList();

  //checks if movie is already in db, increment, else creates new entry
  if (loweredTitles.includes(userTypedText.toLowerCase())) {
    for (const entry of Object.keys(myMovies)) {
      if (entry.toLowerCase() === userTypedText.toLowerCase()) {
        myMovies[entry]++;

        //checks if entry already in movielist
        if (!loweredList.includes(entry.toLowerCase())) {
          movieList.push(entry);
          createMovieList(movieList);
        }
      }
    }
  } else if (myMovies[userTypedText] === undefined) {
    myMovies[userTypedText] = 1;
    movieList.push(userTypedText);
    createMovieList(movieList);
  }

  //creates movie history table entries
  createMovieHist();
  //adds to localStorage
  localStorage.setItem("movieDb", JSON.stringify(myMovies));
  // Step 6: Call the clearInput function to clear the input field
  clearInput();
}

function filterMovies() {
  const userTypedText = filterMovie.value;
  filteredList = [];
  loweredList = loweredMovieList();
  if (userTypedText === "") {
    createMovieList(movieList);
  } else {
    movieList.forEach((movie) => {
      if (movie.toLowerCase().includes(userTypedText.toLowerCase())) {
        filteredList.push(movie);
      }
    });
    createMovieList(filteredList);
  }
}

createTable();
const movieDb = document.querySelector("#movieHistory table tbody");
movieLocal = JSON.parse(localStorage.getItem("movieDb"));
if (movieLocal !== null) {
  myMovies = movieLocal;
  createMovieHist();
}

addMovieButton.addEventListener("click", addMovie);
inp.addEventListener("keypress", pressEnter);
filterMovie.addEventListener("input", filterMovies);
