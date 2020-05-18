import { computed, ref } from '@vue/composition-api'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import { auth, getAllScopes } from 'src/services/auth/authService'

const isLoginPopup = Screen.lt.sm || isInternetExplorer ? false : true
const loggedOnAccount = ref('')

export const useAccount = () => {
  const loading = ref(false)
  const disabled = ref(false)

  const setLoggedOnAccount = (id: string) => {
    console.log('setLoggedOnAccount ', id)
    loggedOnAccount.value = id
  }

  const login = async () => {
    loading.value = true
    disabled.value = true

    if (isLoginPopup) {
      try {
        const response = await auth.loginPopup(getAllScopes())
        setLoggedOnAccount(response.idTokenClaims.oid)
        // console.log('response ', response)
      } catch (error) {
        console.log('login with popup failed: ', error)
        // setLoggedOnAccount('')
      } finally {
        disabled.value = false
        loading.value = false
        // if (this.$router.currentRoute.path === '/login') {
        //   this.$router.push('/')
        // }
      }
    } else {
      auth.loginRedirect() // page reload
    }
  }

  const logout = () => {
    auth.logout()
  }

  return {
    loggedOnAccount: computed(() => loggedOnAccount.value),
    isAuthenticated: computed(() => Boolean(loggedOnAccount.value)),
    loading: computed(() => loading.value),
    disabled: computed(() => disabled.value),
    login,
    logout,
  }
}
