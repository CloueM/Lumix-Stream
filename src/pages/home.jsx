import { IMAGE_BASE_URL } from "../services/movieApi.js";
import { useHomeData } from "../hooks/useHomeData";
import Loading from "../components/Loading";
import GenreRow from "../components/genre-row";
import TrendingToday from "../components/trending-today";

// main home page of the website
export default function Home() {
    // get movies grouped by category from custom hook
    const { categorizedMovies, loading, error } = useHomeData();

    // show loading spinner while fetching
    if (loading) {
        return <Loading />;
    }

    // show error message if fetch fails
    if (error) {
        return (
            <div style={{ padding: "20px", color: "red" }}>
                <p>Error: {error}</p>
            </div>
        );
    }

    // separate trending movies for the big hero section at top
    let trendingMovies = [];
    if (categorizedMovies["Trending Today"]) {
        trendingMovies = categorizedMovies["Trending Today"];
    }
    
    // separate other categories for rows below
    const otherCategories = [];
    const categoryNames = Object.keys(categorizedMovies);
    
    for (let i = 0; i < categoryNames.length; i++) {
        const name = categoryNames[i];
        if (name !== "Trending Today") {
            otherCategories.push({
                name: name,
                movies: categorizedMovies[name]
            });
        }
    }

    return (
        <div className="home-page">
            <div>
                {/* show big hero if there are trending movies */}
                {trendingMovies.length > 0 && (
                    <TrendingToday
                        movies={trendingMovies}
                        IMAGE_BASE_URL={IMAGE_BASE_URL}
                    />
                )}
            </div>
            
            <div className="category-container category-container--no-top-padding">
                {/* loop through normal categories and make a row for each */}
                {otherCategories.map(function(category) {
                    return (
                        <GenreRow
                            key={category.name}
                            genreName={category.name}
                            movies={category.movies}
                            IMAGE_BASE_URL={IMAGE_BASE_URL}
                        />
                    );
                })}
            </div>
        </div>
    );
}

