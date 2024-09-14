module.exports = {

  // testEnvironment: "jsdom",

  setupFilesAfterEnv: [
    '/src/setupTests.js',
  ],

  "jest": {
    "setupFiles": [
      "/src/setupTests.js"
    ]
  }

}