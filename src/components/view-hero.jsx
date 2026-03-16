import { FaStar, FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useFavorites } from "../hooks/useFavorites";
import { useMovieLogos } from "../hooks/useMovieLogos";
import "../styles/view-hero.css";
import "../styles/buttons.css";

// big hero section for movie detail
export default function ViewHero({ movie, trailerKey, IMAGE_BASE_URL }) {
    // check if movie is bookmarked
    const { isFavorite, toggleFavorite } = useFavorites();
    const logos = useMovieLogos(movie);
    
    let favorited = false;
    if (movie) {
        favorited = isFavorite(movie.id);
    }

    // use backdrop or poster
    let backgroundImage = "";
    if (movie.backdrop_path) {
        backgroundImage = IMAGE_BASE_URL + movie.backdrop_path;
    } else {
        backgroundImage = IMAGE_BASE_URL + movie.poster_path;
    }

    // poster image next to detail
    let posterImage = "";
    if (movie.poster_path) {
        posterImage = IMAGE_BASE_URL + movie.poster_path;
    } else {
        posterImage = "https://via.placeholder.com/300x450?text=No+Poster";
    }

    // get year from date
    let year = "N/A";
    if (movie.release_date) {
        const date = new Date(movie.release_date);
        year = date.getFullYear();
    }

    let rating = "N/A";
    if (movie.vote_average) {
        rating = movie.vote_average.toFixed(1);
    }

    // format runtime minute to hour
    function formatRuntime(minutes) {
        if (!minutes) {
            return "N/A";
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours + "h " + mins + "m";
    }

    // format date to long format
    function formatDate(dateString) {
        if (!dateString) {
            return "N/A";
        }
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    let title = "";
    if (movie.title) {
        title = movie.title;
    } else {
        title = movie.name;
    }

    let status = "N/A";
    if (movie.status) {
        status = movie.status;
    }

    let genresText = "N/A";
    if (movie.genres && movie.genres.length > 0) {
        const genreNames = movie.genres.map(function(g) {
            return g.name;
        });
        genresText = genreNames.join(", ");
    }

    let overview = "No description available.";
    if (movie.overview) {
        overview = movie.overview;
    }

    function handleBookmarkClick() {
        toggleFavorite(movie);
    }

    let bookmarkIcon;
    if (favorited) {
        bookmarkIcon = <FaBookmark className="button-icon" />;
    } else {
        bookmarkIcon = <FaRegBookmark className="button-icon" />;
    }

    let bookmarkClass = "bookmark-btn";
    if (favorited) {
        bookmarkClass = "bookmark-btn active";
    }

    let bookmarkText = "Save";
    if (favorited) {
        bookmarkText = "Saved";
    }

    return (
        <div className="view-hero">
            <div
                className="view-backdrop"
                style={{ backgroundImage: "url(" + backgroundImage + ")" }}
            />
            <div className="view-gradient" />

            <div className="view-content">
                <div className="view-main-panel">
                    <div className="view-content-row">
                        <div className="view-media-col">
                            {logos[movie.id] ? (
                                <img 
                                    src={IMAGE_BASE_URL + logos[movie.id]} 
                                    alt={`${title} logo`} 
                                    className="details-logo" 
                                    draggable="false"
                                />
                            ) : (
                                <h2 className="details-title">{title}</h2>
                            )}

                            {trailerKey && (
                                <div className="view-trailer">
                                    <iframe
                                        src={"https://www.youtube.com/embed/" + trailerKey + "?autoplay=0&rel=0"}
                                        title="Movie Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>

                        <div className="view-info-col">
                            <div className="details-poster-row">
                                <div className="details-poster">
                                    <img
                                        src={posterImage}
                                        alt={title}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="details-meta-items">
                                    <div className="meta-grid">
                                        <div className="meta-item">
                                            <span className="meta-label">Status</span>
                                            <span className="meta-value">{status}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Runtime</span>
                                            <span className="meta-value">{formatRuntime(movie.runtime)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Release Date</span>
                                            <span className="meta-value">{formatDate(movie.release_date)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Rating</span>
                                            <span className="meta-value">
                                                <FaStar className="meta-star" /> {rating}
                                            </span>
                                        </div>
                                        <div className="meta-item meta-genres-item">
                                            <span className="meta-label">Genres</span>
                                            <div className="meta-genres">
                                                <span className="meta-value">
                                                    {genresText}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="details-overview">
                                {overview}
                            </p>

                            <button 
                                className={bookmarkClass}
                                onClick={handleBookmarkClick}
                                aria-label="Bookmark"
                            >
                                {bookmarkIcon}
                                {bookmarkText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
