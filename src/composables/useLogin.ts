import { computed, ref, SetupContext } from '@vue/composition-api'
import { login as loginAccount } from 'src/services/auth/authService'

const loading = ref(true)

export const stopLoading = () => {
  console.log('stopLoading')
  loading.value = false
}

export const useLogin = (router: SetupContext['root']['$router']) => {
  const login = async () => {
    loading.value = true
    try {
      console.log('call loginAccount')

      await loginAccount()

      if (router.currentRoute.path === '/login') {
        console.log('useLogin push to /');
        router.push('/')
      }
      setAccountId(response)
    } catch (error) {
      console.log('login with popup failed: ', error)
    } finally {
      console.log('useLogin stop loading')
      loading.value = false
    }
  }

  return {
    loading: computed(() => loading.value),
    disabled: computed(() => loading.value),
    login,
  }
}
