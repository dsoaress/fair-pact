import { env } from '@/shared/config/env'

type Output = {
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

export class GoogleOAuthService {
  async execute(code: string): Promise<Output> {
    const { accessToken, idToken } = await this.fetchAccessToken(code)
    return this.fetchUserInfo(accessToken, idToken)
  }

  private async fetchAccessToken(code: string): Promise<{ accessToken: string; idToken: string }> {
    const url = 'https://oauth2.googleapis.com/token'
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET)
      throw new Error('Google OAuth 2.0 is not configured')
    const options = {
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URL,
      grant_type: 'authorization_code'
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(options).toString()
    })
    const { access_token, id_token } = (await response.json()) as {
      access_token: string
      id_token: string
    }
    return { accessToken: access_token, idToken: id_token }
  }

  private async fetchUserInfo(accessToken: string, idToken: string): Promise<Output> {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    const user = await fetch(url, { headers: { Authorization: `Bearer ${idToken}` } })
    const userInfo = await user.json()
    if (!userInfo.verified_email) throw new Error('Email not verified')
    return {
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      email: userInfo.email,
      avatar: userInfo.picture
    }
  }
}