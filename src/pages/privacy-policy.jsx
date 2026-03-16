import React from "react";
import "../styles/policy.css";

export default function PrivacyPolicy() {
    return (
        <div className="policy-page">
            <div className="policy-content">
                <h1 className="policy-title">Privacy Policy</h1>
                
                <p className="policy-date">
                    <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
                </p>

                <h2 className="policy-section-title">1. Information Collection and Storage</h2>
                <p className="policy-text">
                    Lumix is designed to respect your privacy. This website does not require an account, does not use tracking cookies, and does not collect, store, or transmit any of your personal data to my servers.
                </p>
                <p className="policy-text">
                    When you use the bookmarking feature, your saved movies and TV shows are stored locally within your own internet browser using a standard web technology called "Local Storage". This means your data remains entirely on your device and is not accessible by me.
                </p>

                <h2 className="policy-section-title">2. Third-Party Services</h2>
                <p className="policy-text">
                    Lumix uses The Movie Database (TMDb) API to display movie posters, descriptions, ratings, and related media. By using Lumix, you are interacting with TMDb's services to retrieve this generalized data. Please note that TMDb may have its own privacy policies regarding API requests.
                </p>

                <h2 className="policy-section-title">3. Data Deletion</h2>
                <p className="policy-text">
                    Because your bookmarks are stored solely on your device, you have complete control over this data. You can delete your bookmarks at any time by clearing your browser's local cache or history.
                </p>

                <h2 className="policy-section-title">4. Changes to this Policy</h2>
                <p className="policy-text">
                    I may occasionally update this Privacy Policy. Any changes will be posted on this page with an updated revision date.
                </p>
            </div>
        </div>
    );
}
