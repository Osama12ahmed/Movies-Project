import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import star from "../pages/pngwing.com (4).png";
import '../components/Details/details.css';
import DetailsSV from "../components/Details/DetailsSV";
import Actors from "../components/Details/Actors";
import Footer from "../components/Footer/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import Bar from "../components/Home/Bar";

export default function DetailsS() {
  const { id } = useParams();
  const apiKey = "858b91937281e383ce1bc5e87d9b4a8e";

  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState({
    creators: [],
    stars: [],
    rate: null,
    genres: [],
    firstAirDate: "",
    lastAirDate: ""
  });

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const [detailsRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${apiKey}`)
        ]);

        const detailsData = await detailsRes.json();
        const creditsData = await creditsRes.json();

        setShow(detailsData);
        setCast(creditsData.cast.slice(0, 20));

        const creators = detailsData.created_by?.map((c) => c.name) || [];
        const stars = creditsData.cast.slice(0, 3).map((p) => p.name);
        const rate = detailsData.vote_average?.toFixed(1) || "N/A";
        const genres = detailsData.genres?.map((g) => g.name) || [];
        const firstAirDate = detailsData.first_air_date || "Unknown";
        const lastAirDate = detailsData.last_air_date || "Ongoing/Unknown";

        setShowInfo({ creators, stars, rate, genres, firstAirDate, lastAirDate });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!show) return <div className="loading">TV Show not found</div>;

  const image = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
  const overview = show.overview;

  return (
    <>
    <Bar/>
      <div
        className="back animate-fade-in"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.37), rgba(0, 0, 0, 0.747)),url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
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
          <img src={image} alt={show.name} className="movie-poster animate-scale-in" />
          <div className="info animate-slide-left">
            <h1 className='title'>{show.name}</h1>
            <div className="rate">
              <p className='yearNum'>First Air : {showInfo.firstAirDate} </p>
              <p className='rateNum'>Rate : {showInfo.rate}</p>
              <img src={star} alt="" className='star animate-pulse' />
            </div>
            <h2 className='genres'>Genres</h2>
            <p className='classification'>{showInfo.genres.join(", ")}</p>
            <div className="storyy">
              <h1>Story</h1>
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-video-container">
        <div className="detailInfo">
          <p>Rate : <span>{showInfo.rate}/10</span></p>
          <p>Genres : <span>{showInfo.genres.join(", ")}</span></p>
          <p>First Air : <span>{showInfo.firstAirDate}</span></p>
          <p>Last Air : <span>{showInfo.lastAirDate}</span></p>
          <p>Creators : <span>{showInfo.creators.join(", ") || "Unknown"}</span></p>
          <p>Stars : <span>{showInfo.stars.join(", ")}</span></p>
        </div>

      <DetailsSV id={id} apiKey={apiKey} movie={show}/>
      </div>

      <Actors cast={cast} />
      <Footer/>
    </>
  );
}
