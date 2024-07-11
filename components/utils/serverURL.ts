export const SERVER_API = "https://f8f1-194-87-199-27.ngrok-free.app"
// export const SERVER_API = "https://bck.aiana.io"

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
  GET_KNOWLEDGE_BASES: `${SERVER_API_URL}/get_knowledge_bases`,
  GET_KNOWLEDGE_BASE: `${SERVER_API_URL}/get_knowledge_base`,
  GET_CHATBOTS: `${SERVER_API_URL}/get_chatbots`,
  UPDATE_KNOWLEDGE_BASE: `${SERVER_API_URL}/update_knowledge_base`,
  GET_CHATBOT: `${SERVER_API_URL}/get_embedding`,
  UPDATE_CHATBOT: `${SERVER_API_URL}/update_chatbot`,
  QUERY: `${SERVER_API_URL}/query`,
  DEL_MESSAGE: `${SERVER_API_URL}/del_messages`,
  BOOK: `${SERVER_API_URL}/book`,
  GET_CHAT: `${SERVER_API_URL}/get_chat`,
  GET_LOG_DATA: `${SERVER_API_URL}/get_log_data`,
  GET_TICKETS: `${SERVER_API_URL}/get_tickets`,   
  DEL_TICKET: `${SERVER_API_URL}/del_ticket`,
  RESET_PASSWORD: `${SERVER_API_URL}/reset_with_token`,
  REFRESH_TOKEN: `${SERVER_API_URL}/refresh`,
  DELETE_DOCUMENT: `${SERVER_API_URL}/del_document`,
  DELETE_URL: `${SERVER_API_URL}/del_url`,
  DELETE_KNOWLEDGEBASE: `${SERVER_API_URL}/del_knowledgebase`,
  DELETE_BOT: `${SERVER_API_URL}/del_bot`,
  CHATBOT_DATA:`${SERVER_API_URL}/get_chatbot_data`,
  GET_USERS:`${SERVER_API_URL}/get_users`,
  GET_USER_AS_ADMIN: `${SERVER_API_URL}/get_user_as_admin`,
}
