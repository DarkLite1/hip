// import msal from 'src/services/auth/authIndexOld'
// import { loginRequest } from 'src/config/authConfig'
import { msal, consentScopes } from 'src/services/auth/authIndex'

export const getAccount = () => msal.getAccount()
export const loginRedirect = () => {
  msal.loginRedirect(consentScopes)
}
export const logout = () => {
  msal.logout()
}
export const getTokenRedirect = (request, endpoint?: string) => {
  return msal
    .acquireTokenSilent(request, endpoint)
    .catch(() => msal.acquireTokenRedirect(request)) // page reload
}
