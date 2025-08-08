import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {

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

    return (
        <div className="signup-container">

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
                <Link className="homeLink" to='/'>Complete as a visitor</Link>
            </form>
        </div>
    )
}