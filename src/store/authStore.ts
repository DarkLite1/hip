import { computed, reactive } from '@vue/composition-api'
import { AuthenticationResult } from '@azure/msal-browser'

const defaultState = () => {
  return {
    account: {
      homeAccountId: '',
      username: '',
    },
  }
}

const state = reactive(defaultState())

export const setAccount = (account?: AuthenticationResult['account']) => {
  console.log('response setAccount', account)
  if (account) state.account = account
  else state.account = defaultState().account
}

export const account = computed(() => state.account)
export const isAuthenticated = computed(() =>
  Boolean(state.account.homeAccountId)
)
