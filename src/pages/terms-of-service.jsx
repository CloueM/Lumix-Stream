import React from "react";
import "../styles/policy.css";

export default function TermsOfService() {
    return (
        <div className="policy-page">
            <div className="policy-content">
                <h1 className="policy-title">Terms of Service</h1>
                
                <p className="policy-date">
                    <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
                </p>

                <h2 className="policy-section-title">1. Acceptance of Terms</h2>
                <p className="policy-text">
                    By accessing and using Lumix, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
                </p>

                <h2 className="policy-section-title">2. Website Purpose</h2>
                <p className="policy-text">
                    Lumix is a free, non-commercial entertainment discovery platform. It is designed to help users search, explore, and bookmark information about movies and television series. Lumix does not host, stream, or distribute any copyrighted video content.
                </p>

                <h2 className="policy-section-title">3. Third-Party Content</h2>
                <p className="policy-text">
                    All movie data, images, and trailers displayed on Lumix are provided by The Movie Database (TMDb) API. Lumix uses the TMDb API but is not endorsed or certified by TMDb. I am not responsible for the accuracy, legality, or content of the data provided by TMDb.
                </p>

                <h2 className="policy-section-title">4. User Responsibility</h2>
                <p className="policy-text">
                    You agree to use Lumix only for lawful purposes. You are solely responsible for maintaining the privacy of your device where your bookmarks are locally stored.
                </p>

                <h2 className="policy-section-title">5. Disclaimer of Warranties</h2>
                <p className="policy-text">
                    Lumix is provided on an "as is" and "as available" basis without any warranties of any kind. I do not guarantee that the site will always be available, secure, or free from errors.
                </p>

                 <h2 className="policy-section-title">6. Changes to Terms</h2>
                <p className="policy-text">
                    I reserve the right to modify these terms at any time. Your continued use of Lumix after any changes indicates your acceptance of the new Terms of Service.
                </p>
            </div>
        </div>
    );
}
