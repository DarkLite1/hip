import { computed, reactive, ref } from '@vue/composition-api'
import { AccountInfo } from '@azure/msal-browser'

const defaultState = () => ({
  account: {} as AccountInfo,
})

const state = reactive(defaultState())

export const setAccount = (account?: AccountInfo | null) => {
  if (account) state.account = account
  else state.account = defaultState().account
}

export const account = computed(() => state.account)

export const isAuthenticated = computed(() =>
  Boolean(state.account.homeAccountId)
)

export const loading = ref(true)
