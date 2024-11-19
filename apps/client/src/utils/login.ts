import { api } from '@/lib/api'

declare global {
  interface Window {
    login: () => void
  }
}

function login(): void {
  const fakeJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZTNiNWVmZS05ZWUxLTRiNjMtOTE3ZS1jZTc0MzEyYmE5M2MiLCJpYXQiOjE5MjA1MTQ1MzV9.KP9XaFC0Aw1rk3IDYkS0G_KoYkZ6uAJU56tHdp5X_jA'
  localStorage.setItem('token', fakeJwt)
  api.defaults.headers.Authorization = `Bearer ${fakeJwt}`
  window.location.reload()
}

window.login = login
