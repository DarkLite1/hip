import { isInternetExplorer } from 'src/services/utils/utilsService'
import * as Msal from 'msal'
import config from 'src/app-config.json'

console.log('loaded authService')

const MSALConfig: Msal.Configuration = {
  auth: {
    clientId: config.auth.clientId,
    authority: config.auth.authority,
    validateAuthority: true,
    redirectUri: config.auth.redirectUri,
    postLogoutRedirectUri: config.auth.postLogoutRedirectUri,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: config.cache.cacheLocation as Msal.CacheLocation,
    storeAuthStateInCookie: isInternetExplorer,
  },
}

export const getAllScopes = (): { scopes: string[] } => {
  const resourceScopes = Object.values(config.resources)
    .flatMap((resource) => resource.resourceScope)
    .filter((resourceScope) => resourceScope)

  const uniqueSet = new Set([...resourceScopes, ...config.scopes.loginRequest])

  return {
    scopes: Array.from(uniqueSet),
  }
}

export const auth = new Msal.UserAgentApplication(MSALConfig)

export const getTokenPopup = (request: Msal.AuthenticationParameters) => {
  return auth
    .acquireTokenSilent(request)
    .catch(() => auth.acquireTokenPopup(request))
}

export const getTokenRedirect = (request: Msal.AuthenticationParameters) => {
  return auth
    .acquireTokenSilent(request)
    .catch(() => auth.acquireTokenRedirect(request)) // page reload
}