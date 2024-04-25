export const SERVER_API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export const SERVER_API_URL = `${SERVER_API}/api`

export const AUTH_API = {
  LOGIN: `${SERVER_API_URL}/login`,
  REGISTER: `${SERVER_API_URL}/register`,
  LOGOUT: `${SERVER_API_URL}/logout`,
  GET_USER: `${SERVER_API_URL}/get_user`,
  UPDATE_USER: `${SERVER_API_URL}/update_user`,
  CREATE_BOT: `${SERVER_API_URL}/create_bot`,
  FORGOT_PASSWORD: `${SERVER_API_URL}/forgot_password`,
  UPLOAD_DOCUMENT: `${SERVER_API_URL}/upload_document`,
  UPLOAD_WEBSITE: `${SERVER_API_URL}/upload_website`,
  UPLOAD_TEXT: `${SERVER_API_URL}/upload_text`,
  GET_KNOWLEDGE_BASE: `${SERVER_API_URL}/get_knowledge_bases`,
}
