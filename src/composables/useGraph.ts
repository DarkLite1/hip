import { reactive, computed } from '@vue/composition-api'
import {
  getGraphProfile,
  getGraphPhoto,
} from '../services/graph/graphService'

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

export const useGraph = () => {
  console.log('called useGraph')
  getGraphProfile()
    .then((response) => {
      graph.profile = { ...graphProfileDefault(), ...response.data }
    })
    .catch(console.log.bind(console))

  getGraphPhoto()
    .then((response) => {
      graph.photo = response
    })
    .catch(console.log.bind(console))

  return {
    profile: computed(() => graph.profile),
    photo: computed(() => graph.photo),
  }
}
