export const SERVER_API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export const SERVER_API_URL = `${SERVER_API}/api`

export const AUTH_API = {
  LOGIN: `${SERVER_API_URL}/login`,
  REGISTER: `${SERVER_API_URL}/register`,
  LOGOUT: `${SERVER_API_URL}/logout`,
}
