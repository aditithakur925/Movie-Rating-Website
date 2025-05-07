const API_KEY = '04c35731a5ee918f014970082a0088b1';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Initially load popular movies
getMovies(API_URL);

// Fetch movies
async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
  } catch (error) {
    console.error('Failed to fetch movies', error);
    main.innerHTML = '<p class="error">Failed to load movies. Please try again later.</p>';
  }
}

// Create movie cards
function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${poster_path ? IMG_PATH + poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByVote(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview || "No overview available."}</p>
      </div>
    `;

    main.appendChild(movieEl);
  });
}

// Get color by rating
function getClassByVote(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

// Search functionality
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm) {
    getMovies(SEARCH_URL + encodeURIComponent(searchTerm));
    search.value = '';
  } else {
    window.location.reload();
  }
});

const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    toggleBtn.textContent = '🌙'; // Show Moon icon for dark mode
  } else {
    toggleBtn.textContent = '☀️'; // Show Sun icon for light mode
  }
});


