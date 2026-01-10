import { getRated } from "./api.js";


  getRated().then((data) => {

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
        movieCard(data);

       
      
  })
  .catch((error) => {
    console.error("Error fetching people:", error);
    container.innerHTML = "<p>Något gick fel. Försök igen senare.</p>";
  });

const container = document.getElementById("movieContainer");

function movieCard(data) {
  const rateMovies = data.results.slice(0, 10);

  rateMovies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movieCard");

    const imgEl = document.createElement("img");
    imgEl.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

    const titleEl = document.createElement("h3");
    titleEl.textContent = movie.title;

    const releaseEl = document.createElement("p");
    releaseEl.textContent = `Release Date: ${movie.release_date}`;

    card.appendChild(imgEl);
    card.appendChild(titleEl);
    card.appendChild(releaseEl);

    container.appendChild(card);
  });
}
