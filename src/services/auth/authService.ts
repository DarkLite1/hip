import * as Msal from '@azure/msal-browser'
import config from 'src/app-config.json'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import { setAccount, account } from 'src/store/authStore'
import { stopLoading } from 'src/composables/useLogin'

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

export const handleResponse = (resp: Msal.AuthenticationResult | null) => {
  console.log('handleResponse ', resp)

  if (resp != null) {
    console.log('handleResponse call setAccount with resp.account')
    setAccount(resp.account)
  } else {
    const currentAccounts = auth.getAllAccounts()
    console.log('handleResponse getAllAccounts ', currentAccounts)
    if (currentAccounts === null) {
      console.log('handleResponse currentAccounts null')
      return
    } else if (currentAccounts.length > 1) {
      console.log('handleResponse currentAccounts > 1')
      // Add choose account code here
    } else if (currentAccounts.length === 1) {
      console.log('call setAccount with currentAccounts[0]')
      setAccount(currentAccounts[0])
    }
  }
}

auth
  .handleRedirectPromise()
  .then(handleResponse)
  .then(() => {
    stopLoading()
  })
  .catch((err) => {
    console.error(err)
  })

export const getToken = async (request) => {
  try {
    console.log('getToken acquireTokenSilent')
    return await auth.acquireTokenSilent(request)
    console.log('getToken acquireTokenSilent ok')
  } catch {
    console.log('getToken acquireTokenSilent failed')
    if (isLoginPopup) {
      console.log('getToken acquireTokenPopup')
      return await auth.acquireTokenPopup(request)
    }
    console.log('getToken acquireTokenRedirect')
    return auth.acquireTokenRedirect(request)
  }
}

export const login = async () => {
  if (isLoginPopup) {
    console.log('isLoginPopup')

    return auth
      .loginPopup({
        redirectUri: config.auth.redirectUri,
        scopes: allScopes,
      })
      .then(handleResponse)
  }
  console.log('not LoginPopup')
  return auth.loginRedirect({
    redirectUri: config.auth.redirectUri,
    scopes: allScopes,
  })
}

export const logout = () => {
  const logoutRequest = {
    account: auth.getAccountByUsername(account.value.username),
  }
  auth.logout(logoutRequest)
  setAccount()
}
