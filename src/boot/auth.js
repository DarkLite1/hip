import { boot } from 'quasar/wrappers'
import { setAccountID } from '../comp-functions/useAuth'

export default boot(() => {
  // page refresh sets the accountID and keeps the user on the page
  setAccountID()
})
