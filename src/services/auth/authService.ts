import { Screen } from 'quasar'
import { isInternetExplorer } from 'src/services/utils/utilsService'
import * as authPopup from 'src/services/auth/authPopup'
import * as authRedirect from 'src/services/auth/authRedirect'


const loginMethod = Screen.lt.sm || isInternetExplorer ? 'redirect' : 'popup'

console.log('loginMethod ', loginMethod)

export const auth = (loginMethod === 'popup')
  ? { loginMethod, ...authPopup }
  : { loginMethod, ...authRedirect }
