import { useState, useEffect } from "react";
import FuzzyText from "../Anime";

export default function DetailsSV({ id, apiKey }) {
    const [trailerKey, setTrailerKey] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const [checked, setChecked] = useState(false); // ✅ نعرف امتى الفتش خلص

    useEffect(() => {
        async function fetchTVData() {
            try {
                if (!id) return;

                const videoRes = await fetch(
                    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`
                );
                const videoData = await videoRes.json();

                const trailer =
                    videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube") ||
                    videoData.results.find(v => v.site === "YouTube");

                if (trailer) setTrailerKey(trailer.key);

                setChecked(true);
            } catch (err) {
                console.error("Error fetching TV show info:", err);
                setChecked(true);
            }
        }

        fetchTVData();
    }, [id, apiKey]);

    if (!checked) return null;

    return (
        <div>
            {trailerKey ? (
                <>
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
                                <button className="close-button" onClick={() => setShowVideo(false)}>
                                    ✖
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="fake-player" onClick={() => setShowVideo(true)}>
                        <img
                            style={{
                                height:"500px"
                            }}
                            
                        />
                         <div
                        style={{
                            width: "470px",
                            aspectRatio: "16/9",     
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            position: "absolute",
                            top: "210px",
                            right: "50px",
                            borderRadius: "10px",

                        }}
                    >
                        <div
                            style={{
                                display: "inline-block",
                                position: "absolute",
                                top: "10px"
                            }}
                        >
                            <FuzzyText
                                fontSize="30px"
                                fontWeight={900}
                                color="#ffffffff"
                            >
                                🚫 No trailer available 
                            </FuzzyText>
                        </div>
                    </div>
                        <div className="play">
                            <div className="play-button">▶</div>
                            <h2>Play trailer</h2>
                        </div>
                    </div>
                   
                </>
            )

            }
        </div>

    );
}
