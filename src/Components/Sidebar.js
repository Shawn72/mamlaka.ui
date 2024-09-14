import React, { Component } from "react"
import { Link } from "react-router-dom"

const checkSession = localStorage.length
let userrole, name, username

if (checkSession > 0) {
  name = localStorage.getItem("name").trim()
  userrole = localStorage.getItem("userrole").trim()
  username = localStorage.getItem("username").trim()
}

const systemNameCss = {
  whiteSpace: "pre-wrap"
}

export class Sidebar extends Component {

  renderVoid(e) {
    e.preventDefault()
  }

  render() {
    if (checkSession > 0)
      return (
        <div>
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo  */}
            <a href="/home" className="brand-link">
              <span className="brand-text font-weight-light" style={systemNameCss}>
                Mamlaka UI </span>
            </a>

            <div className="sidebar">
              <input type="hidden" value={userrole} />
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  <img src="../assets/img/default-avatar.jpg"
                    className="img-circle elevation-2" alt="user-avatar" />
                </div>

                <div className="info">
                  {
                    userrole === "SUPERADMIN" ?
                      <a href="/priestprofile" className="d-block">{name}</a> :
                      userrole === "ADMIN" ?
                        <a href="/adminrofile" className="d-block">{name}</a> :
                        <a href="/userprofile" className="d-block">{name}</a>
                  }
                </div>
              </div>

              <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                  <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-sidebar">
                      <i className="fas fa-search fa-fw"></i>
                    </button>
                  </div>
                </div>
              </div>

              <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  <li className="nav-item">
                    <Link to="/home">
                      <div className="nav-link">
                        <i className="fas fa-home nav-icon" style={{color: "aliceblue"}}></i>
                        <p>Home</p>
                      </div>
                    </Link>
                  </li>
                  {
                    userrole === "SUPERADMIN" ?
                      <>
                        <li className="nav-item">
                          <a href="#!" onClick={this.renderVoid} className="nav-link">
                            <i className="nav-icon fas fa fa-scroll"></i>
                            <p>
                              Transactions
                              <i className="fas fa-angle-left right"></i>
                            </p>
                          </a>
                          <ul className="nav nav-treeview">
                            <li className="nav-item">
                              <Link to="/home">
                                <div className="nav-link">
                                  <i className="fas fa-list-ul nav-icon"></i>
                                  <p>Transactions</p>
                                </div>
                              </Link>
                            </li>                            
                          </ul>
                        </li>
                       
                      </>
                      : userrole === "ADMIN" ?
                        <>
                          <li className="nav-item">
                            <a href="#!" onClick={this.renderVoid} className="nav-link">
                              <i className="nav-icon fas fa fa-folder"></i>
                              <p>
                                Home Page
                                <i className="fas fa-angle-left right"></i>
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <Link to="/home">
                                  <div className="nav-link">
                                    <i className="far fa fa-file nav-icon"></i>
                                    <p>Home</p>
                                  </div>
                                </Link>
                              </li>                             
                            </ul>
                          </li>
                        </>
                        : null
                  }
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      )
  }
}
export default Sidebar