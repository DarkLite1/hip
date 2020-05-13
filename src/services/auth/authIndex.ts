import * as Msal from 'msal'
import * as config from 'src/app-config.json'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Configuration, CacheLocation } from 'msal'


function MSALConfigFactory(): Configuration {
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
      cacheLocation: config.cache.cacheLocation as CacheLocation,
      storeAuthStateInCookie: isInternetExplorer, // set to true for IE 11
    },
  }
}

export const msal = new Msal.UserAgentApplication(MSALConfigFactory())

export const consentScopes: {scopes: string[]} = {
  scopes: [
    config.resources.gatewayApi.resourceScope,
    ...config.scopes.loginRequest
  ]
}

// export const protectedResourceMap: [string, string[]][] = [
//   [
//     config.resources.gatewayApi.resourceUri,
//     [config.resources.gatewayApi.resourceScope],
//   ],
// ]

// type MsalVueConfiguration = {
//   popUp: boolean
//   consentScopes: string[]
//   protectedResourceMap?: [string, string[]][] | Map<string, Array<string>>
//   unprotectedResources?: string[]
//   extraQueryParameters?: { [key: string]: string }
// }

// export function MSALVueConfigFactory(): MsalVueConfiguration {
//   return {
//     popUp: !isIE && Screen.gt.xs,
//     consentScopes: [
//       config.resources.gatewayApi.resourceScope,
//       ...config.scopes.loginRequest,
//     ],
//     protectedResourceMap,
//     unprotectedResources: [],
//     extraQueryParameters: {},
//   }
// }
