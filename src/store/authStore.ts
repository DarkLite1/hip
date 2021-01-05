import { computed, reactive } from '@vue/composition-api'
import { AccountInfo } from '@azure/msal-browser'

const defaultState = () => {
  return {
    account: {} as AccountInfo,
  }
}

const state = reactive(defaultState())

export const setAccount = (account?: AccountInfo | null) => {
  // console.log('setAccount: ', account)
  if (account) state.account = account
  else state.account = defaultState().account
}

export const account = computed(() => state.account)
export const isAuthenticated = computed(() =>
  Boolean(state.account.homeAccountId)
)
