import axios from 'axios'

export const api = axios.create({
  baseURL: "https://foodexplorer-backend-ddea.onrender.com"
  // baseURL: "http://localhost:4000/api/v1"
})