import React from "react";
import "../styles/about-lumix.css";

export default function AboutLumix() {

    return (
        <div className="about-page">
            <div className="about-content">
                
                <div className="about-left-column">
                    <h1 className="about-title">About Lumix</h1>
                    
                    <p className="about-description">
                        Lumix is a simple website I made for you to explore, discover, and bookmark your favorite movies and TV series. You can use this site to find trending shows, search for specific titles, and save them for later!
                    </p>

                    <div className="attribution-section">
                        <img 
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
                            alt="TMDb Logo" 
                            className="tmdb-logo" 
                        />
                        <p className="attribution-text">
                            This product uses the TMDb API but is not endorsed or certified by TMDb.
                        </p>
                    </div>
                </div>

                <div className="about-right-column">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    
                    <div className="faq-item">
                        <h3 className="faq-question">How Your Information is Stored:</h3>
                        <p className="faq-answer">
                            I respect your privacy. I do not collect or store any of your personal information on my servers. When you save a movie or show to your bookmarks, it is only saved inside your own internet browser (using Local Storage). This means your bookmarks are completely private, but if you clear your browser history or use a different device, your saved shows will not be there.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-question">Where Do We Get the Movies?</h3>
                        <p className="faq-answer">
                            All the movie and TV show details you see on this website come from The Movie Database (TMDb) API. I use their free service to show you the posters, descriptions, and ratings.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-question">Can I watch movies on Lumix?</h3>
                        <p className="faq-answer">
                            No, Lumix does not host any video content or provide movie streaming. It is strictly a discovery tool designed to help you find and bookmark titles. However, you can watch official trailers on the movie details page!
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-question">Do I need an account to use Lumix?</h3>
                        <p className="faq-answer">
                            No account is required! Because your bookmarks are saved directly inside your browser cache, you can start using all features immediately without having to sign up.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

