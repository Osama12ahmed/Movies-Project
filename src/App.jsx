import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './components/animations.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Details from './pages/Details'
import DetailsS from './pages/DetailsS'

export default function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/details/:title', element: <Details /> },
    { path: '/detailsS/:title', element: <DetailsS /> }
  ])

  return (
    <RouterProvider router={router} />
  )
}
