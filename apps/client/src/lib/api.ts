import axios from 'axios'

const token = localStorage.getItem('token')
let isRefreshing = false
// biome-ignore lint/suspicious/noExplicitAny: any is used to store the failed requests
let failedRequestsQueued: any[] = []

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
})

api.interceptors.response.use(
  response => response,
  error => {
    let token = localStorage.getItem('token')
    let refreshToken = localStorage.getItem('refresh-token')
    if (error.response?.status === 401 && !!token && !!refreshToken) {
      const originalConfig = error.config
      if (!isRefreshing) {
        isRefreshing = true
        api
          .post('/sessions/refresh', { refreshToken })
          .then(response => {
            token = response.data.token as string
            refreshToken = response.data.refreshToken as string
            localStorage.setItem('token', token)
            localStorage.setItem('refresh-token', refreshToken)
            api.defaults.headers.Authorization = `Bearer ${token}`
            for (const request of failedRequestsQueued) request.onSuccess(token)
          })
          .catch(error => {
            token = null
            refreshToken = null
            localStorage.removeItem('token')
            localStorage.removeItem('refresh-token')
            for (const request of failedRequestsQueued) request.onFailure(error)
          })
          .finally(() => {
            isRefreshing = false
            failedRequestsQueued = []
          })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueued.push({
          onSuccess: (token: string): void => {
            originalConfig.headers.Authorization = `Bearer ${token}`
            resolve(api(originalConfig))
          },
          onFailure: (error: unknown): void => reject(error)
        })
      })
    }

    return Promise.reject(error)
  }
)
