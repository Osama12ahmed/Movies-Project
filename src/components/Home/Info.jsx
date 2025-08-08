import { useEffect, useState } from "react";
import LoadingSpinner from '../LoadingSpinner'

export default function Info() {
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState(0);
  const [fade, setFade] = useState(false);
  const apiKey = "858b91937281e383ce1bc5e87d9b4a8e";

  // إندكسات الأفلام اللي عايز تعرضها
  const selectedIndexes = [2, 4, 6, 8, 13, 15, 17];

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await res.json();

        // ناخد بس الإندكسات المطلوبة
        const filteredMovies = selectedIndexes
          .map((i) => data.results[i])
          .filter(Boolean); // عشان لو الإندكس مش موجود

        setMovies(filteredMovies);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCount((prev) => (prev + 1) % movies.length);
        setFade(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return <LoadingSpinner/>;

  const movie = movies[count];
  const image = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="info-container">
      <div
        className={`info-right ${fade ? "fade-out" : ""}`}
        style={{
          backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 0.82) 10%, rgba(0, 0, 0, 0)),url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}
