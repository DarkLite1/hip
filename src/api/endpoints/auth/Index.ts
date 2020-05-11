import * as config from 'src/app-config.json'

// checks if the app is running on IE
export const isIE =
  window.navigator.userAgent.includes('MSIE ') ||
  window.navigator.userAgent.includes('Trident/')

export const protectedResourceMap: [string, string[]][] = [
  [
    config.resources.gatewayApi.resourceUri,
    [config.resources.gatewayApi.resourceScope],
  ],
]

let msal = '2'

export default msal = msal
