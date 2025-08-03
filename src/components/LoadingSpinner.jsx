import './LoadingSpinner.css'

export default function LoadingSpinner() {
    return (
        <div className="loading-container">
            <div className="spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-text">Loading...</div>
            </div>
        </div>
    )
} 