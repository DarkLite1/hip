import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from 'src/services/auth/authService'
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types'
import { ENVIRONMENT } from 'src/environment'

const callGraph = <T>(
  url: string,
  token: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const params: AxiosRequestConfig = {
    method: 'GET',
    url: url,
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios.request<T>({ ...params, ...axiosConfig })
}

const getGraphDetails = async <T>(
  uri: string,
  scopes: string[],
  axiosConfig?: AxiosRequestConfig
) => {
  try {
    const response = await getToken(scopes)
    if (response && response.accessToken) {
      return callGraph<T>(uri, response.accessToken, axiosConfig)
    } else {
      throw new Error('We could not get a token because of page redirect')
    }
  } catch (error) {
    throw new Error(`We could not get a token: ${error}`)
  }
}

export const getGraphProfile = async () => {
  try {
    return await getGraphDetails<MicrosoftGraph.User>(
      ENVIRONMENT.resources.msGraphProfile.uri,
      ENVIRONMENT.resources.msGraphProfile.scopes
    )
  } catch (error) {
    throw new Error(`Failed retrieving the graph profile: ${error}`)
  }
}

export const getGraphPhoto = async () => {
  try {
    const response = await getGraphDetails<string>(
      ENVIRONMENT.resources.msGraphPhoto.uri,
      ENVIRONMENT.resources.msGraphPhoto.scopes,
      { responseType: 'arraybuffer' }
    )
    if (!(response && response.data)) {
      return ''
    }
    const imageBase64 = new Buffer(response.data, 'binary').toString('base64')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return `data:${response.headers['content-type']};base64, ${imageBase64}`
  } catch (error) {
    throw new Error(`Failed retrieving the graph photo: ${error}`)
  }
}
