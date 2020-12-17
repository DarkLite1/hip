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
    publish('login', account)
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

export const getToken = async (scopes: string[]) => {
  const request = {
    scopes: scopes,
    account: account.value,
  }
  try {
    return await auth.acquireTokenSilent(request)
  } catch {
    if (isLoginPopup) {
      const res = await auth.acquireTokenPopup(request)
      setAccount(res.account)
      return res
    }
    return auth.acquireTokenRedirect(request)
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

export const logout = () => {
  const accountObj = auth.getAccountByUsername(account.value.username)
  void auth.logout(accountObj ? { account: accountObj } : undefined)
  // void auth.logout()
  setAccount()
}
