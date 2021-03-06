/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require('quasar/wrappers')
const webpack = require('webpack')

module.exports = configure(function (ctx) {
  return {
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: true,
          files: './src/**/*.{ts,tsx,js,jsx,vue}',
        },
      },
    },
    // order is important
    boot: ['i18n', 'auth', 'apollo', 'router'],

    css: ['app.scss'],

    extras: [
      // 'ionicons-v4',
      'mdi-v5',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-US', // Quasar language pack
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      // importStrategy: 'auto',

      // Quasar plugins
      plugins: ['Notify'],
      // config: {
      //   notify: {
      //     /* look at QUASARCONFOPTIONS from the API card (bottom of page) */
      //   },
      // },
    },

    // https://quasar.dev/quasar-cli/cli-documentation/prefetch-feature
    // preFetch: true

    build: {
      // add environment variables
      env: process.env,

      // transpileDependencies: [
      //   '@vue/composition-api',
      //   '@vue/apollo-composable',
      //   '@azure/msal-browser',
      //   'graphql',
      //   'graphql-tag',
      //   'apollo-cache-inmemory',
      //   'apollo-client',
      //   'apollo-link',
      //   'apollo-link-context',
      //   'apollo-link-error',
      //   'apollo-link-http',
      // ],

      vueRouterMode: 'hash', // available values: 'hash', 'history'

      // rtl: false, // https://quasar.dev/options/rtl-support
      showProgress: true,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      extendWebpack(cfg) {
        cfg.plugins.push(
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          })
        )
      },
      //   plugins: [

      //     // cfg.ProvidePlugin({
      //     //   Buffer: ['buffer', 'Buffer'],
      //     // }),
      //   ]
      // },
    },

    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
    },

    // https://quasar.dev/options/animations
    // animations: 'all', // includes all animations
    animations: [], // none
    // animations: ['flipInX', 'flipOutX'],

    ssr: {
      pwa: false,
    },

    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      chainWebpackCustomSW(/* chain */) {
        //
      },
      manifest: {
        name: 'HC IT Portal',
        short_name: 'HIP',
        description: 'Web portal for launching IT applications',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'org.cordova.quasar.app',
    },

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'mya-pp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'hip',
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  }
})
