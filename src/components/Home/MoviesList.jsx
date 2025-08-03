import "./movies.css"
import Movie from "./Movie.jsx"
import { MOVIES } from "./info.js"
import { SERIES } from "./series.js"
import { useRef } from "react"
import Series from "./Series.jsx"

export default function MoviesList() {

    const containerRef1 = useRef(null)
    const containerRef2 = useRef(null)

    const scrollLeft = () => {
        containerRef1.current.scrollBy({ left: -600, behavior: 'smooth' })
    }
    const scrollLefts = () => {
        containerRef2.current.scrollBy({ left: -600, behavior: 'smooth' })
    }

    const scrollRight = () => {
        containerRef1.current.scrollBy({ left: 600, behavior: 'smooth' })
    }
    const scrollRights = () => {
        containerRef2.current.scrollBy({ left: 600, behavior: 'smooth' })
    }

    return (
        <>
            <h1 className="header animate-fade-in"> <span className="first">M</span>ovi<span className="last">es</span></h1>
            <div className="movies-wrapper">
                <button className="btn-left scroll-btn hover-glow" onClick={scrollLeft}>⟨</button>
                <div className="movies-container animate-slide-up" ref={containerRef1}>

                    <Movie {...MOVIES[0]} />
                    <Movie {...MOVIES[1]} />
                    <Movie {...MOVIES[2]} />
                    <Movie {...MOVIES[3]} />
                    <Movie {...MOVIES[4]} />
                    <Movie {...MOVIES[5]} />
                    <Movie {...MOVIES[6]} />
                    <Movie {...MOVIES[7]} />
                    <Movie {...MOVIES[8]} />
                    <Movie {...MOVIES[9]} />
                    <Movie {...MOVIES[10]} />
                    <Movie {...MOVIES[11]} />
                    <Movie {...MOVIES[12]} />

                </div>
                <button className="btn-right scroll-btn hover-glow" onClick={scrollRight}>⟩</button>
            </div>
            <h1 className="header animate-fade-in"> <span className="first">S</span>eri<span className="last">es</span></h1>
            <div className="movies-wrapper">
                <button className="btn-left scroll-btn hover-glow" onClick={scrollLefts}>⟨</button>
                <div className="movies-container animate-slide-up" ref={containerRef2}>

                    <Series {...SERIES[0]} />
                    <Series {...SERIES[1]} />
                    <Series {...SERIES[2]} />
                    <Series {...SERIES[3]} />
                    <Series {...SERIES[4]} />
                    <Series {...SERIES[5]} />
                    <Series {...SERIES[6]} />
                    <Series {...SERIES[7]} />
                    <Series {...SERIES[8]} />
                    <Series {...SERIES[9]} />
                    <Series {...SERIES[10]} />
                    <Series {...SERIES[11]} />
                    <Series {...SERIES[12]} />
                    <Series {...SERIES[13]} />
                    <Series {...SERIES[14]} />

                </div>
                <button className="btn-right scroll-btn hover-glow" onClick={scrollRights}>⟩</button>
            </div>
        </>
    )
}