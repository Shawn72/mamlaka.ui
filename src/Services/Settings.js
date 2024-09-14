const APP_ENV =  process.env.REACT_APP_ENV
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY
const box_environment = process.env.REACT_APP_BOX_ENVIRONMENT
const API_BASE_URL = APP_ENV === "dev" ? "https://localhost:7124/" : process.env.REACT_APP_API_BASE_URL
export { API_BASE_URL, APP_ENV, ENCRYPTION_KEY, box_environment }