import axios from 'axios'

// const token = localStorage.getItem('token')

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    // Authorization: token ? `Bearer ${token}` : ''
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZTNiNWVmZS05ZWUxLTRiNjMtOTE3ZS1jZTc0MzEyYmE5M2MiLCJpYXQiOjE5MjA1MTQ1MzV9.KP9XaFC0Aw1rk3IDYkS0G_KoYkZ6uAJU56tHdp5X_jA'
  }
})
