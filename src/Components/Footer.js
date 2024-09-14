import React, { Component } from "react"
import { CurrentYear } from "../Helpers/Helpers"
export class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="main-footer">
          <strong>Copyright &copy; <CurrentYear />&nbsp;<a href="/">RAAGSAN Document Management System </a></strong>
        </footer>
      </div>
    )
  }
}
export default Footer