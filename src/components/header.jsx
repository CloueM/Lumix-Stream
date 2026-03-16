import "../styles/header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineStar } from "react-icons/ai";
import { MdMovie, MdBookmark } from "react-icons/md";
import { BiCalendar, BiSearch, BiInfoCircle } from "react-icons/bi";
import { RiMovie2Line } from "react-icons/ri";
import logo from "../assets/lumix-logo.svg";

// top nav bar
export default function Navbar() {
    const navigate = useNavigate();
    // see what page we are in (using useLocation hook)
    const location = useLocation();
    
    // hide or show category menu
    const [showCategoryNav, setShowCategoryNav] = useState(true);
    // remember scroll position
    const [lastScrollY, setLastScrollY] = useState(0);

    // hide category bar when scroll down. show when scroll up
    useEffect(() => {
        function handleScroll() {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // scroll down past 50px hides nav
                setShowCategoryNav(false);
            } else {
                // scroll up then show it
                setShowCategoryNav(true);
            }
            // Update the last scroll position for the next time user scroll
            setLastScrollY(currentScrollY);
        }

        // listen scroll event
        window.addEventListener("scroll", handleScroll);
        // clean up event
        return function() {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    // class name for category button
    function getCategoryClass(path) {
        if (location.pathname === path) {
            return "category-btn active";
        } else {
            return "category-btn";
        }
    }

    // class name for main nav button
    function getNavClass(path) {
        if (location.pathname === path) {
            return "nav-btn active";
        } else {
            return "nav-btn";
        }
    }

    // build class for category bar
    let categoryNavClass = "category-nav glass";
    if (!showCategoryNav) {
        categoryNavClass = "category-nav glass hidden";
    }


    return (
        <>
            {/* The very top bar showing the logo, page title, and about button */}
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="header-left">
                        <a className="logo-btn" onClick={function() { navigate("/"); }}>
                            <img src={logo} alt="Lumix" className="logo-image" />
                        </a>
                    </div>

                    <div className="header-right">
                        <button className="about-btn" onClick={function() { navigate("/about"); }} title="About">
                            <BiInfoCircle />
                        </button>
                    </div>
                </div>
            </div>

            {/* The secondary navigation bar for selecting movie categories */}
            <nav className={categoryNavClass}>
                <button
                    className={getCategoryClass("/now-playing")}
                    onClick={function() { navigate("/now-playing"); }}
                    title="Now Playing"
                >
                    <RiMovie2Line />
                    <span className="nav-label-right">Now Playing</span>
                </button>
                <button
                    className={getCategoryClass("/top-rated")}
                    onClick={function() { navigate("/top-rated"); }}
                    title="Top Rated"
                >
                    <AiOutlineStar />
                    <span className="nav-label-right">Top Rated</span>
                </button>
                <button
                    className={getCategoryClass("/popular")}
                    onClick={function() { navigate("/popular"); }}
                    title="Popular"
                >
                    <MdMovie />
                    <span className="nav-label-right">Popular</span>
                </button>
                <button
                    className={getCategoryClass("/upcoming")}
                    onClick={function() { navigate("/upcoming"); }}
                    title="Upcoming"
                >
                    <BiCalendar />
                    <span className="nav-label-right">Upcoming</span>
                </button>
            </nav>

            {/* The primary bottom-ish navigation bar for main features (Home, Search, Bookmarks) */}
            <header className="header">
                <nav className="header-nav glass">
                    <button
                        className={getNavClass("/")}
                        onClick={function() { navigate("/"); }}
                        title="Home"
                    >
                        <AiOutlineHome />
                        <span className="nav-label-bottom">Home</span>
                    </button>
                    <button
                        className={getNavClass("/search")}
                        onClick={function() { navigate("/search"); }}
                        title="Search"
                    >
                        <BiSearch />
                        <span className="nav-label-bottom">Search</span>
                    </button>
                    <button
                        className={getNavClass("/bookmark")}
                        onClick={function() { navigate("/bookmark"); }}
                        title="Bookmark"
                    >
                        <MdBookmark />
                        <span className="nav-label-bottom">Bookmark</span>
                    </button>
                </nav>
            </header>
        </>
    );
}

