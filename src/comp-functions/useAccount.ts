import { computed, ref } from '@vue/composition-api'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import { Screen } from 'quasar'
import { auth, getAllScopes } from 'src/services/auth/authService'

const isLoginPopup = Screen.lt.sm || isInternetExplorer ? false : true
const loggedOnAccount = ref('')

export const useAccount = () => {
  const loading = ref(false)
  const disabled = ref(false)

  auth.getAccount()

  const login = () => {
    console.log('log me in')
    loading.value = true
    disabled.value = true

    // const setLoggedOnAccount = (id: string) => {
    //   console.log('setLoggedOnAccount ', id)
    //   loggedOnAccount.value = id
    // }

    if (isLoginPopup) {
      console.log('pop login')
      try {
        // const scopes = getAllScopes()
        // console.log('scopes ', scopes)
        // const response = return await auth.loginPopup()
        // const response = await auth.loginPopup()

        // const loginRequest = {
        //   scopes: ['openid', 'profile', 'User.Read'],
        // }
        // const response = await auth.loginPopup(loginRequest)

        // auth.loginPopup(loginRequest).then(response => {
        //   console.log('we got response', response)
        // })
        // setLoggedOnAccount(response.idTokenClaims.oid)
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
      // triggers a page reload handled by src/boot/auth.js
      // auth.loginRedirect()
    }

    // const account = auth.getAccount()
    // console.log('msal account is ', account)
  }

  return {
    loggedOnAccount: computed(() => loggedOnAccount.value),
    isAuthenticated: computed(() => Boolean(loggedOnAccount.value)),
    loading: computed(() => loading.value),
    disabled: computed(() => disabled.value),
    login,
  }
}
