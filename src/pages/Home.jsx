import '../components/Home/home.css'
import Bar from '../components/Home/Bar.jsx'
import Info from '../components/Home/Info.jsx'
import MoviesList from '../components/Home/MoviesList.jsx'
import Footer from '../components/Footer/Footer.jsx'

export default function Home() {
    return (
        <>
            <Bar />
            <Info />
            <MoviesList />
            <Footer/>
        </>
    )
}