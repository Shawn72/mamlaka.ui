import CryptoJS from "crypto-js"
import { ENCRYPTION_KEY } from "../Services/Settings"

const SessionManager = {

  setJwtToken(jwtToken){
    localStorage.setItem("token", jwtToken)
  },
  
  getToken() {
    const token = localStorage.getItem("token")
    if (token) return token
    else return null
  }, 

  parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null
    }
  },

  CheckTokenValidity() {
    const _sessionToken = localStorage.getItem("token")
    if (_sessionToken) {
      const decodedJwt = this.parseJwt(_sessionToken);
      //validate expiry
      if (decodedJwt.exp * 1000 < Date.now()) {
        //token expired, redirect to token server
        this.removeUserSession()
      }
      console.log("token is valid")
    }
  }, 

  encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString()
  },

  decryptPassword(cipherText) {
    const _bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY)
    return _bytes.toString(CryptoJS.enc.Utf8)
  },

  setUserSession(name, username, userrole, token, expiry) {
    localStorage.setItem("name", name)
    localStorage.setItem("username", username)
    localStorage.setItem("userrole", userrole)
    localStorage.setItem("token", token)
    localStorage.setItem("expiry", expiry)
  },

  removeUserSession() {
    localStorage.removeItem("name")
    localStorage.removeItem("username")
    localStorage.removeItem("userrole")
    localStorage.removeItem("token")
    localStorage.removeItem("expiry")
  }
}

export default SessionManager
