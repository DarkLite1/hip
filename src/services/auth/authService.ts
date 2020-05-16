import { isInternetExplorer } from 'src/services/utils/utilsService'
import * as Msal from 'msal'
import config from 'src/app-config.json'

console.log('loaded authService')

console.log('config', config)

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

console.log('MSALConfig created')

export const getAllScopes = (): { scopes: string[] } => {
  const uniqueSet = new Set(
    Object.values(config.resources)
      .flatMap((resource) => resource.resourceScope)
      .filter((resourceScope) => resourceScope)
  )

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

// console.log('auth created')

// const loginRequest = {
//   scopes: ['openid', 'profile', 'User.Read']
// };

// export const loginPopup = () => auth.loginPopup(loginRequest)

// type resourceType = {
//   resourceUri: string
//   resourceScope: string | string[]
// }

// type resourcesType = {
//   [key: string]: resourceType
// }

// interface JsonConfigInterface extends Msal.Configuration {
//   scopes: {
//     loginRequest: string[]
//   }
//   resources: resourcesType
// }

// console.log('configJson', configJson)
// const config: JsonConfigInterface = configJson as JsonConfigInterface