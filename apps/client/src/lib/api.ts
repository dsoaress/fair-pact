import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'user-id': '93665c9d-96e4-43d2-9ecc-86c88dc3fbf0'
  }
})
