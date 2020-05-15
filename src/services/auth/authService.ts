import { isInternetExplorer } from 'src/services/utils/utilsService'
import * as Msal from 'msal'
import * as configJson from 'src/app-config.json'

type resourceType = {
  resourceUri: string
  resourceScope: string | string[]
}

type resourcesType = {
  [key: string]: resourceType
}

interface JsonConfigInterface extends Msal.Configuration {
  scopes: {
    loginRequest: string[]
  }
  resources: resourcesType
}

const config: JsonConfigInterface = configJson as JsonConfigInterface

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
      cacheLocation: config.cache?.cacheLocation,
      storeAuthStateInCookie: isInternetExplorer,
    },
  }
}


export const getAllScopes = () => {
  const uniqueSet = new Set(
    Object.values(config.resources)
      .flatMap((resource) => resource.resourceScope)
      .filter((resourceScope) => resourceScope)
  )

  return {
    scopes: Array.from(uniqueSet),
  }
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
