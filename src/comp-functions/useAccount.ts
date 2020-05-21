import { computed, ref, SetupContext } from '@vue/composition-api'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import { auth, getAllScopes } from 'src/services/auth/authService'

const isLoginPopup = Screen.lt.sm || isInternetExplorer ? false : true
const accountID = ref('')

export const setAccountID = () => {
  const account = auth.getAccount()

  if (account) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    accountID.value = account.idTokenClaims.oid!
  } else {
    accountID.value = ''
  }
}

export const useAccount = (context?: SetupContext) => {
  const loading = ref(false)
  const disabled = ref(false)

  const login = async () => {
    loading.value = true
    disabled.value = true

    const allScopes = getAllScopes()

    if (isLoginPopup) {
      try {
        await auth.loginPopup(allScopes)

        if (context?.root.$router.currentRoute.path === '/login') {
          context?.root.$router.push('/')
        }
      } catch (error) {
        console.log('login with popup failed: ', error)
      } finally {
        setAccountID()
        disabled.value = false
        loading.value = false
      }
    } else {
      auth.loginRedirect(allScopes) // page reload
    }
  }

  const logout = () => {
    auth.logout()
  }

  return {
    accountID: computed(() => accountID.value),
    isAuthenticated: computed(() => Boolean(accountID.value)),
    loading: computed(() => loading.value),
    disabled: computed(() => disabled.value),
    login,
    logout,
  }
}
