import { computed, ref, SetupContext } from '@vue/composition-api'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import { auth, allScopes } from 'src/services/auth/authService'

console.log('import useAuth')

// needs to be available before the component HeaderButtonLogin is loaded
const isLoginPopup = Screen.lt.sm || isInternetExplorer ? false : true
const accountID = ref('')

const setAccountID = () => {
  const account = auth.getAccount()

  if (account) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    accountID.value = account.idTokenClaims.oid!
    console.log('accountID ', accountID.value)
  } else {
    accountID.value = ''
    console.log('accountID ', null)
  }
}

setAccountID()

export const useAccount = (context?: SetupContext) => {
  const loading = ref(true)
  const disabled = ref(true)

  auth
  .handleRedirectPromise()
  .catch((error) => {
    console.log('login with redirect failed: ', error)
  })
  .finally(() => {
    setAccountID()
    disabled.value = false
    loading.value = false
  })


  const login = async () => {
    loading.value = true
    disabled.value = true

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
    setAccountID,
  }
}
