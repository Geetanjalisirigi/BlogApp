import React from 'react'
import "./UserProfile.css"
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
function UserProfile() {
  return (
    <div className='container'>
      <Link className="fs-1 nav-link p-3" to="articles">Articles</Link>
      <Outlet/>
    </div>
  )
}

export default UserProfile