import React from "react";
import { NavLink,Link } from "react-router-dom";
import "./Navigationbar.css";
import { useDispatch,useSelector } from 'react-redux';
import {resetState} from "../../redux/slices/userLoginSlice"

function Navigationbar() {

  const{isPending,currentUser,errorStatus,errorMessage,loginStatus}=useSelector(state=>state.userLogin)
  let dispatch=useDispatch()

  function logOut(){
    //remove token from browser storage(session storage)
    sessionStorage.removeItem("token")
    //reset state
    let action=resetState()
    dispatch(action)

  }

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand ps-3 fs-3" to="">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sdKefjktGSmuP3HZ1Jj_iharTW4tgxibhA&s" alt="Not found" class="img"/>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end pe-4" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {

            loginStatus===false?<>

            <li className="nav-item">
            <NavLink className="nav-link fs-3 ps-3" to="">
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link fs-3 ps-3" to="signup">
              Signup
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link fs-3 ps-3" to="signin">
              Signin
            </NavLink>
          </li>

            </>:

                <li className="nav-item">
            <NavLink className="nav-link fs-3 ps-3" to="signin" onClick={logOut}>
              <span className="lead fs-2 me-3 text-danger">{currentUser.username}</span>
              SignOut
            </NavLink>
          </li>

          }

        </ul>
      </div>
    </nav>
  );
}

export default Navigationbar;
