// load msal first so it can handle the redirect to the page
// after a user has been authenticated with loginRedirect()

// a page refresh also sets the accountID and keeps the user on the page

import { boot } from 'quasar/wrappers'
import { setAccountID } from './../comp-functions/useAccount'

console.log('boot file loaded')

export default boot(() => {
  setAccountID()
})
