import './movies.css'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Movie from './Movie.jsx'
import Series from './Series.jsx'

export default function MoviesList() {
    const containerRef1 = useRef(null)
    const containerRef2 = useRef(null)
    const navigatem = useNavigate()
    const navigates = useNavigate()

    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const apiKey = '858b91937281e383ce1bc5e87d9b4a8e'

    // جلب الأفلام الجديدة (Now Playing)
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
                )
                const data = await res.json()

                const mapped = data.results.map((movie) => ({
                    id: movie.id,
                    title: movie.title,
                    classifications: `Rating: ${movie.vote_average.toFixed(1)}`,
                    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }))

                setMovies(mapped.slice(0, 10)) // نعرض أول 15 فيلم
            } catch (err) {
                console.error(err)
            }
        }

        const fetchSeries = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
                )
                const data = await res.json()

                const mapped = data.results.map((tv) => ({
                    id: tv.id,
                    title: tv.name,
                    classifications: `Rating: ${tv.vote_average.toFixed(1)}`,
                    image: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
                }))

                setSeries(mapped.slice(0, 10)) // نعرض أول 15 مسلسل
            } catch (err) {
                console.error(err)
            }
        }

        fetchMovies()
        fetchSeries()
    }, [])

    function handleChangeM() {
        navigatem(`/moreMovies`)
    }

    function handleChangeS() {
        navigates(`/moreSeries`)
    }

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
            <h1 className="header animate-fade-in">
                <span className="first">M</span>ovi<span className="last">es</span>
            </h1>
            <div className="movies-wrapper">
                <button className="btn-left scroll-btn hover-glow" onClick={scrollLeft}>
                    ⟨
                </button>

                <div className="movies-container animate-slide-up" ref={containerRef1}>
                    {movies.map((movie) => (
                        <Movie key={movie.id} {...movie} />
                    ))}

                    <button onClick={handleChangeM} className="more">
                        More Movies
                    </button>
                </div>

                <button className="btn-right scroll-btn hover-glow" onClick={scrollRight}>
                    ⟩
                </button>
            </div>

            {/* Series Section */}
            <h1 className="header animate-fade-in">
                <span className="first">S</span>eri<span className="last">es</span>
            </h1>
            <div className="movies-wrapper">
                <button className="btn-left scroll-btn hover-glow" onClick={scrollLefts}>
                    ⟨
                </button>

                <div className="movies-container animate-slide-up" ref={containerRef2}>
                    {series.map((tv) => (
                        <Series key={tv.id} {...tv} />
                    ))}

                    <button onClick={handleChangeS} className="more">
                        More Series
                    </button>

                </div>

                <button className="btn-right scroll-btn hover-glow" onClick={scrollRights}>
                    ⟩
                </button>
            </div>
        </>
    )
}
