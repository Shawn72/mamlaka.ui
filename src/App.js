import "./custom.css"
import Login from "./Auth/Login"
import React, { Component } from "react"
import { Layout } from "./Layouts/Layout"
import Home from "./Pages/Dashboards/Home"
import { Routes, Route,
  BrowserRouter as Router } from "react-router-dom"

const checkSession = sessionStorage.length

export default class App extends Component {
  static displayName = App.name
  render() {
    return (   
      checkSession > 0 ? (
        <div>               
          <Layout>                   
            <Router>
              <Routes>
                <Route path="/" element={<App />} />
                <Route index={true} element={<Login />} />
                <Route exact path="/home" component={Home} />
              </Routes>
            </Router>
          </Layout>
        </div>

      ) : (
        <div>
          <Layout>
            <Routes> 
              <Route path={"/"} element={<Login/>} />               
            </Routes>
          </Layout>
        </div>
      )
    )
  }
}