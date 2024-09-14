import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Navbar, NavItem, NavLink } from "reactstrap"

export class Header extends Component {

  renderVoid(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <Navbar className="main-header navbar navbar-expand navbar-white navbar-light fixed-navbar">
          {/* Left navbar links  */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#!" onClick={this.renderVoid} role="button"><i className="fas fa-bars"></i></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="/" className="nav-link">Home</a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/logout"><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</NavLink>
            </NavItem>

            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" href="#!" onClick={this.renderVoid} role="button">
                <i className="fas fa-expand-arrows-alt"></i>
              </a>
            </li>
          </ul>
        </Navbar>
      </div>
    )
  }
}
export default Header