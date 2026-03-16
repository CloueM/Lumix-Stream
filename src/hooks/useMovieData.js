import { useEffect, useState } from "react";
import { fetchGenres } from "../services/movieApi.js";

// hook to get movies and group it by genre
export function useMovieData(fetchMoviesFunction) {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // run when function changes
    useEffect(function() {
        if (!fetchMoviesFunction) {
            return;
        }

        async function loadData() {
            try {
                setLoading(true);

                // get movies and genres list
                const moviesData = await fetchMoviesFunction();
                const genresData = await fetchGenres();

                setMovies(moviesData.results);
                setGenres(genresData.genres);
            } catch (err) {
                // save error if fail
                setError(err.message);
                console.error("Failed to load data:", err);
            } finally {
                // stop loading screen
                setLoading(false);
            }
        }

        loadData();
    }, [fetchMoviesFunction]);

    // group movies by genre name
    const moviesByGenre = {};
    
    // check each genre
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        const moviesInGenre = [];
        
        // see which movie has this genre id
        for (let j = 0; j < movies.length; j++) {
            const movie = movies[j];
            
            // check if movie belongs to genre
            let isInGenre = false;
            for (let k = 0; k < movie.genre_ids.length; k++) {
                if (movie.genre_ids[k] === genre.id) {
                    isInGenre = true;
                    break;
                }
            }
            
            if (isInGenre) {
                moviesInGenre.push(movie);
            }
        }
        
        // only show if 10 or more movies
        if (moviesInGenre.length >= 10) {
            moviesByGenre[genre.name] = moviesInGenre;
        }
    }

    // return the states
    return { movies, genres, moviesByGenre, loading, error };
}

