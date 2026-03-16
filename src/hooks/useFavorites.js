import { useState, useEffect } from "react";

const STORAGE_KEY = "lumix_favorites";

// hook to save favorite movie in local storage
export function useFavorites() {
    // try to get favorites from local storage first
    const [favorites, setFavorites] = useState(function() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    });

    // Sync favorites across components
    useEffect(function() {
        function handleStorageChange(e) {
            if (e && e.type === "storage" && e.key !== STORAGE_KEY) return;
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    setFavorites(JSON.parse(stored));
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                setFavorites([]);
            }
        }

        // Listen to native storage events (from other tabs)
        window.addEventListener("storage", handleStorageChange);
        // Listen to our custom event (from the same tab)
        window.addEventListener("lumix-favorites-updated", handleStorageChange);

        return function() {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("lumix-favorites-updated", handleStorageChange);
        };
    }, []);

    // helper to update both local state, local storage, and notify other components
    function updateFavorites(newList) {
        setFavorites(newList);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
            window.dispatchEvent(new Event("lumix-favorites-updated"));
        } catch (error) {
            console.warn("useFavorites: could not write to localStorage");
        }
    }

    // return true if movie is in list
    function isFavorite(id) {
        let found = false;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === id) {
                found = true;
                break;
            }
        }
        return found;
    }

    // add or remove movie from list
    function toggleFavorite(movie) {
        // ALWAY read the latest list from storage first to avoid overwriting from stale closures
        let currentList = [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                currentList = JSON.parse(stored);
            }
        } catch (e) {
            currentList = [];
        }

        // check if movie already inside
        let isInside = false;
        for (let i = 0; i < currentList.length; i++) {
            if (currentList[i].id === movie.id) {
                isInside = true;
                break;
            }
        }
        
        if (isInside) {
            // remove if inside
            const newList = [];
            for (let i = 0; i < currentList.length; i++) {
                if (currentList[i].id !== movie.id) {
                    newList.push(currentList[i]);
                }
            }
            updateFavorites(newList);
        } else {
            // add if not inside
            const newList = [];
            for (let i = 0; i < currentList.length; i++) {
                newList.push(currentList[i]);
            }
            newList.push(movie);
            updateFavorites(newList);
        }
    }

    // delete all from list
    function clearFavorites() {
        updateFavorites([]);
    }

    return { favorites, isFavorite, toggleFavorite, clearFavorites };
}

