import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchOverlay({ onClose }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [category, setCategory] = useState('movies') // ✅ الافتراضي أفلام
    const navigate = useNavigate()

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([])
            return
        }

        const timer = setTimeout(async () => {
            try {
                let allResults = []
                let currentPage = 1
                let totalPages = 1

                const blockedWords = ['sex', 'nude', 'erotic', 'xxx', 'porn']

                while (currentPage <= totalPages && currentPage <= 5) {
                    const endpoint = category === 'movies' ? 'movie' : 'tv'

                    const res = await fetch(
                        `https://api.themoviedb.org/3/search/${endpoint}?query=${searchQuery}&api_key=858b91937281e383ce1bc5e87d9b4a8e&page=${currentPage}`
                    )

                    const data = await res.json()

                    if (currentPage === 1) {
                        totalPages = data.total_pages
                    }

                    const filteredResults = (data.results || []).filter(item => {
                        const title = (item.title || item.name || '').toLowerCase()
                        const isBlocked = blockedWords.some(word => title.includes(word))
                        return !isBlocked && title.startsWith(searchQuery.toLowerCase())
                    })

                    allResults = [...allResults, ...filteredResults]
                    currentPage++
                }

                setSearchResults(allResults)
            } catch (err) {
                console.error("Search Error:", err)
                setSearchResults([])
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [searchQuery, category]) // ✅ نراقب كمان category

    return (
        <>
                <div className="search-overlay">
                                <div className="search-container">

                    <input
                        autoFocus
                        type="text"
                        placeholder={`Search ${category === 'movies' ? 'movies' : 'series'}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <div className="filter-bar checkSearch checkboxes">
                        {[
                            { value: "movies", label: "Movies" },
                            { value: "tv", label: "Series" }, // ✅ استخدم "tv" في API للمسلسلات
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
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <span className="label">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <button onClick={onClose} className="close-search">✖</button>

                <div className="search-results">
                    {searchResults.map((item) => (
                        <div
                            key={item.id}
                            className="search-result"
                            onClick={() => {
                                const path = category === 'tv' ? `/detailsS/${item.id}` : `/details/${item.id}`
                                navigate(path)
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={item.poster_path
                                    ? `https://image.tmdb.org/t/p/w185/${item.poster_path}`
                                    : 'https://via.placeholder.com/50x75?text=N/A'}
                                alt={item.title || item.name}
                                className="movie-posters"
                            />
                            <span>{item.title || item.name}</span>
                        </div>
                    ))}

                    {searchQuery.trim() !== '' && searchResults.length === 0 && (
                        <div className="no-results">No {category === 'movies' ? 'movies' : 'series'} found.</div>
                    )}
                </div>
            </div>
        </>
    )
}
