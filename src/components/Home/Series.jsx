import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Series({ title, classifications, image }) {
    const [hovered, setHovered] = useState(false)
    const navigate = useNavigate()

    function handleChange() {
        navigate(`/detailsS/${title}`)
    }

    return (
        <>
            <div
                className="movie hover-lift animate-fade-in"
                style={{
                    backgroundImage: hovered
                        ? `linear-gradient(to top, rgba(0, 0, 0, 0.76) 20%, rgba(0, 0, 0, 0.308)), url(${image})`
                        : `linear-gradient(to top, rgba(0, 0, 0, 0.473), rgba(0, 0, 0, 0)), url(${image})`
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="caption animate-slide-up">
                    <h3 className="text-reveal">{title}</h3>
                    <p className="text-reveal stagger-1">{classifications}</p>
                    <button onClick={handleChange} className="btn-press animate-bounce">More info</button>
                </div>
            </div>
        </>
    )
}