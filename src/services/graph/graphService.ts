import * as Msal from '@azure/msal-browser'
import config from 'src/app-config.json'
import axios, { AxiosRequestConfig } from 'axios'
import {
  isLoginPopup,
  getTokenPopup,
  getTokenRedirect,
} from 'src/services/auth/authService'

const callGraph = (
  url: string,
  token: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const params: AxiosRequestConfig = {
    method: 'GET',
    url: url,
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios({ ...params, ...axiosConfig })
}

const getGraphDetails = async (
  uri: string,
  scopes: Msal.TokenExchangeParameters,
  axiosConfig?: AxiosRequestConfig
) => {
  try {
    let response = null
    if (isLoginPopup) {
      response = await getTokenPopup(scopes)
    } else {
      response = await getTokenRedirect(scopes)
    }
    if (response && response.accessToken) {
      return callGraph(uri, response.accessToken, axiosConfig)
    } else {
      throw new Error('We could not get a token because of page redirect')
    }
  } catch (error) {
    throw new Error(`We could not get a token: ${error}`)
  }
}

export const getGraphProfile = () => {
  return getGraphDetails(config.resources.msGraphProfile.resourceUri, {
    scopes: config.resources.msGraphProfile.resourceScope,
  })
}

export const getGraphPhoto = async () => {
  try {
    const response = await getGraphDetails(
      config.resources.msGraphPhoto.resourceUri,
      {
        scopes: config.resources.msGraphPhoto.resourceScope,
      },
      {
        responseType: 'arraybuffer',
      }
    )
    if (response && response.data) {
      const imageBase64 = new Buffer(response.data, 'binary').toString('base64')
      return `data:${response.headers['content-type']};base64, ${imageBase64}`
    }
  } catch (error) {
    throw new Error(`Failed retrieving the graph photo: ${error}`)
  }
}
