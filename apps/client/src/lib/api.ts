import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'user-id': '5f682703-dfd6-4a4c-ae6f-ae7582693d2d'
  }
})
