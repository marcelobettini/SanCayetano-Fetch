const moviesContainer = document.getElementById("moviesContainer");
const URL = "https://654436695a0b4b04436c25f6.mockapi.io/";
function getAll() {
  fetch(URL + "movies")
    .then(res => res.json())
    .then(movies => renderMovies(movies));
}
getAll();
document.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const id = e.target.dataset.id;
    const actualCard = e.target.closest("article");
    deleteOne(id, actualCard);
  }
});

function deleteOne(id, actualCard) {
  fetch(URL + `movies/${id}`, {
    method: "delete",
  }).then(res => {
    if (res.ok) actualCard.remove();
  });
}

function renderMovies(movies) {
  for (const movie of movies) {
    const movieCard = document.createElement("article");
    movie;
    const movieData = `    
    <img src="${movie.poster}" alt="${movie.title}"/>
    <h2>${movie.title}</h2>
    <p>${movie.year}</p>
    <p>Directed by ${movie.director}</p>
    <p>${movie.genre.join(", ")}</p>
    <p>rating: ${movie.rate}</p>
    <button data-id="${movie.id}">Delete</button>
    `;
    movieCard.innerHTML = movieData;
    moviesContainer.appendChild(movieCard);
  }
}
