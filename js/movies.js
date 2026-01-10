import _ from "https://cdn.jsdelivr.net/npm/underscore@1.13.7/underscore-esm-min.js";
import { getMovies } from "./api.js";

const container = document.getElementById("moviesContainer");
const form = document.querySelector("form");
const inputEl = document.getElementById("searchInput");



form.addEventListener("submit", async (event) => {
  event.preventDefault();

const query = inputEl.value.trim();
  if (!query) return;
  getMovies(query).then((data) => {

    if (!navigator.onLine) {
  container.innerHTML =
    "<p>Du är offline. Kontrollera din internetanslutning och försök igen.</p>";
  return;
}
 
        if (data === null) {
    container.innerHTML =
      "<p>Något gick fel. Försök igen senare.</p>";
    return;
  }

       if (!data.results.length) {
          container.innerHTML = "<p>No movies found.</p>";
          return;
      }
      movieSearch(data.results);
  })
  .catch((error) => {
    console.error("Error fetching people:", error);
    container.innerHTML = "<p>Något gick fel. Försök igen senare.</p>";
  });
});

function movieSearch(movies) {
  container.innerHTML = "";

  

  _.each(movies, movie => {
    const card = document.createElement("div");
    card.classList.add("movieCard");

    const imgEl = document.createElement("img");
    if (movie.poster_path) {
      imgEl.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    } else {
      imgEl.src = "https://via.placeholder.com/200x300?text=No+Image";
    }

    const titleEl = document.createElement("h3");
    titleEl.textContent = movie.title;

    const releaseEl = document.createElement("p");
    releaseEl.textContent = `Release Date: ${movie.release_date}`;

    const descEl = document.createElement("p");
    descEl.textContent = `Beskrivning: ${movie.overview.slice(0, 150)}`;

    card.appendChild(imgEl);
    card.appendChild(titleEl);
    card.appendChild(releaseEl);
    card.appendChild(descEl);

    container.appendChild(card);
  });
}
