import { isInternetExplorer } from 'src/services/utils/utilsService'
import * as Msal from 'msal'
import * as config from 'src/app-config.json'

function MSALConfigFactory(): Msal.Configuration {
  return {
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
      storeAuthStateInCookie: isInternetExplorer, // set to true for IE 11
    },
  }
}

export const consentScopes: { scopes: string[] } = {
  scopes: [
    config.resources.gatewayApi.resourceScope,
    ...config.scopes.loginRequest,
  ],
}

export const auth = new Msal.UserAgentApplication(MSALConfigFactory())

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
