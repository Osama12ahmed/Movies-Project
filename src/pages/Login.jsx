import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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
            <form onSubmit={handleSubmit} className="right">
                <h1>Login</h1>
                <div className="email-input">
                    <input type="email" onBlur={() => handleInputBlur('email')} placeholder="Email" onChange={(event) => handleChangeInput('email', event.target.value)} value={inputValues.email} />
                    {emailIsInvalid ?  <p className="error">Pleas enter a valid email address</p> : ''}
                </div>
                <div className="password-input">
                    <input type="password" placeholder="Password" onBlur={() => handleInputBlur('password')}  onChange={(event) => handleChangeInput('password', event.target.value)} value={inputValues.password} />
                    {passwordIsInvalid && <p className="error">Pleas make your password more than 6 characters </p>}
                </div>
                <div className="btn">
                    <button className="login-btn">Login</button>
                    <button onClick={handleNavigationSignup} className="sginup-btn">Sgin up</button>
                </div>
                <Link className="homeLink" to='/'>Complete as a visitor</Link>
            </form>
        </div>
    )
}