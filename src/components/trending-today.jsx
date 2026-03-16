import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { DraggableCore } from "react-draggable";
import { useFavorites } from "../hooks/useFavorites";
import { useMovieLogos } from "../hooks/useMovieLogos";
import "../styles/trending-today.css";
import "../styles/buttons.css";

export default function TrendingToday({ movies, IMAGE_BASE_URL }) {
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    const logos = useMovieLogos(movies);

    // which slide is currently showing
    const [currentIndex, setCurrentIndex] = useState(0);
    // how many pixels the track has moved during a drag
    const [dragOffset, setDragOffset] = useState(0);
    // whether to use a smooth animation when snapping to a slide
    const [isAnimating, setIsAnimating] = useState(false);

    const trackRef = useRef(null);
    const hasDragged = useRef(false);
    const dragOffsetRef = useRef(0);

    // automatically go to the next slide every 20 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setCurrentIndex(function(prev) {
                if (prev + 1 >= movies.length) {
                    return 0;
                } else {
                    return prev + 1;
                }
            });
        }, 20000);

        return () => clearInterval(interval);
    }, [movies.length]);

    // dont show anything if there are no movies
    if (movies.length === 0) {
        return null;
    }

    // this runs while the user is dragging
    function handleDrag(e, data) {
        if (Math.abs(data.x) > 5) {
            hasDragged.current = true;
        }
        setDragOffset(function(prev) {
            const next = prev + data.deltaX;
            dragOffsetRef.current = next;
            return next;
        });
    }

    // this runs when the user lets go
    function handleDragStop(e, data) {
        const finalOffset = dragOffsetRef.current;

        setIsAnimating(true);
        setDragOffset(0);
        dragOffsetRef.current = 0;

        // change slide if dragged far enough
        if (finalOffset < -50) {
            // dragged left, go to next slide
            setCurrentIndex(function(prev) {
                if (prev + 1 >= movies.length) {
                    return 0;
                } else {
                    return prev + 1;
                }
            });
        } else if (finalOffset > 50) {
            // dragged right, go to previous slide
            setCurrentIndex(function(prev) {
                if (prev === 0) {
                    return movies.length - 1;
                } else {
                    return prev - 1;
                }
            });
        }

        setTimeout(function() {
            hasDragged.current = false;
        }, 0);
    }

    function handleDragStart() {
        hasDragged.current = false;
        setIsAnimating(false);
        setDragOffset(0);
        dragOffsetRef.current = 0;
    }

    // dont navigate if the user was just dragging
    function handleViewClick(e, movie) {
        e.stopPropagation();
        if (hasDragged.current) {
            return;
        }
        navigate("/movie/" + movie.id);
    }

    function handleBookmarkClick(e, movie) {
        e.stopPropagation();
        if (hasDragged.current) {
            return;
        }
        toggleFavorite(movie);
    }

    const translateX = "calc(" + (-currentIndex * 100) + "% + " + dragOffset + "px)";

    const trackStyle = {
        transform: "translateX(" + translateX + ")",
        transition: isAnimating ? "transform 0.45s ease" : "none",
    };

    return (
        <div className="trending-hero" style={{ cursor: "grab" }}>
            <DraggableCore
                onStart={handleDragStart}
                onDrag={handleDrag}
                onStop={handleDragStop}
                nodeRef={trackRef}
            >
                {/* all the slides are in here side by side */}
                <div
                    className="hero-track"
                    ref={trackRef}
                    style={trackStyle}
                >
                    {movies.map(function(movie, index) {
                        // get the background image for this movie
                        let backgroundImage = "";
                        if (movie.backdrop_path) {
                            backgroundImage = IMAGE_BASE_URL + movie.backdrop_path;
                        } else if (movie.poster_path) {
                            backgroundImage = IMAGE_BASE_URL + movie.poster_path;
                        }

                        // get the release year
                        let year = "N/A";
                        if (movie.release_date) {
                            year = new Date(movie.release_date).getFullYear();
                        } else if (movie.first_air_date) {
                            year = new Date(movie.first_air_date).getFullYear();
                        }

                        // get the title
                        let title = "";
                        if (movie.title) {
                            title = movie.title;
                        } else if (movie.name) {
                            title = movie.name;
                        }

                        // get the rating
                        let rating = "N/A";
                        if (movie.vote_average) {
                            rating = movie.vote_average.toFixed(1);
                        }

                        // check if its a movie or tv show
                        let mediaType = "Movie";
                        if (movie.media_type === "tv") {
                            mediaType = "TV Series";
                        }

                        // shorten the overview so it doesnt take up too much space
                        let overview = "";
                        if (movie.overview) {
                            if (movie.overview.length > 300) {
                                overview = movie.overview.substring(0, 300).trim() + "...";
                            } else {
                                overview = movie.overview;
                            }
                        }

                        // check if this movie is bookmarked
                        let favorited = isFavorite(movie.id);

                        let bookmarkClass = "bookmark-btn glass";
                        if (favorited) {
                            bookmarkClass = "bookmark-btn glass active";
                        }

                        let bookmarkIcon;
                        if (favorited) {
                            bookmarkIcon = <FaBookmark className="button-icon" />;
                        } else {
                            bookmarkIcon = <FaRegBookmark className="button-icon" />;
                        }

                        return (
                            <div className="hero-slide" key={movie.id || index}>
                                <div
                                    className="hero-backdrop"
                                    style={{ backgroundImage: "url(" + backgroundImage + ")" }}
                                >
                                    <div className="hero-gradient"></div>
                                </div>

                                <div className="hero-content">
                                    <div className="hero-badge glass">Trending Today</div>
                                    {logos[movie.id] ? (
                                        <img 
                                            src={IMAGE_BASE_URL + logos[movie.id]} 
                                            alt={`${title} logo`} 
                                            className="hero-logo" 
                                            draggable="false"
                                        />
                                    ) : (
                                        <h1 className="hero-title">{title}</h1>
                                    )}

                                    <div className="hero-meta">
                                        <span className="hero-rating">⭐ {rating}</span>
                                        <span className="hero-separator">•</span>
                                        <span className="hero-year">{year}</span>
                                        <span className="hero-separator">•</span>
                                        <span className="hero-type">{mediaType}</span>
                                    </div>

                                    <p className="hero-overview">{overview}</p>

                                    <div className="hero-buttons">
                                        <button
                                            className="view-btn"
                                            onClick={(e) => handleViewClick(e, movie)}
                                            onTouchEnd={(e) => handleViewClick(e, movie)}
                                            aria-label="View movie details"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <FaPlay className="button-icon" />
                                            View
                                        </button>
                                        <button
                                            className={bookmarkClass}
                                            onClick={(e) => handleBookmarkClick(e, movie)}
                                            onTouchEnd={(e) => handleBookmarkClick(e, movie)}
                                            aria-label="Bookmark"
                                            style={{ cursor: "pointer" }}
                                        >
                                            {bookmarkIcon}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </DraggableCore>

            {/* dots at the bottom so you can see which slide youre on */}
            <div className="hero-indicators">
                {movies.map(function(movie, index) {
                    let indicatorClass = "indicator";
                    if (index === currentIndex) {
                        indicatorClass = "indicator active";
                    }

                    return (
                        <button
                            key={index}
                            className={indicatorClass}
                            onClick={function() {
                                setIsAnimating(true);
                                setCurrentIndex(index);
                            }}
                            style={{ cursor: "pointer" }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
