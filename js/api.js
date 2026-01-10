const api_key = "a086dd1e4cba88513a1b8d5a97a94e41";

export async function getRated() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${api_key}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

export async function getPopular() {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${api_key}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

export async function getMovies(name) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&language=en-US&page=1&api_key=${api_key}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const json = await res.json();
    console.log(json)
    return json;
  } catch (err) {
    return null;
  }
}

export async function getPeople(name) {
  const url = `https://api.themoviedb.org/3/search/person?query=${name}&language=en-US&page=1&api_key=${api_key}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const json = await res.json();
    return json;
  } catch (err) {
    return null;
  }
}
