let movies = [];
let original = [];
let visible = 0;

const STEP = 10;

fetch("product.json")
  .then(res => res.json())
  .then(data => {
    movies = data;
    original = [...data];

    render();

    window.addEventListener("scroll", infinite);
  });

function render() {
  const target = document.getElementById("movie-list");

  target.innerHTML = "";

  movies
    .slice(0, visible + STEP)
    .forEach(movie => {
      target.innerHTML += `
        <div class="movie">

          <img
            src="${movie.poster}"
            onerror="this.src='https://via.placeholder.com/300x400'"
          >

          <div class="overview">
            <b>줄거리</b>
            <br><br>
            ${movie.overview}
          </div>

          <h3>${movie.title}</h3>

          <p>
            📅 ${movie.release_date}
          </p>

          <p>
            ⭐ ${movie.vote_average}
          </p>

        </div>
      `;
    });

  visible += STEP;
}

function infinite() {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight
  ) {
    render();
  }
}

function searchMovie() {
  const keyword =
    document
      .getElementById("keyword")
      .value
      .toLowerCase();

  movies = original.filter(movie =>
    movie.title
      .toLowerCase()
      .includes(keyword)
  );

  visible = 0;

  render();
}

function sortMovie(type) {

  if (type === "ratingDesc") {
    movies.sort(
      (a, b) =>
        b.vote_average - a.vote_average
    );

  } else if (type === "ratingAsc") {
    movies.sort(
      (a, b) =>
        a.vote_average - b.vote_average
    );

  } else if (type === "dateDesc") {
    movies.sort(
      (a, b) =>
        new Date(b.release_date) -
        new Date(a.release_date)
    );

  } else {
    movies.sort(
      (a, b) =>
        new Date(a.release_date) -
        new Date(b.release_date)
    );
  }

  visible = 0;

  render();
}