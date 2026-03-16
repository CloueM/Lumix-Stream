import { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaTimes, FaFilm } from 'react-icons/fa';
import { searchMovies, IMAGE_BASE_URL } from '../services/movieApi';
import MovieCard from '../components/movie-card';
import '../styles/search.css';

// search page to find any movie
export default function Search() {
    // what user types in box
    const [query, setQuery] = useState('');
    // what we actually search for
    const [submittedQuery, setSubmittedQuery] = useState('');
    // list of movies from search
    const [movies, setMovies] = useState([]);
    // page number for results
    const [currentPage, setCurrentPage] = useState(1);
    // how many pages total
    const [totalPages, setTotalPages] = useState(0);
    // how many movies total found
    const [totalResults, setTotalResults] = useState(0);
    
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);

    // reference to track scroll to bottom
    const sentinelRef = useRef(null);
    const activeQueryRef = useRef('');

    // click search button
    function handleSearch() {
        const q = query.trim();
        if (q !== submittedQuery) {
            setSubmittedQuery(q);
        }
    }

    // press enter key to search
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    // clear search bar
    function handleClear() {
        setQuery('');
        setSubmittedQuery('');
        setMovies([]);
        setTotalPages(0);
        setTotalResults(0);
        setCurrentPage(1);
    }

    // fetch movies when search is submitted
    const fetchInitial = useCallback(async function(q) {
        if (!q) {
            setMovies([]);
            setTotalPages(0);
            setTotalResults(0);
            setCurrentPage(1);
            return;
        }

        setLoading(true);
        setError(null);
        activeQueryRef.current = q;

        try {
            // get data from api
            const data = await searchMovies(q, 1);
            
            // if user searched something else in the meantime stop
            if (activeQueryRef.current !== q) {
                return;
            }
            
            // only keep movies with a picture
            const validMovies = data.results.filter(function(m) {
                if (m.poster_path) {
                    return true;
                } else {
                    return false;
                }
            });

            setMovies(validMovies);
            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
            setCurrentPage(1);
        } catch (err) {
            // show error if api fails
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    // watch for query changes
    useEffect(function() {
        fetchInitial(submittedQuery);
    }, [submittedQuery, fetchInitial]);

    // load next page when scorlling down
    const fetchMore = useCallback(async function() {
        const nextPage = currentPage + 1;
        
        // stop if no more pages or already loading
        if (nextPage > totalPages || loadingMore || loading) {
            return;
        }
        
        setLoadingMore(true);
        
        try {
            // get next page
            const data = await searchMovies(submittedQuery, nextPage);
            
            setMovies(function(prev) {
                // only keep movies with a picture
                const newMovies = data.results.filter(function(m) {
                    if (m.poster_path) {
                        return true;
                    } else {
                        return false;
                    }
                });
                
                // add to existing list
                return prev.concat(newMovies);
            });
            
            setCurrentPage(nextPage);
        } catch (err) {
            // do not show error if scroll fail
        } finally {
            setLoadingMore(false);
        }
    }, [currentPage, totalPages, loadingMore, loading, submittedQuery]);

    // watch scroll to the bottom of the page
    useEffect(function() {
        if (!sentinelRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            function(entries) {
                // if we hit the bottom, load more
                if (entries[0].isIntersecting) {
                    fetchMore();
                }
            },
            { rootMargin: '200px' }
        );
        
        observer.observe(sentinelRef.current);
        
        return function() {
            observer.disconnect();
        };
    }, [fetchMore]);

    // boolean logic for what to show
    const hasMore = currentPage < totalPages;
    const showGrid = !loading && movies.length > 0;
    const showEmpty = !loading && submittedQuery && movies.length === 0 && !error;
    const showPlaceholder = !loading && !submittedQuery;

    // determine class name
    let pageClass = "search-page";
    if (showGrid || loading) {
        pageClass = "search-page search-page--has-results";
    }

    // create empty boxes for loading skeleton
    const loadingBoxes = [];
    for (let i = 0; i < 20; i++) {
        loadingBoxes.push(
            <div key={i} className="movie-card">
                <div className="movie-poster-container">
                    <div
                        className="movie-posters"
                        style={{
                            background: 'var(--surface-color)',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={pageClass}>
            {/* Header section with search bar */}
            <div className="search-hero">
                <div className="search-header">
                    <FaSearch className="search-header-icon" />
                    <h1 className="search-header-title">Search</h1>
                </div>

                <div className="search-bar-row">
                    <div className="search-bar-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            id="search-input"
                            className="search-input"
                            type="text"
                            placeholder="Search for a movie..."
                            value={query}
                            onChange={function(e) { setQuery(e.target.value); }}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            aria-label="Search movies"
                        />
                        {/* show clear button if typing */}
                        {query && (
                            <button
                                className="search-clear-btn"
                                onClick={handleClear}
                                aria-label="Clear search"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                    
                    <button
                        className="search-submit-btn"
                        onClick={handleSearch}
                        aria-label="Search"
                    >
                        Search
                    </button>
                </div>
            </div>


            {/* show bones when fetching */}
            {loading && (
                <div className="search-grid">
                    {loadingBoxes}
                </div>
            )}

            {/* list all movies found */}
            {showGrid && (
                <div className="search-grid">
                    <div className="search-results-header">
                        <h2 className="search-results-title">Search Results For "{submittedQuery}"</h2>
                        <p className="search-results-count">{totalResults} Results Found</p>
                    </div>
                    
                    {/* regular function map for movies list */}
                    {movies.map(function(movie) {
                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                IMAGE_BASE_URL={IMAGE_BASE_URL}
                            />
                        );
                    })}

                    {/* bottom area to trigger next page load */}
                    {hasMore && (
                        <div className="search-sentinel" ref={sentinelRef}>
                            {loadingMore && (
                                <div className="loader">
                                    <div className="box-load1" />
                                    <div className="box-load2" />
                                    <div className="box-load3" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* show this if no result or error */}
            {(showEmpty || error) && (
                <div className="search-page-center">
                    {showEmpty && (
                        <div className="search-empty">
                            <FaFilm className="search-empty-icon" />
                            <p>No movies found for "{submittedQuery}"</p>
                            <p className="search-empty-sub">Try a different title or check the spelling.</p>
                        </div>
                    )}
                    {error && (
                        <div className="search-empty">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

