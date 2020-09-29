import { computed, reactive } from '@vue/composition-api'
import { AuthenticationResult } from '@azure/msal-browser'

const defaultState = () => {
  return {
    account: {
      homeAccountId: '',
      username: '',
      environment: '',
      tenantId: '',
    } as AuthenticationResult['account'],
  }
}

const state = reactive(defaultState())

export const setAccount = (account?: AuthenticationResult['account']) => {
  if (account) state.account = account
  else state.account = defaultState().account
  console.log('setAccount: ', state.account)
}

// subscribe({
//   eventName: 'login',
//   callback: (account: AccountInfo) => {
//     setAccount(account)
//   },
// })

export const account = computed(() => state.account)
export const isAuthenticated = computed(() =>
  Boolean(state.account.homeAccountId)
)
