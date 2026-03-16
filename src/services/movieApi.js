import { BASE_URL, API_KEY, LANGUAGE, GENRE_URL, IMAGE_BASE_URL } from './config.js';
import { fetchMultiplePages } from './helpers.js';

export { IMAGE_BASE_URL };

// get the list of all movie genres like action comedy etc
export async function fetchGenres() {
    const res = await fetch(GENRE_URL);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}

// these functions get movies for the home page rows
export async function fetchNowPlayingMovies() {
    const baseUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&region`;
    const result = await fetchMultiplePages(baseUrl);
    return result;
}

export async function fetchPopularMovies() {
    const baseUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&region`;
    const result = await fetchMultiplePages(baseUrl);
    return result;
}

export async function fetchTopRatedMovies() {
    const baseUrl = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&region`;
    const result = await fetchMultiplePages(baseUrl);
    return result;
}

export async function fetchUpcomingMovies() {
    const baseUrl = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&region`;
    const result = await fetchMultiplePages(baseUrl);
    return result;
}

// get movies that are popular right now for big banner
export async function fetchTrendingToday() {
    const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=${LANGUAGE}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}

// get full info for one movie
export async function fetchMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}

// get all trailers for a movie
export async function fetchMovieVideos(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}

// get all actors for a movie
export async function fetchMovieCast(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}

// search for movie by name
export async function searchMovies(query, page) {
    if (!page) {
        page = 1; // default to page 1
    }
    const encoded = encodeURIComponent(query);
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${encoded}&page=${page}&include_adult=false`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}


