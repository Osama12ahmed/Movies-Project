import { useState, useEffect } from "react";

export default function DetailsV({ title, apiKey }) {
    const [trailerKey, setTrailerKey] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const [movieInfo, setMovieInfo] = useState({
        director: "",
        writers: [],
        stars: [],
        rate: null,
        genres: [],
        releaseDate: ""

    });

    useEffect(() => {
        async function fetchMovieData() {
            try {
                // Step 1: Get Movie ID
                const searchRes = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`
                );
                const searchData = await searchRes.json();
                const movieId = searchData.results[0]?.id;
                if (!movieId) return;

                // Step 2: Fetch all in parallel
                const [videoRes, creditsRes, detailsRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`),
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`),
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
                ]);

                const videoData = await videoRes.json();
                const creditsData = await creditsRes.json();
                const detailsData = await detailsRes.json();

                // Trailer key
                const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
                if (trailer) setTrailerKey(trailer.key);

                // Info
                const director = creditsData.crew.find(p => p.job === "Director")?.name || "Unknown";
                const writers = creditsData.crew
                    .filter(p => p.job === "Writer" || p.job === "Screenplay")
                    .map(p => p.name);
                const stars = creditsData.cast.slice(0, 3).map(p => p.name);

                const rate = detailsData.vote_average?.toFixed(1) || "N/A";
                const genres = detailsData.genres?.map(g => g.name) || [];
                const releaseDate = detailsData.release_date || "Unknown";

                setMovieInfo({ director, writers, stars, rate, genres, releaseDate });
            } catch (err) {
                console.error("Error fetching movie info:", err);
            }
        }

        fetchMovieData();
    }, [title, apiKey]);


    if (!trailerKey) return null;

    return (
        <div className="custom-video-container">
            <div className="detailInfo">
                <p>Rate : <span>{movieInfo.rate}/10</span></p>
                <p>Genres : <span>{movieInfo.genres.join(", ")}</span></p>
                <p>Release Date : <span>{movieInfo.releaseDate}</span></p>
                <p>Director : <span>{movieInfo.director}</span></p>
                <p>Writers : <span>{movieInfo.writers.join(", ")}</span></p>
                <p>Stars : <span>{movieInfo.stars.join(", ")}</span></p>
            </div>
            <div className="fake-player" onClick={() => setShowVideo(true)}>
                <img
                    src={`https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`}
                    alt="Video thumbnail"
                />
                <div className="play">
                    <div className="play-button">▶</div>
                    <h2>Play trailer</h2>
                </div>
            </div>

            {showVideo && (
                <div className="video-modal">
                    <div className="video-content">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                        <button className="close-button" onClick={() => setShowVideo(false)}>✖</button>
                    </div>
                </div>
            )}
        </div>
    );
}
