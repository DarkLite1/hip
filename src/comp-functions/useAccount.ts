import { computed, ref } from '@vue/composition-api'
import { auth } from 'src/services/auth/authService'

const accountId = ref('')

export const useAccount = () => {
  console.log('imported useAccount')

  const loading = ref(false)
  const disabled = ref(false)

  const setLoggedOnAccount = (id: string) => {
    console.log('setAccount ', id)
    accountId.value = id
  }

  const login = () => {
    console.log('log me in')
    loading.value = true
    disabled.value = true

    

    if (auth.loginMethod === 'popup') {
      auth
        .loginPopup()
        .catch(console.log.bind(console))
        .finally(() => {
          
          const test = auth.getAccount()
          const account = test.idTokenClaims.oid

          if (account) {
            setLoggedOnAccount(account)
            disabled.value = true
            // if (this.$router.currentRoute.path === '/login') {
            //   this.$router.push('/')
            // }
          } else {
            disabled.value = false
          }
          loading.value = false
        })
    } else {
      // triggers a page reload handled by src/boot/auth.js
      auth.loginRedirect()
    }

    const account = auth.getAccount()
    console.log('msal account is ', account)
  }

  return {
    accountId: computed(() => accountId.value),
    isAuthenticated: computed(() => Boolean(accountId.value)),
    loading: computed(() => loading.value),
    disabled: computed(() => disabled.value),
    login
  }
}
