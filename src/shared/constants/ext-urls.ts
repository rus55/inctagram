const CLIENT_ID = process.env.google_client_id

export const LOCAL_URL = 'http://localhost:3000'

export const BASE_URL = 'https://mypicto.ru'

export const BASE_URL_INCTA = 'https://mypicto.ru'

export const BASE_WORK_URL = 'https://inctagram.work/api/v1'

export const BACKEND_URL = `${BASE_URL}/api/v1`

export const FRONTEND_URL = process.env.NODE_ENV === 'development' ? LOCAL_URL : BASE_URL_INCTA
// 2 different REDIRECT_URL used on deploy end develop
// const GOOGLE_REDIRECT_URI = FRONTEND_URL + '/auth/oauth-callback-google'

export const GOOGLE_REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? FRONTEND_URL
    : FRONTEND_URL + '/auth/oauth-callback-google'

export const AUTH_URLS = {
  GITHUB: `${BASE_WORK_URL}/auth/github/login`,
  // GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${CLIENT_ID}&prompt=consent&access_type=offline&include_granted_scopes=true&enable_granular_consent=true&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow`,
  GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${CLIENT_ID}`,
  // GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?scope=openid profile email&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${CLIENT_ID}&include_granted_scopes=true&enable_granular_consent=true`,
}
