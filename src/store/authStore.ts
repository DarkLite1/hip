import { computed, reactive } from '@vue/composition-api'
import { auth } from 'src/services/auth/authService'

const defaultState = () => {
  return {
    account: {
      homeAccountId: '',
      tenantId: '',
      username: '',
    },
  }
}

const state = reactive(defaultState())

export const setAccountId = (response?) => {
  console.log('response setAccountId', response)
  if (response && response.account) {
    console.log('setAccountId from response')
    state.account = response.account
  } else {
    console.log('setAccountId getAllAccounts')
    const currentAccounts = auth.getAllAccounts()
    console.log('setAccountId getAllAccounts ', currentAccounts)
    if (currentAccounts === null) {
      state.account = defaultState().account
    } else if (currentAccounts.length > 1) {
      // Add choose account code here
    } else if (currentAccounts.length === 1) {
      state.account = currentAccounts[0]
    }
  }
}

export const logout = () => {
  state.account = defaultState().account
  auth.logout()
}

export const account = computed(() => state.account)
export const isAuthenticated = computed(() =>
  Boolean(state.account.homeAccountId)
)
