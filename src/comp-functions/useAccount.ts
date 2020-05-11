import { computed, ref } from '@vue/composition-api'
import  msal  from 'src//api/endpoints/auth'


const accountId = ref('')

export const useAccount = () => {
    console.log('imported useAccount')
    // super complicated account logic

    const loading = ref(false)


    const setAccount = (id: string) => {
        console.log('run setAccount')
        console.log('setAccount ', id)
        accountId.value = id
    }

    const login = () => {
        console.log('log me in')
        loading.value = true

        console.log('msal is ',msal)
    }

    return {
        accountId: computed(() => accountId.value),
        isAuthenticated: computed(() => Boolean(accountId.value)),
        disabled: computed(() => loading.value),
        loading,
        login,
        setAccount
    }
}