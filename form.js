//Tomamos referencia del formulario
const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);

function generateUUID() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    uuid += Math.floor(Math.random() * 16).toString(16);
  }
  return uuid;
}

//función de procesamiento del formulario
function handleFormSubmit(e) {
  const movieData = new FormData(form);
  e.preventDefault();
  const uuid = generateUUID();

  const gens = movieData.get("genre").split(", ");
  console.log(gens);

  const newMovie = {
    id: uuid,
    title: movieData.get("title"),
    year: movieData.get("year"),
    director: movieData.get("director"),
    duration: movieData.get("duration"),
    poster: movieData.get("poster"),
    genre: gens,
    rate: movieData.get("rate"),
  };
  console.log(newMovie);
}

//método POST para crear una película en el backend
