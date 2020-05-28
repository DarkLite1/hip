import * as Msal from '@azure/msal-browser'
import config from 'src/app-config.json'
import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from 'src/services/auth/authService'

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
    const response = await getToken(scopes)
    if (response && response.accessToken) {
      return callGraph(uri, response.accessToken, axiosConfig)
    } else {
      throw new Error('We could not get a token because of page redirect')
    }
  } catch (error) {
    throw new Error(`We could not get a token: ${error}`)
  }
}

export const getGraphProfile = async () => {
  try {
    return await getGraphDetails(config.resources.msGraphProfile.uri, {
      scopes: config.resources.msGraphProfile.scopes,
    })
  } catch (error) {
    throw new Error(`Failed retrieving the graph profile: ${error}`)
  }
}

export const getGraphPhoto = async () => {
  try {
    const response = await getGraphDetails(
      config.resources.msGraphPhoto.uri,
      {
        scopes: config.resources.msGraphPhoto.scopes,
      },
      {
        responseType: 'arraybuffer',
      }
    )
    if (!(response && response.data)) {
      return ''
    }
    const imageBase64 = new Buffer(response.data, 'binary').toString('base64')
    return `data:${response.headers['content-type']};base64, ${imageBase64}`
  } catch (error) {
    throw new Error(`Failed retrieving the graph photo: ${error}`)
  }
}
