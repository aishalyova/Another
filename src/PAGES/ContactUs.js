import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const ContactUs = () => {
  return (
    <div className="contactus-container">
      <h2>Contact Us</h2>
      <p>Feel free to reach out to us through the contact form below.</p>
      <form>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;
