import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'user-id': 'tmpf2yadjy10x5yjhdkckk29'
  }
})
