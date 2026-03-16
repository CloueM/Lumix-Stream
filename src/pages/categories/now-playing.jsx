import { fetchNowPlayingMovies, IMAGE_BASE_URL } from "../../services/movieApi.js";
import { useMovieData } from "../../hooks/useMovieData";
import Loading from "../../components/Loading";
import GenreRow from "../../components/genre-row";

// page that shows movies playing now
export default function NowPlaying() {
    // get movies data from our custom hook
    const { moviesByGenre, loading, error } = useMovieData(fetchNowPlayingMovies);

    // show loading screen while waiting for data
    if (loading) {
        return <Loading />;
    }

    // show error if something goes wrong
    if (error) {
        return (
            <div style={{ padding: "20px", color: "red" }}>
                <p>Error: {error}</p>
            </div>
        );
    }

    // get all the genre names from the object so we can loop them
    const genres = Object.keys(moviesByGenre);

    return (
        <div className="category-container">
            {/* loop through each genre and create a row for it */}
            {genres.map(function(genreName) {
                const movies = moviesByGenre[genreName];
                return (
                    <GenreRow
                        key={genreName}
                        genreName={genreName}
                        movies={movies}
                        IMAGE_BASE_URL={IMAGE_BASE_URL}
                    />
                );
            })}
        </div>
    );
}
