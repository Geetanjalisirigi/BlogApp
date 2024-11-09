import React from 'react'
import {Outlet} from "react-router-dom"
import Navigationbar from "./Navigabtionbar/Navigationbar"
import Footer from "./Footer/Footer"

function RootLayout() {
  return (
    <div>
        <Navigationbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout