import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./movie-card";
import "../styles/genre-row.css";

export default function GenreRow({ genreName, movies, IMAGE_BASE_URL }) {
    const scrollRef = useRef(null);

    // scroll left when the arrow is clicked
    function scrollLeft() {
        const container = scrollRef.current;
        if (container !== null) {
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: -amount,
                behavior: "smooth"
            });
        }
    }

    // scroll right when the arrow is clicked
    function scrollRight() {
        const container = scrollRef.current;
        if (container !== null) {
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: amount,
                behavior: "smooth"
            });
        }
    }

    return (
        <div className="genre-row">
            <h2 className="section-title genre-title">{genreName}</h2>
            <div className="movie-row-container">
                <button
                    className="scroll-arrow scroll-arrow-left"
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>

                <div
                    className="movie-row-scroll"
                    ref={scrollRef}
                >
                    {/* loop through each movie and make a card for it */}
                    {movies.map(function(movie) {
                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                IMAGE_BASE_URL={IMAGE_BASE_URL}
                            />
                        );
                    })}
                </div>

                <button
                    className="scroll-arrow scroll-arrow-right"
                    onClick={scrollRight}
                    aria-label="Scroll right"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}
