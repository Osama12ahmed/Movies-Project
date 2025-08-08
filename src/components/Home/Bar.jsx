import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SearchOverlay from '../Search/SearchOverlay'
import search from './search (1).png'

export default function Bar() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleNavigationLogin() {
    navigate('/login')
    setIsMobileMenuOpen(false)
  }

  function handleNavigationSignup() {
    navigate('/signup')
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <h2>Cine<span>Peek</span></h2>
          </div>

          <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <NavLink to='/' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to='/about' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
            <NavLink to='/contact' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</NavLink>
          </div>
          <button className="nav-btn search-icon" onClick={handleSearchToggle}><img className='searchIcon' src={search} alt="" /></button>
          <div className="nav-buttons">
            <button className="nav-btn login-btn" onClick={handleNavigationLogin}>Login</button>
            <button className="nav-btn signup-btn" onClick={handleNavigationSignup}>Sign Up</button>
          </div>

          <div className="hamburger" onClick={toggleMobileMenu}>
            <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
          </div>
        </div>
      </nav>

      {/* ✅ استخدم مكون السيرش */}
      {isSearchOpen && <SearchOverlay onClose={handleSearchToggle} />}
    </>
  )
}
