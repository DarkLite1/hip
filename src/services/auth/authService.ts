import * as Msal from '@azure/msal-browser'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import { setAccount, account } from 'src/store/authStore'
import { stopLoading } from 'src/composables/useLogin'
import { ENVIRONMENT } from 'src/environment'

const MSALConfig: Msal.Configuration = {
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

export const auth = new Msal.PublicClientApplication(MSALConfig)

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

export const handleResponse = (resp: Msal.AuthenticationResult | null) => {
  console.log('handleResponse called')

  if (resp != null) {
    setAccount(resp.account)
  } else {
    const currentAccounts = auth.getAllAccounts()
    if (currentAccounts === null) {
      return
    } else if (currentAccounts.length > 1) {
      console.log('handleResponse currentAccounts > 1')
      // Add choose account code here
    } else if (currentAccounts.length === 1) {
      setAccount(currentAccounts[0])
    }
  }
}

auth
  .handleRedirectPromise()
  .then(handleResponse)
  .catch(console.error.bind(console))
  .finally(() => {
    stopLoading()
  })

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
