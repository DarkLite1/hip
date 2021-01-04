import { computed, reactive } from '@vue/composition-api'
import { AccountInfo } from '@azure/msal-browser'

const defaultState = () => {
  return {
    account: {
      homeAccountId: '',
      username: '',
      environment: '',
      tenantId: '',
    } as AccountInfo,
  }
}

const state = reactive(defaultState())

export const setAccount = (account?: AccountInfo) => {
  if (account) state.account = account
  else state.account = defaultState().account
}

export const account = computed(() => state.account)
export const isAuthenticated = computed(() =>
  Boolean(state.account.homeAccountId)
)
