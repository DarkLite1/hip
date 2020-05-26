import { computed, ref, SetupContext } from '@vue/composition-api'
import { auth, allScopes, isLoginPopup } from 'src/services/auth/authService'

// needs to be available before components are loaded
const accountID = ref('')
const loading = ref(true)
const disabled = ref(true)

const setAccountID = () => {
  const account = auth.getAccount()

  if (account) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    accountID.value = account.idTokenClaims.oid!
  } else {
    accountID.value = ''
  }
}

setAccountID()

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

export const useAuth = (context?: SetupContext) => {
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
  }
}
