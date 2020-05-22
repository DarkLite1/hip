import { boot } from 'quasar/wrappers'
import { setAccountID } from './../comp-functions/useAccount'

export default boot(() => {
  // page refresh sets the accountID and keeps the user on the page
  setAccountID()
})
