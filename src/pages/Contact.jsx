import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Bar from '../components/Home/Bar'
import Footer from '../components/Footer/Footer'
import './contact.css'
import location from './placeholder.png'
import call from './call.png'
import hours from './24-hours.png'
import email from './email.png'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [didEdit, setDidEdit] = useState({
        name: false,
        email: false,
        subject: false,
        message: false
    })

    const navigate = useNavigate()

    function handleChangeInput(identifier, value) {
        setFormData(prevValue => ({
            ...prevValue,
            [identifier]: value
        }))
    }

    function handleInputBlur(identifier) {
        setDidEdit(prevValue => ({
            ...prevValue,
            [identifier]: true
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log('Contact form submitted:', formData)
        // Here you would typically send the data to your backend
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    const emailIsInvalid = didEdit.email && !formData.email.includes('@')
    const nameIsInvalid = didEdit.name && formData.name.trim().length < 2
    const subjectIsInvalid = didEdit.subject && formData.subject.trim().length < 5
    const messageIsInvalid = didEdit.message && formData.message.trim().length < 10

    return (
        <>
            <Bar />
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get in <span>Touch</span></h1>
                    <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-card">
                            <img src={location} alt="" />
                            <h3>Address</h3>
                            <p>123 Movie Street<br />Entertainment City, EC 12345</p>
                        </div>

                        <div className="info-card">
                            <img src={email} alt="" />
                            <h3>Email</h3>
                            <p>info@cinepeek.com<br />support@cinepeek.com</p>
                        </div>

                        <div className="info-card">
                            <img src={call} alt="" />
                            <h3>Phone</h3>
                            <p>+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                        </div>

                        <div className="info-card">
                            <img src={hours} alt="" />
                            <h3>Hours</h3>
                            <p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="contact-form">
                        <h2>Send us a Message</h2>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(event) => handleChangeInput('name', event.target.value)}
                                onBlur={() => handleInputBlur('name')}
                                placeholder="Your full name"
                            />
                            {nameIsInvalid && <p className="error">Please enter a valid name (at least 2 characters)</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(event) => handleChangeInput('email', event.target.value)}
                                onBlur={() => handleInputBlur('email')}
                                placeholder="your.email@example.com"
                            />
                            {emailIsInvalid && <p className="error">Please enter a valid email address</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                value={formData.subject}
                                onChange={(event) => handleChangeInput('subject', event.target.value)}
                                onBlur={() => handleInputBlur('subject')}
                                placeholder="What's this about?"
                            />
                            {subjectIsInvalid && <p className="error">Please enter a subject (at least 5 characters)</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(event) => handleChangeInput('message', event.target.value)}
                                onBlur={() => handleInputBlur('message')}
                                placeholder="Tell us more about your inquiry..."
                                rows="5"
                            ></textarea>
                            {messageIsInvalid && <p className="error">Please enter a message (at least 10 characters)</p>}
                        </div>

                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>


            </div>
            <Footer />
        </>
    )
} 