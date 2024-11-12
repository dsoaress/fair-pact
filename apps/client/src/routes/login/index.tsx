import { api } from '@/lib/api'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

type Params = {
  token?: string
  error?: string
}

export const Route = createFileRoute('/login/')({
  component: Login,
  validateSearch: (params: Params): Params => {
    return {
      token: params.token,
      error: params.error
    }
  }
})

function Login(): null {
  const navigate = useNavigate()
  const { error, token } = useSearch({ from: '/login/' })

  useEffect(() => {
    if (error) navigate({ to: '/' })
    if (token) {
      localStorage.setItem('token', token)
      api.defaults.headers.Authorization = `Bearer ${token}`
      navigate({ to: '/app' })
    }
  }, [token, error, navigate])

  return null
}
