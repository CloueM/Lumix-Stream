import { FaStar, FaBookmark, FaPlay } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import "../styles/movie-card.css";
import "../styles/buttons.css";

// single movie poster card
export default function MovieCard({ movie, IMAGE_BASE_URL }) {
    // for going to other page
    const navigate = useNavigate();
    // manage favorite movies
    const { isFavorite, toggleFavorite } = useFavorites();

    // check if movie is in favorite
    const favorited = isFavorite(movie.id);

    // make long title short
    function truncateTitle(text) {
        if (!text) {
            return "Untitled";
        }
        if (text.length > 30) {
            return text.substring(0, 25) + "...";
        }
        return text;
    }

    // make long overview short
    function truncateOverview(text) {
        if (!text) {
            return "No overview available.";
        }
        if (text.length > 100) {
            return text.substring(0, 100) + "...";
        }
        return text;
    }

    // make date look good (e.g., "Jan 1, 2024")
    function formatDate(dateString) {
        if (!dateString) {
            return "Release date unknown";
        }
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    // handle bookmark click
    function handleBookmark(e) {
        e.stopPropagation();
        toggleFavorite(movie);
    }

    // go to movie page when click view
    function handleView(e) {
        e.stopPropagation();
        navigate("/movie/" + movie.id);
    }

    let starRating = "N/A";
    if (movie.vote_average) {
        starRating = movie.vote_average.toFixed(1);
    }

    let bookmarkIcon;
    if (favorited) {
        bookmarkIcon = <FaBookmark className="button-icon" />;
    } else {
        bookmarkIcon = <FaRegBookmark className="button-icon" />;
    }

    let bookmarkClass = "bookmark-btn glass";
    if (favorited) {
        bookmarkClass = "bookmark-btn glass active";
    }

    return (
        <div className="movie-card">
            <div className="movie-poster-container">
                <img
                    className="movie-posters"
                    src={IMAGE_BASE_URL + movie.poster_path}
                    alt={movie.title}
                />
                
                <div className="movie-overlay">
                    <div className="overlay-content">
                        <div className="overlay-bottom-content">
                            <h3 className="overlay-title">{truncateTitle(movie.title)}</h3>
                            <div className="overlay-rating">
                                <FaStar className="star-icon" />
                                <span>{starRating}</span>
                            </div>
                            <p className="overlay-date">{formatDate(movie.release_date)}</p>
                            <p className="overlay-overview">{truncateOverview(movie.overview)}</p>
                        </div>
                        
                        <div className="overlay-buttons">
                            <button
                                className="view-btn"
                                onClick={handleView}
                                aria-label="View movie details"
                            >
                                <FaPlay className="button-icon" />
                                View
                            </button>
                            <button
                                className={bookmarkClass}
                                onClick={handleBookmark}
                                aria-label="Bookmark"
                            >
                                {bookmarkIcon}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
