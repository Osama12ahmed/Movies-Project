import { createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './components/animations.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Details from './pages/Details'
import DetailsS from './pages/DetailsS'
import MoreMovies from './pages/MoreMovies'
import MoreSeries from './pages/MoreSeries'

export default function App() {

  const router = createHashRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/details/:id', element: <Details /> },
    { path: '/detailsS/:id', element: <DetailsS /> },
    { path: '/moreMovies', element: <MoreMovies /> },
    { path: '/moreSeries', element: <MoreSeries /> },
  ])

  return (
    <RouterProvider router={router} />
  )
}
