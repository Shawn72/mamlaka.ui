import { API_BASE_URL } from "./Settings"
import SessionManager from "../Auth/SessionManager"

/**
 * GET - with no JWT Token
 * @param {*} endPoint 
 * @returns 
 */
export function getDataNoToken(endPoint) {

  let payload = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  }
  return fetch(API_BASE_URL + endPoint, payload)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    }).then(function (result) {
      return result
    }).catch(function (error) {
      console.log(error)
    })
}

/**
 * POST - with no JWT Token
 * @param {*} postData 
 * @returns 
 */
export function postDataNoToken(endPoint, postData) {

  let payload = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  }

  return fetch(API_BASE_URL + endPoint, payload)
    .then(function (response) {
      return response.json()
    }).then(function (result) {
      return result;
    }).catch(function (error) {
      console.log(error)
    })
}


/**
 * GET - with JWT Token
 * @param {*} endPoint 
 * @returns 
 */
export function getDataWithToken(endPoint) {

  let token = SessionManager.getToken()

  let payload = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  }
  return fetch(API_BASE_URL + endPoint, payload)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then(function (result) {
      return result;
    }).catch(function (error) {
      console.log(error);
    });
}

/**
 * POST - with JWT token
 * @param {*} endPoint 
 * @param {*} inputObject 
 * @returns 
 */
export function postDataWithJwt(endPoint, inputObject) {
  let token = SessionManager.getToken()
  let payload = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(inputObject)
  }
  return fetch(API_BASE_URL + endPoint, payload)
    .then(function (response) {
      return response.json()
    }).then(function (result) {
      return result;
    }).catch(function (error) {
      console.log(error)
    })
}