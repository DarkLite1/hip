import { msal, consentScopes } from 'src/services/auth/authIndex'

export const getAccount = () => msal.getAccount()
export const loginPopup = () => msal.loginPopup(consentScopes)
export const logout = () => {
  msal.logout()
}
export const getTokenPopup = (request) => {
  return msal
    .acquireTokenSilent(request)
    .catch(() => msal.acquireTokenPopup(request))
}
