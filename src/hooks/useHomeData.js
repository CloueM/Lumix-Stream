import { useEffect, useState } from "react";
import {
    fetchNowPlayingMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
    fetchTrendingToday
} from "../services/movieApi.js";

// hook to get all data for home page
export function useHomeData() {
    const [categorizedMovies, setCategorizedMovies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // load data when page first load
    useEffect(function() {
        async function loadData() {
            try {
                setLoading(true);

                // get movie data for each category
                const trendingData = await fetchTrendingToday();
                const nowPlayingData = await fetchNowPlayingMovies();
                const popularData = await fetchPopularMovies();
                const topRatedData = await fetchTopRatedMovies();
                const upcomingData = await fetchUpcomingMovies();

                // save only top 10 from each category
                const newCategories = {
                    "Trending Today": trendingData.results.slice(0, 10),
                    "Now Playing": nowPlayingData.results.slice(0, 10),
                    "Popular": popularData.results.slice(0, 10),
                    "Top Rated": topRatedData.results.slice(0, 10),
                    "Upcoming": upcomingData.results.slice(0, 10)
                };
                
                setCategorizedMovies(newCategories);
            } catch (err) {
                // save error if fail
                setError(err.message);
                console.error("Failed to load home data:", err);
            } finally {
                // stop loading screen
                setLoading(false);
            }
        }

        loadData();
    }, []);

    // return the states
    return { categorizedMovies, loading, error };
}

