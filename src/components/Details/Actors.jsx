import { useState, useRef } from "react";

export default function Actors({ cast }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const containerRef1 = useRef(null);

    const scrollLeft = () => {
        containerRef1.current.scrollBy({ left: -600, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef1.current.scrollBy({ left: 600, behavior: 'smooth' });
    };

    return (
        <>
            <h1 className="header new">
                <span className="first">C</span>as<span className="last">t</span>
            </h1>

            <div className="movies-wrapper">
                <button className="btn-left scroll-btn" onClick={scrollLeft}>⟨</button>
                <div className="movies-container" ref={containerRef1}>
                    {cast.map((actor, index) => (
                        <div
                            key={index}
                            className="movie"
                            style={{
                                backgroundImage: hoveredIndex === index
                                    ? `linear-gradient(to top, rgba(0, 0, 0, 0.76) 20%, rgba(0, 0, 0, 0)),url(https://image.tmdb.org/t/p/w185${actor.profile_path})`
                                    : `linear-gradient(to top, rgba(0, 0, 0, 0.473) 20%, rgba(0, 0, 0, 0)),url(https://image.tmdb.org/t/p/w185${actor.profile_path})`
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >

                            <h2 className="acName">{actor.name}</h2>
                        </div>
                    ))}
                </div>
                <button className="btn-right scroll-btn" onClick={scrollRight}>⟩</button>
            </div>
        </>
    );
}
