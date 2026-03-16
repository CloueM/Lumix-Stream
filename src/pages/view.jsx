import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieVideos, fetchMovieCast, IMAGE_BASE_URL } from "../services/movieApi.js";
import ViewHero from "../components/view-hero";
import ActorsRow from "../components/actors-row";
import Loading from "../components/Loading";

// the actual page that shows the movie detail and actors
export default function View() {
    // get id from web url
    const { id } = useParams();
    
    // state for movie info
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // load data when page first load
    useEffect(function() {
        if (!id) {
            return;
        }

        async function loadMovieData() {
            try {
                setLoading(true);

                // download all data from api at once
                const [movieData, videosData, castData] = await Promise.all([
                    fetchMovieDetails(id),
                    fetchMovieVideos(id),
                    fetchMovieCast(id)
                ]);

                setMovie(movieData);

                // look for youtube trailer in video list
                let foundTrailer = null;
                for (let i = 0; i < videosData.results.length; i++) {
                    const video = videosData.results[i];
                    if (video.type === "Trailer" && video.site === "YouTube") {
                        foundTrailer = video;
                        break;
                    }
                }
                
                if (foundTrailer) {
                    setTrailerKey(foundTrailer.key);
                }

                // only get first 15 actors so it is not too much
                const topActors = castData.cast.slice(0, 15);
                setActors(topActors);

            } catch (err) {
                // save error if fetching fail
                setError(err.message);
                console.error("Failed to load movie data:", err);
            } finally {
                // stop loading screen
                setLoading(false);
            }
        }

        loadMovieData();
    }, [id]);

    // show loading icon
    if (loading) {
        return <Loading />;
    }

    // show error details
    if (error) {
        return (
            <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
                <h1>Error loading movie</h1>
                <p>{error}</p>
            </div>
        );
    }

    // fallback when movie does not exist
    if (!movie) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                Movie not found
            </div>
        );
    }

    return (
        <div>
            {/* huge banner with poster and details */}
            <ViewHero
                movie={movie}
                trailerKey={trailerKey}
                IMAGE_BASE_URL={IMAGE_BASE_URL}
            />
            
            {/* show actors row if we have them */}
            {actors.length > 0 && (
                <div className="category-container category-container--no-top-padding">
                    <ActorsRow
                        actors={actors}
                        IMAGE_BASE_URL={IMAGE_BASE_URL}
                    />
                </div>
            )}
        </div>
    );
}

