import App from "./App"
import React from "react"
import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom"
import Login from "./Auth/Login"
import ReactDOM from "react-dom/client"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter basename={"/"}>
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="/" element={<App />} />
      <Route path="/home/*" element={<App />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)
