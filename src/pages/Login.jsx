import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    })
    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    })

    function handleChangeInput(indentifer, value) {
        setInputValues(prevValue => ({
            ...prevValue,
            [indentifer]: value
        }))
    }

    const emailIsInvalid = didEdit.email && !inputValues.email.includes('@')
    const passwordIsInvalid = didEdit.password && inputValues.password.length < 6

    function handleInputBlur(indentifer) {
        setDidEdit(prevValue => ({
            ...prevValue,
            [indentifer]: true
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(inputValues)
    }

    const navigate = useNavigate()

    function handleNavigationSignup() {
        navigate('/signup')
    }

    return (
        <div className="login-container">
            <div className="left">
                <h1>Welcome <span>Back</span></h1>
                <p> Your ultimate gateway to the world of movies.
                    Discover thousands of titles across every genre, old and new.
                    Dive into your favorite stories or find something completely fresh.
                    Sit back, relax, and enjoy endless entertainment anytime, anywhere.</p>
            </div>
            <form onSubmit={handleSubmit} className="right">
                <h1>Login</h1>
                <div className="email-input">
                    <label htmlFor="">Email</label>
                    <input type="email" onBlur={() => handleInputBlur('email')} placeholder="Email" onChange={(event) => handleChangeInput('email', event.target.value)} value={inputValues.email} />
                    {emailIsInvalid ?  <p className="error">Pleas enter a valid email address</p> : ''}

                </div>
                <div className="password-input">
                    <label htmlFor="">Password</label>
                    <input type="password" onBlur={() => handleInputBlur('password')}  onChange={(event) => handleChangeInput('password', event.target.value)} value={inputValues.password} />
                    {passwordIsInvalid && <p className="error">Pleas make your password more than 6 characters </p>}
                </div>
                <div className="btn">
                    <button className="login-btn">Login</button>
                    <button onClick={handleNavigationSignup} className="sginup-btn">Sgin up</button>
                </div>
            </form>
        </div>
    )
}