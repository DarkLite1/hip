import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import * as Msal from '@azure/msal-browser'
import config from 'src/app-config.json'

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
    .flatMap((resource) => resource.resourceScope)
    .filter((resourceScope) => resourceScope)

  const uniqueSet = new Set([...resourceScopes, ...config.scopes.loginRequest])

  return {
    scopes: Array.from(uniqueSet),
  }
})()

export async function getTokenRedirect(request: Msal.AuthenticationParameters) {
  return await auth.acquireTokenSilent(request).catch(() => {
    return auth.acquireTokenRedirect(request)
  })
}

export async function getTokenPopup(request: Msal.AuthenticationParameters) {
  return await auth.acquireTokenSilent(request).catch(async () => {
    return await auth.acquireTokenPopup(request).catch((error) => {
      console.log('login with popup failed: ', error)
    })
  })
}
