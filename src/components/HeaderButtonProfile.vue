<template>
  <div>
    <q-chip clickable @click="goToProfilePage" class="absolute-right">
      {{ user.firstName }}
      <q-avatar class="q-avatar--right">
        <q-img
          :src="user.photo"
          spinner-color="black"
          width="38px"
          transition="scale"
          ratio="1"
          :placeholder-src="placeholder"
        />
      </q-avatar>
    </q-chip>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from '@vue/composition-api'
import { useAuth } from '../../src/comp-functions/useAuth'

const { isAuthenticated } = useAuth()

export default defineComponent({
  setup(props, context) {
    const placeholder = 'statics/img/account.png'

    const user = reactive({
      photo: null,
      firstName: 'Welcome',
    })

    const goToProfilePage = () => {
      context.root.$router.push('/profile').catch(() => {
        null
      })
    }

    return {
      goToProfilePage,
      user,
      placeholder,
    }
    // onBeforeMount(() => {
    //   if (isAuthenticated.value) {
    //     console.log('from ', context.root.$router)
    //     context.root.$router.push('/')
    //   }
    // })
  },
})
// import { mapActions } from "vuex"
// import { getGraphProfile, getGraphPhoto } from 'src/services/graph/graphService'

// export default {
//   data() {
//     return {
//       placeholder: 'statics/img/account.png',
//       user: {
//         firstName: 'Welcome',
//         photo: null,
//       },
//     }
//   },
//   methods: {
// ...mapActions('auth', ['setGraphProfile', 'setGraphPhoto']),
//   goToProfilePage() {
//     this.$router.push('/profile').catch(() => {null})
//   },
// },
// created() {
//   getGraphProfile()
//     .then((response) => {
//       this.user.firstName = response.data.givenName
//       this.setGraphProfile(response.data)
//     })
//     .catch(console.log.bind(console))

//   getGraphPhoto()
//     .then((image) => {
//       this.user.photo = image
//       this.setGraphPhoto(image)
//     })
//     .catch(console.log.bind(console))
// },
// }
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
