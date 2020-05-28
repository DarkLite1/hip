import { computed, reactive } from '@vue/composition-api'
import { auth } from 'src/services/auth/authService'

const defaultState = () => {
  return {
    accountId: '',
  }
}

const state = reactive(defaultState())

export const setAccountId = () => {
  const account = auth.getAccount()

  if (account) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    state.accountId = account.idTokenClaims.oid!
  } else {
    state.accountId = defaultState().accountId
  }
}

export const logout = () => {
  state.accountId = defaultState().accountId
  auth.logout()
}

export const accountId = computed(() => state.accountId)
export const isAuthenticated = computed(() => Boolean(state.accountId))
