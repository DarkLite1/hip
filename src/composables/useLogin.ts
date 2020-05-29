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

export const useLogin = (context: SetupContext) => {
  const login = async () => {
    loading.value = true

    try {
      await loginAccount()

      if (context.root.$router.currentRoute.path === '/login') {
        context.root.$router.push('/')
      }
    } catch (error) {
      console.log('login with popup failed: ', error)
    } finally {
      setAccountId()
      loading.value = false
    }
  }

  return {
    loading: computed(() => loading.value),
    disabled: computed(() => loading.value),
    login,
  }
}
