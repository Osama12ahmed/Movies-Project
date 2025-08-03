import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const [name, setName] = useState({
        first: 'Unkown',
        last: ''
    })
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

    const navigate = useNavigate()

    function handleNavigationLogin() {
        navigate('/login')
    }

    const emailIsInvalid = didEdit.email && !inputValues.email.includes('@')
    const passwordIsInvalid = didEdit.password && inputValues.password.length < 6

    function handleInputBlur(indentifer) {
        setDidEdit(prevValue => ({
            ...prevValue,
            [indentifer]: true
        }))
    }

    function handleChangeName(indentifer, value) {
        setName(prevName => ({
            ...prevName,
            [indentifer]: value
        }))
    }

    return (
        <div className="signup-container">
            <div className="left">
                <h1>Welcome <span>{name.first} {name.last}</span></h1>
                <p> Your ultimate gateway to the world of movies.
                    Discover thousands of titles across every genre, old and new.
                    Dive into your favorite stories or find something completely fresh.
                    Sit back, relax, and enjoy endless entertainment anytime, anywhere.</p>
            </div>
            <form className="right">
                <h1>Sign Up</h1>
                <div className="user-info">
                    <input type="text" placeholder="First name" onChange={(event) => handleChangeName('first', event.target.value)} />
                    <input type="text" placeholder="Last name" onChange={(event) => handleChangeName('last', event.target.value)} />
                </div>
                <div className="email-input">
                    <input type="email" placeholder="Email" onBlur={() => handleInputBlur('email')} onChange={(event) => handleChangeInput('email', event.target.value)} value={inputValues.email} />
                    {emailIsInvalid ? <p className="error">Pleace enter a valid email address</p> : ''}
                </div>
                <div className="password-input">
                    <input type="password" placeholder="Password" onBlur={() => handleInputBlur('password')} onChange={(event) => handleChangeInput('password', event.target.value)} value={inputValues.password} />
                    {passwordIsInvalid && <p className="error">Pleace make your password more than 6 characters </p>}<br /><br />
                    <input type="password" placeholder="Ensure Password" />
                </div>
                <div className="btn">
                    <button onClick={handleNavigationLogin} className="login-btn">Login</button>
                    <button type="submit" className="sginup-btn">Sgin up</button>
                </div>
            </form>
        </div>
    )
}