import Bar from '../components/Home/Bar'
import ImageSlider from '../components/About/ImageSlider'
import '../components/About/about.css'
import Footer from '../components/Footer/Footer'

export default function About() {
    return (
        <>
            <Bar />
            <h1 className='welcome'>We are here to entertain the world, <br />Where every movie finds its audience</h1>
            <ImageSlider/>
            <Footer/>
        </>
    )
}