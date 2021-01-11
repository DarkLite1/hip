import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import { setAccount, account } from 'src/store/authStore'
import { ENVIRONMENT } from 'src/environment'
import { publish } from '../event/eventService'
import {
  PublicClientApplication,
  AccountInfo,
  Configuration,
  AuthenticationResult,
  InteractionRequiredAuthError,
} from '@azure/msal-browser'

const MSALConfig: Configuration = {
  auth: {
    clientId: ENVIRONMENT.auth.clientId,
    authority: ENVIRONMENT.auth.authority,
    redirectUri: ENVIRONMENT.auth.redirectUri,
    postLogoutRedirectUri: ENVIRONMENT.auth.postLogoutRedirectUri,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: ENVIRONMENT.cache.cacheLocation,
    storeAuthStateInCookie: isInternetExplorer,
  },
}

export const auth = new PublicClientApplication(MSALConfig)

export const isLoginPopup = Screen.lt.sm || isInternetExplorer ? false : true

const allScopes = (() => {
  const resourceScopes = Object.values(ENVIRONMENT.resources)
    .flatMap((resource) => resource.scopes)
    .filter((scope) => scope)

  const uniqueSet = new Set([
    ...ENVIRONMENT.scopes.loginRequest,
    ...resourceScopes,
  ])
  return Array.from(uniqueSet)
})()

const getAccount = (): AccountInfo | undefined => {
  const currentAccounts = auth.getAllAccounts()
  if (currentAccounts === null) {
    console.log('No accounts detected')
    return
  }
  if (currentAccounts.length > 1) {
    // Add choose account code here
    console.log('Multiple accounts detected, need to add choose account code.')
    return currentAccounts[0]
  } else if (currentAccounts.length === 1) {
    return currentAccounts[0]
  }
}

export const handleResponse = (response: AuthenticationResult | null) => {
  let account
  if (response != null) account = response.account
  else account = getAccount()

  if (account) {
    setAccount(account)
    publish('login:success', account)
  }
}

export const loadAuthModule = async (): Promise<void> => {
  try {
    const response = await auth.handleRedirectPromise()
    handleResponse(response)
  } catch (error) {
    console.error.bind(console)
  }
}

export const getToken = async (
  scopes: string[]
): Promise<string | undefined> => {
  const request = {
    scopes: scopes,
    account: account.value,
    forceRefresh: false,
  }
  try {
    const response = await auth.acquireTokenSilent(request)
    return response.accessToken
  } catch (e) {
    console.log('silent token acquisition failed')
    if (e instanceof InteractionRequiredAuthError) {
      if (isLoginPopup) {
        console.log('acquiring token using popup')
        const response = await auth.acquireTokenPopup(request)
        setAccount(response.account)
        return response.accessToken
      }
      console.log('acquiring token using redirect')
      auth.acquireTokenRedirect(request).catch(console.error)
    } else {
      console.error(e)
    }
  }
}

export const login = async () => {
  if (isLoginPopup) {
    return auth
      .loginPopup({
        redirectUri: ENVIRONMENT.auth.redirectUri,
        scopes: allScopes,
      })
      .then(handleResponse)
  }
  return auth.loginRedirect({
    redirectUri: ENVIRONMENT.auth.redirectUri,
    scopes: allScopes,
  })
}

export const logout = async () => {
  await auth.logout(account ? { account: account.value } : undefined)
  setAccount()
}

// export const attemptSsoSilent = async () => {
//   console.log('attemptSsoSilent')
//   const preferredUsername: string =
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     account.value.idTokenClaims?.preferred_username as string

//   if (!preferredUsername) await login()
//   else {
//     try {
//       console.log('attemptSsoSilent try')

//       await auth.ssoSilent({
//         loginHint: preferredUsername,
//       })
//       const account = getAccount()
//       setAccount(account)
//       console.log('attemptSsoSilent try done')
//     } catch (error) {
//       console.log('attemptSsoSilent catch error', error)
//       console.error('Silent Error: ', error)
//       if (error instanceof InteractionRequiredAuthError) {
//         await login()
//       }
//     }
//   }
// }
