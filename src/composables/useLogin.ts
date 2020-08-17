import { computed, ref } from '@vue/composition-api'
import { login as loginAccount } from 'src/services/auth/authService'

const loading = ref(true)

export const stopLoading = () => {
  console.log('stopLoading')
  loading.value = false
}

export const useLogin = () => {
  const login = async () => {
    console.log('useLogin login called');
    
    loading.value = true
    try {
      await loginAccount()
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
