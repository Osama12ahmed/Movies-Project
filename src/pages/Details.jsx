import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import star from "../pages/pngwing.com (4).png";
import '../components/Details/details.css';
import DetailV from "../components/Details/DetailsV";
import Actors from "../components/Details/Actors";
import Footer from "../components/Footer/Footer"
import LoadingSpinner from "../components/LoadingSpinner";

export default function Details() {
    const { title } = useParams();
    const apiKey = "858b91937281e383ce1bc5e87d9b4a8e";
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState("");
    const [rating, setRating] = useState("");
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchMovie = async () => {
        try {
            const searchRes = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`
            );
            const searchData = await searchRes.json();
            const movieId = searchData.results[0]?.id;
            if (!movieId) {
                setLoading(false);
                return;
            }

            const detailsRes = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
            );
            const movieDetails = await detailsRes.json();

            const creditsRes = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
            );
            const creditsData = await creditsRes.json();

            setMovie(movieDetails);
            setGenres(movieDetails.genres.map((g) => g.name).join(", "));
            setRating(movieDetails.vote_average?.toFixed(1));
            setCast(creditsData.cast.slice(0, 20));
            
            // End loading when all data is fetched
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            setLoading(false);
        }
    };

    fetchMovie();
}, [title]);

    if (loading) return <LoadingSpinner />;

    if (!movie) return <div className="loading">Movie not found</div>;

    const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const year = movie.release_date?.split("-")[0];
    const overview = movie.overview;

    return (
        <>
            <div
                className="back animate-fade-in"
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.37), rgba(0, 0, 0, 0.747)),url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '115vh',
                }}
            >
                <div className="home-button-container animate-slide-down">
                    <Link to="/" className="home-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Home</span>
                    </Link>
                </div>
                
                <div className="detail-container animate-slide-up">
                    <img src={image} alt={movie.title} className="movie-poster animate-scale-in" />
                    <div className="info animate-slide-left">
                        <h1 className='title'>{movie.title}</h1>
                        <div className="rate">
                            <p className='yearNum'>Year : {year} </p>
                            <p className='rateNum'>Rate : {rating}</p>
                            <img src={star} alt="" className='star animate-pulse' />
                        </div>
                        <h2 className='genres'>Genres</h2>
                        <p className='classification'>{genres}</p>
                        <div className="storyy">
                            <h1>Story</h1>
                            <p>{overview}</p>
                        </div>
                    </div>
                </div>
            </div>
            <DetailV title={title} apiKey={apiKey} movie={movie}/>
            <Actors cast={cast} />
            <Footer/>
        </>
    );
}
