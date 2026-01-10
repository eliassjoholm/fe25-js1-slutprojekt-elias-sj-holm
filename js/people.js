import _ from "https://cdn.jsdelivr.net/npm/underscore@1.13.7/underscore-esm-min.js";
import { getPeople } from "./api.js";


const container = document.getElementById("peopleContainer");
const form = document.querySelector("form");
const inputEl = document.getElementById("searchInput");





form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = inputEl.value.trim();
  if (!query) return;
  getPeople(query).then((data) => {

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
          container.innerHTML = "<p>No people found.</p>";
          return;
      }



      peopleSearch(data.results);
  })
  .catch((error) => {
    console.error("Error fetching people:", error);
    container.innerHTML = "<p>Något gick fel. Försök igen senare.</p>";
  });
});

function peopleSearch(people) {
  container.innerHTML = "";

  _.each(people, person => {
    const card = document.createElement("div");
    card.classList.add("personCard");

    const imgEl = document.createElement("img");
    if (person.profile_path) {
      imgEl.src = `https://image.tmdb.org/t/p/w200${person.profile_path}`;
    } else {
      imgEl.src = "https://via.placeholder.com/200x300?text=No+Image";
    }

    const nameEl = document.createElement("h3");
    nameEl.textContent = person.name;

    const knownForEl = document.createElement("p");
    knownForEl.textContent = `Known for: ${person.known_for_department}`;

    const ulEl = document.createElement("ul");
    person.known_for.slice(0, 3).forEach((movies) => {
      const liEl = document.createElement("li");
      liEl.textContent =
        (movies.media_type === "movie" ? "Movie: " : "TV: ") +
        (movies.title || movies.name);
      ulEl.appendChild(liEl);
    });

    card.appendChild(imgEl);
    card.appendChild(nameEl);
    card.appendChild(knownForEl);
    card.appendChild(ulEl);

    container.appendChild(card);
  });
}
