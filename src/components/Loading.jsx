import '../styles/loading.css';

// display animated loading screen
export default function Loading() {
    return (
        // Main container to center the loading animation on the page
        <div className="loading-container">
            <div className="loader">
                {/* Individual boxes that create the loading animation effect */}
                <div className="box-load1"></div>
                <div className="box-load2"></div>
                <div className="box-load3"></div>
            </div>
        </div>
    );
}
