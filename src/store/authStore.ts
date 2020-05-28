import { computed, reactive } from '@vue/composition-api'
import { auth, allScopes, isLoginPopup } from 'src/services/auth/authService'

const defaultState = () => {
  return {
    accountId: '',
  }
}

const state = reactive(defaultState())

export const setAccountId = () => {
  console.log('setAccountId called')
  const account = auth.getAccount()

  if (account) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    state.accountId = account.idTokenClaims.oid!
  } else {
    state.accountId = ''
  }
  console.log('setAccountId ', state.accountId)
}

// export const useAuth = (context?: SetupContext) => {
//   const login = async () => {
//     loading.value = true

//     if (isLoginPopup) {
//       try {
//         await auth.loginPopup(allScopes)

//         if (context?.root.$router.currentRoute.path === '/login') {
//           context?.root.$router.push('/')
//         }
//       } catch (error) {
//         console.log('login with popup failed: ', error)
//       } finally {
//         setAccountId()
//         loading.value = false
//       }
//     } else {
//       auth.loginRedirect(allScopes) // page reload
//     }
//   }

//   return {
//     loading: computed(() => loading.value),
//     disabled: computed(() => loading.value),
//     login,
//   }
// }

export const logout = () => {
  state.accountId = defaultState().accountId
  auth.logout()
}

export const accountId = computed(() => state.accountId)

export const isAuthenticated = computed(() => Boolean(state.accountId))
