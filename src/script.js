const domElements = {
  userListEl: document.querySelector(".user-list"),
  searchInput: document.getElementById("searchInput"),
  searchIcon: document.getElementById("searchIcon"),
  filterSelect: document.getElementById("filter"),
};

let allLoadedMovies = [];
let currentMovies = [];

function addEventListenerToElement(element, type, handler) {
  if (element) {
    element.addEventListener(type, handler);
  }
}

function displayMessage(message) {
  domElements.userListEl.innerHTML = `<p>${message}</p>`;
}

async function fetchMovies(searchTerm) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=2569b6b9&s=${searchTerm}`
    );
    const moviesData = await response.json();
    return moviesData.Response === "True" && moviesData.Search
      ? moviesData.Search
      : [];
  } catch (error) {
    console.error(`Error fetching movies for "${searchTerm}":`, error);
    return [];
  }
}

async function loadRandomMovies() {
  const initialSearches = ["action", "comedy", "drama", "sci-fi"];
  const results = await Promise.all(initialSearches.map(fetchMovies));
  allLoadedMovies = results.flat();
  const uniqueMoviesMap = new Map(
    allLoadedMovies.map((movie) => [movie.imdbID, movie])
  );
  allLoadedMovies = [...uniqueMoviesMap.values()];
  displayRandomSubset();
  populateFilterOptions();
}

function displayRandomSubset() {
  const numberOfMoviesToDisplay = Math.min(8, allLoadedMovies.length);
  const shuffledMovies = [...allLoadedMovies].sort(() => 0.5 - Math.random());
  currentMovies = shuffledMovies.slice(0, numberOfMoviesToDisplay);
  renderMovies(currentMovies);
}

function populateFilterOptions() {
  domElements.filterSelect.innerHTML = '<option value="">Filter By</option>';
  const options = [
    { value: "title", text: "Title" },
    { value: "year", text: "Year" },
  ];
  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    domElements.filterSelect.appendChild(option);
  });
}

function renderMovies(movies) {
  domElements.userListEl.innerHTML = movies.map(userHTML).join("");
}

function userHTML(movie) {
  return `<div class="movie">
                <div class="movie-card">
                    <div class="movie-card__container">
                        <h3>${movie.Title}</h3>
                        <p><b><img src="${movie.Poster}" alt="${movie.Title} Poster" width="100"></b></p>
                        <p><b>Year: ${movie.Year}</b></p>
                    </div>
                </div>
            </div>`;
}

function sortMovies(sortBy) {
  const sortedMovies = [...currentMovies].sort((a, b) => {
    const getValue = (movie, prop) => {
      if (prop === "title") return movie.Title.toLowerCase();
      if (prop === "year") return parseInt(movie.Year);
      return null;
    };
    const valueA = getValue(a, sortBy);
    const valueB = getValue(b, sortBy);
    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  });
  renderMovies(sortedMovies);
}

addEventListenerToElement(domElements.searchIcon, "click", () => {
  const searchTerm = domElements.searchInput.value.trim();
  if (searchTerm) {
    main(searchTerm);
  }
});

addEventListenerToElement(domElements.searchInput, "keypress", (event) => {
  if (event.key === "Enter") {
    const searchTerm = domElements.searchInput.value.trim();
    if (searchTerm) {
      main(searchTerm);
    }
  }
});

addEventListenerToElement(domElements.filterSelect, "change", () => {
  const filterValue = domElements.filterSelect.value;
  if (filterValue) {
    sortMovies(filterValue);
  } else {
    renderMovies(currentMovies);
  }
});

loadRandomMovies();

async function main(searchTerm) {
  try {
    const movies = await fetchMovies(searchTerm);
    if (movies.length > 0) {
      currentMovies = movies;
      renderMovies(currentMovies);
    } else {
      displayMessage(`No movies found for "${searchTerm}".`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    displayMessage("Error loading movie data.");
  }
}
