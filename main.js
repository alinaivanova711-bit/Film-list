const btnDeleteAll = document.querySelector('#delete-all-btn');
const filterTitleEl = document.getElementById("find-title");
const filterGenreEl = document.getElementById("find-genre");
const filterYearEl = document.getElementById("find-releaseYear");
const filterWatchedEl = document.getElementById("find-watched");
const titleInp = document.getElementById("title");
const genreInp = document.getElementById("genre");
const releaseYearInp = document.getElementById("releaseYear");
const isWatchedInp = document.getElementById("isWatched");
const filmForm = document.getElementById("film-form");
const findForm = document.querySelector(".find-form");
const filmTableBody = document.getElementById("film-tbody");


function handleFormSubmit(e) {
  e.preventDefault();

  const film = {
    title: titleInp.value,
    genre: genreInp.value,
    releaseYear: releaseYearInp.value,
    isWatched: isWatchedInp.checked,
  };

  addFilm(film);
  filmForm.reset();
}

async function addFilm(film) {
  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "alinaivanova711@mail.ru",
    },
    body: JSON.stringify(film),
  });
  renderTable();
}

async function renderTable() {
  const filmsResponse = await fetch(`https://sb-film.skillbox.cc/films?title=${filterTitleEl.value}&genre=${filterGenreEl.value}&releaseYear=${filterYearEl.value}&isWatched=${filterWatchedEl.value}`, {
      headers: {
        email: "alinaivanova711@mail.ru",
      },
    });
  const films = await filmsResponse.json();

  filmTableBody.innerHTML = "";
  films.forEach((film) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td> <button class="btn-delete">Удалить</button></td>
    `;
    filmTableBody.appendChild(row);

    row
      .querySelector(".btn-delete").addEventListener("click", () =>
        deleteFilm(film.id));
  });
}



async function deleteFilm(id) {
  const response = await fetch(`https://sb-film.skillbox.cc/films/${id || ""}`, {
    method: "DELETE",
    headers: {
      email: "alinaivanova711@mail.ru",
    }
  });
  const data = await response.json();
  renderTable();
}


btnDeleteAll.addEventListener("click", () => deleteFilm());
findForm.addEventListener("input", renderTable);
filmForm.addEventListener("submit", handleFormSubmit);

renderTable();

