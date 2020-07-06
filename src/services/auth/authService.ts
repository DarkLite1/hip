import * as Msal from '@azure/msal-browser'
import config from 'src/app-config.json'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'

const MSALConfig: Msal.Configuration = {
  auth: {
    clientId: config.auth.clientId,
    authority: config.auth.authority,
    redirectUri: config.auth.redirectUri,
    postLogoutRedirectUri: config.auth.postLogoutRedirectUri,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: config.cache.cacheLocation,
    storeAuthStateInCookie: isInternetExplorer,
  },
}

export const auth = new Msal.PublicClientApplication(MSALConfig)

export const isLoginPopup = Screen.lt.sm || isInternetExplorer ? false : true

export const allScopes = (() => {
  const resourceScopes = Object.values(config.resources)
    .flatMap((resource) => resource.scopes)
    .filter((scope) => scope)

  const uniqueSet = new Set([...config.scopes.loginRequest, ...resourceScopes])
  return Array.from(uniqueSet)
})()

export const getToken = async (request: Msal.TokenExchangeParameters) => {
  try {
    return await auth.acquireTokenSilent(request)
  } catch {
    if (isLoginPopup) {
      return await auth.acquireTokenPopup(request)
    }
    return auth.acquireTokenRedirect(request)
  }
}

export const login = async () => {
  if (isLoginPopup) {
    return auth.loginPopup({
      redirectUri: config.auth.redirectUri,
      scopes: allScopes,
    })
  }
  return auth.loginRedirect({
    redirectUri: config.auth.redirectUri,
    scopes: allScopes,
  })
}
