import { useState } from "react";
import { FaRegBookmark, FaTrash } from "react-icons/fa";
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/movie-card";
import { IMAGE_BASE_URL } from "../services/movieApi";
import "../styles/search.css";
import "../styles/favorites.css";

// page that shows saved movies
export default function UserBookmark() {
    // get favorites list from hook
    const { favorites, clearFavorites } = useFavorites();
    // track if confirm box is open
    const [showConfirm, setShowConfirm] = useState(false);

    // click clear all button
    function handleClearClick() {
        setShowConfirm(true);
    }

    // click ok on confirm box
    function confirmClear() {
        clearFavorites();
        setShowConfirm(false);
    }

    // click cancel on confirm box
    function cancelClear() {
        setShowConfirm(false);
    }

    // class name for container depending on results
    let containerClass = "search-page favorites-page";
    if (favorites.length > 0) {
        containerClass = "search-page favorites-page search-page--has-results";
    }

    // handle how many text is shown
    let movieText = "movies";
    if (favorites.length === 1) {
        movieText = "movie";
    }

    return (
        <div className={containerClass}>
            {/* show empty message if nothing inside list */}
            {favorites.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="search-grid">
                    <div className="search-results-header">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingRight: "1rem" }}>
                            <div>
                                <h2 className="search-results-title">My Favorites</h2>
                                <p className="search-results-count">
                                    {favorites.length} {movieText}
                                </p>
                            </div>
                            <button
                                className="clear-all-btn"
                                onClick={handleClearClick}
                                aria-label="Clear all favorites"
                            >
                                <FaTrash style={{ fontSize: "0.75rem" }} />
                                Clear All
                            </button>
                        </div>
                    </div>
                    
                    {/* regular map for movies list */}
                    {favorites.map(function(movie) {
                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                IMAGE_BASE_URL={IMAGE_BASE_URL}
                            />
                        );
                    })}
                </div>
            )}

            {/* popup box to check user really want to delete */}
            {showConfirm && (
                <div className="favorites-modal-overlay">
                    <div className="favorites-modal">
                        <h3>Clear Favorites</h3>
                        <p>Are you sure you want to remove all movies from your Favorites?</p>
                        <div className="favorites-modal-actions">
                            <button className="favorites-modal-btn clear" onClick={confirmClear}>
                                Clear
                            </button>
                            <button className="favorites-modal-btn cancel" onClick={cancelClear}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// show this component if list is empty
function EmptyState() {
    return (
        <div className="favorites-empty">
            <div className="favorites-empty-icon">
                <FaRegBookmark />
            </div>
            <h2 className="favorites-empty-title">No favorites yet</h2>
            <p className="favorites-empty-sub">
                Hover over any movie card and click the bookmark icon to save it here.
                Your favorites are stored locally on this device.
            </p>
        </div>
    );
}
