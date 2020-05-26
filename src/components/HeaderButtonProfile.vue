<template>
  <div>
    <q-chip clickable @click="goToProfilePage" class="absolute-right">
      {{ user.profile.givenName || 'Welcome' }}
      <q-avatar class="q-avatar--right">
        <q-img
          :src="user.photo"
          spinner-color="black"
          width="38px"
          transition="scale"
          ratio="1"
          placeholder-src="statics/img/account.png"
        />
      </q-avatar>
    </q-chip>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import { getGraphProfile } from 'src/services/graph/graphService'

export default defineComponent({
  setup(props, context) {
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
      photo: null,
    })

    onMounted(() => {
      console.log('call onMounted getGraphProfile')
      getGraphProfile()
        .then((response) => {
          console.log('onMounted getGraphProfile success')
          console.log('response.data  ', response.data)
          graph.profile = { ...graphProfileDefault(), ...response.data }
        })
        .catch((error) => {
          console.log('onMounted getGraphProfile fail')
          console.log('error in component', error)
        })
      // .catch(console.log.bind(console))
    })

    const goToProfilePage = () => {
      context.root.$router.push('/profile').catch(() => {
        null
      })
    }
    return {
      goToProfilePage,
      user: graph,
    }
  },
})
</script>

<style lang="sass" scoped>
.q-chip
  margin: auto .8em auto auto
  border-radius: 16px

  .q-avatar
    border-radius: 18px
    ~ .q-avatar,
    &--right
      margin-left: 0.2em
      margin-right: -0.45em
</style>
