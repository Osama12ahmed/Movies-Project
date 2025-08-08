import './movies.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Movie({ id, title, classifications, image }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  function handleChange() {
    navigate(`/details/${id}`)
  }

  return (

    <Link to={`/details/${id}`}>
      <div
        className="movie hover-lift animate-fade-in"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            transition: "0.3s ease-in-out",
            filter: hovered ? "blur(5px)" : "none",
          }}
        />

        <div
          className="caption animate-slide-up"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: hovered
              ? "rgba(0,0,0,0.4)"
              : "rgba(0,0,0,0)",
            transition: "0.3s ease-in-out",
          }}
        >
          <h3 className="text-reveal">{title}</h3>
          <p className="text-reveal stagger-1">{classifications}</p>
          <button onClick={handleChange} className="btn-press animate-bounce">
            More info
          </button>
        </div>
      </div>

    </Link>

  )
}
