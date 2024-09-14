import React from "react"
import {jest} from "@jest/globals"
import { render } from "@testing-library/react"
import  Home from "../Pages/Dashboards/Home"
import { expect, describe, it } from "../setupTests"
import { BrowserRouter as Router } from "react-router-dom"
import transactionsmocklist from "./mocks/transactionsmocklist.json"

let fetch = jest.fn()

describe("transactions test group", () => {
  
  //arrange
  render(<Router><Home /></Router>)  
  
  //act
  it("should render transactions list", async () => {
     
    fetch(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(transactionsmocklist),
      })
    )         

    fetch(() => {
      const transactionId = 1
      const transactionDetails =
      transactionsmocklist.find((item) => item.id === transactionId)
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(transactionDetails)
      })
    })      
    
    //assertions
    expect(fetch).toHaveBeenCalledTimes(2)

    //clean up
    fetch.mockClear()
    fetch = null

  })
})

