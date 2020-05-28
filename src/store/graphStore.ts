import { reactive, computed } from '@vue/composition-api'
import { getGraphProfile, getGraphPhoto } from 'src/services/graph/graphService'

const graphProfileDefault = () => {
  return {
    id: '',
    displayName: '',
    givenName: '',
    surName: '',
    jobTitle: '',
    mail: '',
    mobilePhone: '',
    businessPhones: '',
    officeLocation: '',
    preferredLanguage: '',
    userPrincipalName: '',
  }
}

const graph = reactive({
  profile: graphProfileDefault(),
  photo: '',
})

export const setGraphProfile = async () => {
  try {
    const response = await getGraphProfile()
    graph.profile = { ...graphProfileDefault(), ...response.data }
  } catch (error) {
    console.log(`Failed setting the graph profile ${error}`)
  }
}

export const setGraphPhoto = async () => {
  try {
    const response = await getGraphPhoto()
    graph.photo = response
  } catch (error) {
    console.log(`Failed setting the graph photo ${error}`)
  }
}

export const profile = computed(() => graph.profile)
export const photo = computed(() => graph.photo)
