import $ from "jquery"
import jQuery from "jquery"
import React, { useEffect, useState } from "react"
import SessionManager from "../Auth/SessionManager"

const fullDateTimeOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}

const fullDateOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short"
}

const floatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}

const CurrentYear = () => {
  const currentDate = new Date()
  return currentDate.getFullYear()
}

const CurrentUSDateTime = () => {
  const currentDate = new Date()
  const day = String(currentDate.getDate()).padStart(2, "0")
  const month = String(currentDate.getMonth() + 1).padStart(2, "0")
  const year = currentDate.getFullYear()
  return `${month}-${day}-${year}`
}

const CurrentUKDateTime = () => {
  const currentDate = new Date()
  const day = String(currentDate.getDate()).padStart(2, "0")
  const month = String(currentDate.getMonth() + 1).padStart(2, "0")
  const year = currentDate.getFullYear()
  return `${day}-${month}-${year}`
}

const backButton = (pageUrl) => {
  localStorage.removeItem("loans")
  window.location.href = pageUrl["pageUrl"]
}

const checkCurrentUrl = () => {

  const {
    host, hostname, href, origin, pathname, port, protocol, search
  } = new URL(location.href)

  let _filename = pathname.split("/").pop()

  window.location.href = _filename

}

const pageUrlChecker = (pageUrl) => {

  if (pageUrl === "home") {

    //do some stuff here

    // let _headerSpan = document.querySelectorAll(".headerSpan")
    // _headerSpan.forEach(element => {
    //   element.textContent = "Home"
    // }) 

  } 

}

let name, username, userrole
const sessionHelper = () => {
  if (localStorage.getItem("username") === null) {
    return false
  }
  else {
    name = localStorage.getItem("name")
    userrole = localStorage.getItem("userrole")
    username = localStorage.getItem("username")
    return true
  }
}

const logOut = () => {
  SessionManager.removeUserSession()
  window.location.href = "/login"
}

export {
  CurrentUKDateTime,
  CurrentUSDateTime,
  CurrentYear,
  fullDateOptions,
  fullDateTimeOptions,
  backButton, pageUrlChecker,
  logOut, sessionHelper,
  floatOptions
}