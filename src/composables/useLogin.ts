import { computed, ref, SetupContext } from '@vue/composition-api'
import { auth, login as loginAccount } from 'src/services/auth/authService'
import { setAccountId } from 'src/store/authStore'

const loading = ref(true)

auth
  .handleRedirectPromise() // only called when not authenticated by msal
  .catch((error) => {
    console.log('login with redirect failed: ', error)
  })
  .finally(() => {
    setAccountId()
    loading.value = false
  })

export const useLogin = (router: SetupContext['root']['$router']) => {
  const login = async () => {
    loading.value = true
    try {
      const response = await loginAccount()
      console.log('response loginAccount', response)
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
      setAccountId(response)
    } catch (error) {
      console.log('login with popup failed: ', error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading: computed(() => loading.value),
    disabled: computed(() => loading.value),
    login,
  }
}
