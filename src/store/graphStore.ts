import { reactive, computed } from 'vue'
import { getGraphProfile, getGraphPhoto } from 'src/services/graph/graphService'
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types'

const defaultState = () => {
  return {
    profile: {
      id: '',
      displayName: '',
      givenName: '',
      surName: '',
      jobTitle: '',
      mail: '',
      mobilePhone: '',
      officeLocation: '',
      businessPhones: [''],
      preferredLanguage: '',
      userPrincipalName: '',
    },
    photo: '',
  } as { profile: MicrosoftGraph.User; photo: string }
}

const state = reactive(defaultState())

export const setGraphProfile = async () => {
  try {
    const response = await getGraphProfile()
    state.profile = { ...defaultState().profile, ...response.data }
  } catch (error) {
    console.log(`Failed setting the graph profile ${error}`)
  }
}

export const setGraphPhoto = async () => {
  try {
    const response = await getGraphPhoto()
    state.photo = response
  } catch (error) {
    console.log(`Failed setting the graph photo ${error}`)
  }
}

export const profile = computed(() => state.profile)
export const photo = computed(() => state.photo)
