import "../components/MoreMovies/moreMovies.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MoreSeries() {
    const [series, setSeries] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const apiKey = "858b91937281e383ce1bc5e87d9b4a8e";
    const [category, setCategory] = useState(
        localStorage.getItem("seriesCategory") || "airing_today"
    );

    const fetchSeries = async (selectedCategory) => {
        try {
            let allSeries = [];

            for (let page = 1; page <= 4; page++) {
                const res = await fetch(
                    `https://api.themoviedb.org/3/tv/${selectedCategory}?api_key=${apiKey}&language=en-US&page=${page}`
                );
                const data = await res.json();
                allSeries = [...allSeries, ...data.results];
            }

            setSeries(allSeries.slice(0, 100));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        localStorage.setItem("seriesCategory", category);
        fetchSeries(category);
    }, [category]);

    return (
        <>
            <div className="filter-bar checkboxes">
                {[
                    { value: "airing_today", label: "Now Playing" },
                    { value: "popular", label: "Popular" },
                    { value: "top_rated", label: "Top Rated" },
                    { value: "on_the_air", label: "Upcoming" },
                ].map((item) => (
                    <label key={item.value} className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            checked={category === item.value}
                            onChange={() => setCategory(item.value)}
                        />
                        <div className="checkmark">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path
                                    d="M20 6L9 17L4 12"
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className="label">{item.label}</span>
                    </label>
                ))}
            </div>

            <div className="moreMovies">
                {series.map((show, index) => {
                    const image = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
                    const isHovered = hoveredIndex === index;
                    const rate = show.vote_average ? show.vote_average.toFixed(1) : "N/A";

                    return (
                        <Link key={show.id} to={`/detailsS/${show.id}`} className="movie-link">
                            <div
                                className="movie hover-lift animate-fade-in"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{position: "relative",overflow: "hidden",}}
                            >
                                {/* الصورة الخلفية */}
                                <div
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        width: "100%",
                                        height: "100%",
                                        transition: "0.3s ease-in-out",
                                        filter: isHovered ? "blur(5px)" : "none",
                                    }}
                                />

                                {/* التدرج */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background: isHovered ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)",
                                        transition: "0.3s ease-in-out",
                                    }}
                                />

                                {/* الكابشن */}
                                <div
                                    className="caption animate-slide-up"
                                    style={{
                                        position: "absolute",
                                        bottom: "20px",
                                        left: "0",
                                        width: "100%",
                                        textAlign: "center",
                                        opacity: isHovered ? 1 : 0,
                                        transition: "0.3s ease-in-out",
                                    }}
                                >
                                    <h3 className="text-reveal">{show.name || show.original_name}</h3>
                                    <p className="text-reveal stagger-1">
                                        Release: {show.first_air_date || "Unknown"}
                                    </p>
                                    <p className="text-reveal stagger-2">⭐ {rate}/10</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
