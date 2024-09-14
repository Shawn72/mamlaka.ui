import $ from "jquery"
import React, { Component } from "react"
import "react-toastify/dist/ReactToastify.css"
import SessionManager from "../Auth/SessionManager"
import { toast, ToastContainer } from "react-toastify"
import { postDataNoToken } from "../Services/apiServices"

let content, loginError

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      failed: false,
      errorMsg: ""
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      this.login()
    }
  }

  
  login() {
    
    if(!this.state.email){
      this.setState({ errorMsg: "Email field must be provided!", loading: false })
      return 
    }
    if(!this.state.password){
      this.setState({ errorMsg: "Password field must be provided!", loading: false })
      return 
    }

    let loginData = {
      email: this.state.email,
      password: this.state.password
    }

    this.setState({ loading: true })

    $(".modalspinner").css("display", "block")

    postDataNoToken("api/user/signin", loginData).then((result) => {

      if (result?.isSuccessful && result?.accessToken) {

        SessionManager.setUserSession(`${result.user.firstName}${" "}${result.user.lastName}`,
          result.user.email, result.user.userRole,  result.accessToken, result.expires)

        if (SessionManager.getToken()) {
          this.setState({ loading: false });
          // If login successful and get token redirect to home
          window.location.href = "/home"
        }
      } else {
        let errors = "";
        for (const key in result?.errors) {
          if (Object.hasOwnProperty.call(result.errors, key)) {
            errors += result.errors[key];
          }
        }

        loginError = errors === "" ? "Login failed!" : errors;
        toast.error(errors, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
        
        this.setState({ errorMsg: "Login failed!", loading: false })
        $(".feedbackDiv").css("display", "block")
        $(".feedbackDiv").addClass("alert-danger")
        $(".feedbackDiv #feedbackMsg").text(loginError)
        setTimeout(function () {
          $(".feedbackDiv").css("display", "none")
        }, 3000)
       
      }
    })
  }

  componentDidMount() {

    if (localStorage.length > 0) {
      localStorage.clear() //reset it
    }
    //do stuff here
  }

  render() {
    if (this.state.loading) {
      content = <strong>Processing...</strong>
    }

    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="logo login-box-msg">
              <img alt="avatar" src="assets/img/default-avatar.jpg" width="200em" height="auto"  />
            </div>

            <div className="card-header text-center font-clarke">
              <a href="/" className="h1"><b>Mamlaka </b>&nbsp;Portal</a>
            </div>

            <div className="card-body">
              <p className="login-box-msg font-mbuvi">Sign in to the portal</p>

              <div className="modalspinner" style={{ display: "none" }}>
                <div className="centerspinner">
                  <div className="row">
                    <img alt="loading" src="assets/loaders/load.gif" />
                    {content}
                  </div>
                </div>
              </div>

              <div className="alert alert-dismissible feedbackDiv" style={{ display: "none" }}>
                <button className="btn btn-link close"
                  data-dismiss="alert" aria-label="close">&times;
                </button>
                <span id="feedbackMsg" style={{ display: "inline-block" }}></span>
              </div>

              <div className="input-group mb-3 has-feedback">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please Enter Username"
                  name="username"
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                />
                <div className="input-group-append">
                  <div className="input-group-text form-control-feedback">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3 has-feedback">
                <input type="password" className="form-control" placeholder="Please Enter Password" name="password"
                  onChange={this.onChange} onKeyDown={this.onKeyDown} />
                <div className="input-group-append">
                  <div className="input-group-text form-control-feedback">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                </div>
                <div className="col-md-6">
                  <button id="btnLogind"
                   className="btn btn-primary primary-widget font-mbuvi float-right" onClick={()=>this.login()}>
                    <i className="fas fa-sign-in-alt"></i>&nbsp;Login
                  </button>
                </div>
              </div>

              <div className="row">
                <p className="mb-1 hidden">
                  <a href="/reset-password">I forgot my password</a>
                </p>
                <p className="mb-0 col-md-6 hidden">
                  <a href="/register-user" className="float-left">
                    Register new user
                  </a>
                </p>
              </div>

            </div>
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <ToastContainer></ToastContainer>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
