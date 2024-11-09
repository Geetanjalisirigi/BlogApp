import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div className='footer d-flex p-5 justify-content-around'>
      <div className="part">
        <h5>INFORMATION</h5>
        <p className="link-secondary" >Pages</p>
        <p className="link-secondary">Our Team</p>
        <p className="link-secondary" >Feachers</p>
        <p className="link-secondary" >Prices</p>
      </div>
      <div className="part">
        <h5>RESOURCES</h5>
        <p className="link-secondary" >Wikipedia</p>
        <p className="link-secondary">React Blog</p>
        <p className="link-secondary" >Terms & Service</p>
        <p className="link-secondary" >Angular dep</p>
      </div>
      <div className="part">
        <h5>HELP</h5>
        <p className="link-secondary" >Signup</p>
        <p className="link-secondary" >Login</p>
        <p className="link-secondary" >Terms of Services</p>
        <p className="link-secondary" >Privacy Policy</p>
      </div>
      <div className="part">
        <h5>CONTACT US</h5>
        <p className="link-secondary" >Contact us if need help</p>
        <p className="link-secondary" >Phn No:+91 9349281045</p>
      </div>
    </div>
  )
}

export default Footer