import React, { Component } from "react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import Sidebar from "../Components/Sidebar"
import Home from "../Pages/Dashboards/Home"

const checkSession = localStorage.length
let userrole, name, username

if(checkSession > 0){
  name = localStorage.getItem("name").trim()
  userrole = localStorage.getItem("userrole").trim()
  username = localStorage.getItem("username").trim()
}

export class Layout extends Component {
  
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Header/>
        <Sidebar />
        <Home/>        
        <Footer />
      </div>
    )
  }
}