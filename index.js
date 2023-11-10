//Aquí renderizaremos los datos que lleguen del backend
const moviesContainer = document.getElementById("moviesContainer");

const URL = "https://654436695a0b4b04436c25f6.mockapi.io/"; //aquí va la url base de vuestro proyecto de MockAPI
//Método GET
function getAll() {
  fetch(URL + "movies")
    .then(res => res.json())
    .then(movies => renderMovies(movies));
}
getAll();

//detectamos el click en los botones "Delete" y levantamos el id del recurso, que previamente
//adherimos al propio botón con el atributo data (así sabemos el id del recurso a borrar 😉)
document.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const id = e.target.dataset.id;
    const actualCard = e.target.closest("article");
    switch (e.target.id) {
      case "btnDelete":
        deleteOne(id, actualCard);
        break;
      case "btnEdit":
        const img = actualCard.querySelector("img");
        console.log(img.getAttribute("src"));
        const ttl = actualCard.querySelector("h2");
        console.log(ttl.innerText);
        const children = actualCard.querySelectorAll("p");
        for (const child of children) {
          console.log(child.innerText);
        }
        break;
      default:
        break;
    }
  }
});

/* Método DELETE
 * @param {id} id del recurso a borrar
 * @param {actualCard} elemento del DOM que contiene el recurso a borrar
 */

function deleteOne(id, actualCard) {
  fetch(URL + `movies/${id}`, {
    method: "delete",
  }).then(res => {
    if (res.ok) actualCard.remove();
  });
}

/*
 * @param {movies} array de elementos a renderizar
 */
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
    <div>
    <button data-id="${movie.id}" id="btnDelete">Delete</button>
    <button data-id="${movie.id}" id="btnEdit">Edit</button>
    <div>
    `;
    movieCard.innerHTML = movieData;
    moviesContainer.appendChild(movieCard);
  }
}

//método POST
