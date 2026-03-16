import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ActorCard from "./actor-card";
import "../styles/movie-cast.css";

// list of actors that scroll horizontally
export default function ActorsRow({ actors, IMAGE_BASE_URL }) {
    const scrollRef = useRef(null);

    // scroll left
    function scrollLeft() {
        const container = scrollRef.current;
        if (container !== null) {
            // Calculate scroll distance: 80% of the visible container width
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: -amount,
                behavior: "smooth"
            });
        }
    }

    // scroll right
    function scrollRight() {
        const container = scrollRef.current;
        if (container !== null) {
            // Calculate scroll distance: 80% of the visible container width
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: amount,
                behavior: "smooth"
            });
        }
    }

    return (
        <div className="movie-cast">
            <h2 className="section-title cast-title">Cast</h2>
            <div className="cast-row-container">
                <button
                    className="scroll-arrow scroll-arrow-left"
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>
                <div className="cast-row-scroll" ref={scrollRef}>
                    {actors.map(function(actor) {
                        return (
                            <ActorCard
                                key={actor.id}
                                actor={actor}
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

