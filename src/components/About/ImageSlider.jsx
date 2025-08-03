import threeBodyProblem from "./aboutImage/3-body-problem-65ff01da6d02d.jpg";
import nineteenEightyNine from "./aboutImage/1899-63787998d7740.jpg";
import adolescence from "./aboutImage/adolescence-67e8278a77aef.jpg";
import avatar3 from "./aboutImage/avatar-3-665b49c51454c.jpg";
import ballerina from "./aboutImage/ballerina-6857c153bd6e4.jpg";
import beetlejuice from "./aboutImage/beetlejuice-beetlejuice-669ee5b149e43.jpg";
import furiosa from "./aboutImage/furiosa-a-mad-max-saga-6690ba3c4e2d5.jpg";
import insideOut2 from "./aboutImage/inside-out-2-66cd0d4bea115.jpg";
import joker2 from "./aboutImage/joker-folie--deux-66c532c201487.jpg";
import kingdomApes from "./aboutImage/kingdom-of-the-planet-of-the-apes-6690c3d2e49ab.jpg";
import mickey17 from "./aboutImage/mickey-17-6817af93e1baa.jpg";
import reacher from "./aboutImage/reacher-61fcec9b94a3a.jpg";
import squidGame from "./aboutImage/squid-game-6185b743943c8.jpg";
import theBoys from "./aboutImage/the-boys-5d42fbeed1d0f.jpg";
import theEternaut from "./aboutImage/the-eternaut-6824cc10512d7.jpg";
import thunderbolts from "./aboutImage/thunderbolts-683aba934403f.jpg";

export default function ImageSlider() {
    // كل الصور
    const allImages = [
        threeBodyProblem,
        nineteenEightyNine,
        adolescence,
        avatar3,
        ballerina,
        beetlejuice,
        furiosa,
        insideOut2,
        joker2,
        kingdomApes,
        mickey17,
        reacher,
        squidGame,
        theBoys,
        theEternaut,
        thunderbolts
    ];

    // قسمهم نصين
    const mid = Math.ceil(allImages.length / 2);
    const topImages = allImages.slice(0, mid);
    const bottomImages = allImages.slice(mid);

    return (
        <>
            <div className="slider-wrapper">
                <div className="slider-container slow">
                    <div className="slider-track">
                        {[...topImages, ...topImages].map((src, index) => (
                            <img src={src} alt={`slide-top-${index}`} key={`top-${index}`} className="slide" />
                        ))}
                    </div>
                </div>

                <div className="slider-container fast">
                    <div className="slider-track">
                        {[...bottomImages, ...bottomImages].map((src, index) => (
                            <img src={src} alt={`slide-bottom-${index}`} key={`bottom-${index}`} className="slide2" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="about-container">
                <h1>Your Gateway to the World of Movies</h1>   
                <p>We created this platform to bring all movie lovers closer to the magic of cinema by offering accurate, up-to-date, and detailed information about movies from around the world</p>     
            </div>
            <div className="mission">
                <h1>What We Do?</h1>
                <ol>
                    <li> Detailed movie information: cast, crew, synopsis, trailers, posters, and more.</li>
                    <li> Ratings and reviews: see what audiences and critics think.</li>    
                    <li> Latest releases: stay updated with new and upcoming movies.</li>    
                    <li> Easy search: find your favorite movies in seconds.</li>    
                </ol>
            </div>
        </>
    );
}
