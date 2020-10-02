export const ENVIRONMENT = {
  mode:
    process.env.mode === 'production' || process.env.PROD === 'true'
      ? 'production'
      : 'development',
  auth: {
    clientId: process.env.AZURE_CLIENT_ID || '',
    authority: process.env.AZURE_IDENTITY_METADATA || '',
    redirectUri: process.env.AZURE_REDIRECT_URI || '',
    postLogoutRedirectUri: process.env.AZURE_POSTLOGOUT_REDIRECT_URI || '',
  },
  cache: {
    cacheLocation: process.env.BROWSER_CACHE_LOCATION || 'sessionStorage',
  },
  scopes: {
    loginRequest: ['openid', 'profile', 'user.read'],
  },
  resources: {
    gatewayApi: {
      uri: process.env.BACKEND_API_URI || '',
      scopes: [process.env.BACKEND_API_SCOPE || ''],
    },
    msGraphProfile: {
      uri: 'https://graph.microsoft.com/v1.0/me',
      scopes: ['openid', 'profile', 'user.read'],
    },
    msGraphPhoto: {
      uri: 'https://graph.microsoft.com/v1.0/me/photo/$value',
      scopes: ['openid', 'profile', 'user.read'],
    },
  },
}
