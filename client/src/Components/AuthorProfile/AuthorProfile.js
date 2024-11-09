import React from 'react'
import "./AuthorProfile.css"
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function AuthorProfile() {
  
  const { currentUser } = useSelector((state) => state.userLogin);
  return (
    <div className="container">
      <ul className="navbar-nav d-flex flex-row justify-content-center">
        <li className="nav-item">
        <NavLink className="nav-link fs-1 ps-3 sty me-4" to={`articles-by-author/${currentUser.username}`}>
        Articles By Author
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link fs-1 ps-3 sty ms-4" to="new-article">
        Add new Article
        </NavLink>
      </li>
      </ul>
       
      <Outlet/>
    </div>
  )
}

export default AuthorProfile