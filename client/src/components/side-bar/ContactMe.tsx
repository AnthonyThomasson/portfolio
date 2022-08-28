import { useRef } from 'react'
import './../../styles/ContactMe.css'

function ContactMe() {
  const emailInput = useRef(null)
  const messageInput = useRef(null)

  return (
    <div className="contact-me-content">
      <input placeholder="Email" ref={emailInput} />
      <button
        onClick={() => {
          alert('This feature is not yet working')
        }}>
        <span className="fa-solid fa-check" /> Commit
      </button>
      <textarea placeholder="Message" ref={messageInput} />
    </div>
  )
}

export default ContactMe
