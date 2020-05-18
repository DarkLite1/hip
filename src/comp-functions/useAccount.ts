import { computed, ref } from '@vue/composition-api'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import { auth, getAllScopes } from 'src/services/auth/authService'

const isLoginPopup = Screen.lt.sm || isInternetExplorer ? false : true
const accountID = ref('')

export const setAccountID = () => {
  const account = auth.getAccount()

  if (account) {
    accountID.value = account.idTokenClaims.oid
  } else {
    accountID.value = ''
  }
}

export const useAccount = () => {
  const loading = ref(false)
  const disabled = ref(false)

  const login = async () => {
    loading.value = true
    disabled.value = true

    const allScopes = getAllScopes()

    if (isLoginPopup) {
      try {
        await auth.loginPopup(allScopes)
      } catch (error) {
        console.log('login with popup failed: ', error)
      } finally {
        setAccountID()
        disabled.value = false
        loading.value = false
        // if (this.$router.currentRoute.path === '/login') {
        //   this.$router.push('/')
        // }
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
