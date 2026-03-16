import "../styles/movie-cast.css";

// show actor picture and name
export default function ActorCard({ actor, IMAGE_BASE_URL }) {
    // if no photo use placeholder
    let profileImage = "";
    if (actor.profile_path) {
        profileImage = IMAGE_BASE_URL + actor.profile_path;
    } else {
        profileImage = "https://via.placeholder.com/200x300?text=No+Photo";
    }

    return (
        <div className="actor-card">
            <div className="actor-image-container">
                <img
                    className="actor-image"
                    src={profileImage}
                    alt={actor.name}
                    loading="lazy"
                />
            </div>
            <div className="actor-info">
                <h3 className="actor-name">{actor.name}</h3>
                <p className="actor-character">{actor.character}</p>
            </div>
        </div>
    );
}
