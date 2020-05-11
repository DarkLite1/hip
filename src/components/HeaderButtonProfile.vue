<template>
  <div>
    <q-btn class="absolute-right">jup</q-btn>
    <!-- <q-chip clickable @click="goToProfilePage" class="absolute-right">
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
    </q-chip> -->
  </div>
</template>

<script>
// import { mapActions } from "vuex"
// import { getGraphProfile, getGraphPhoto } from 'src/services/graph/graphService'

export default {
  // data() {
  //   return {
  //     placeholder: "statics/img/account.png",
  //     user: {
  //       firstName: 'Welcome',
  //       photo: null,
  //     },
  //   }
  // },
  // methods: {
  //   ...mapActions('auth', ['setGraphProfile', 'setGraphPhoto']),
  //   goToProfilePage() {
  //     this.$router.push('/profile').catch((err) => { })
  //   },
  // },
  // created() {
  //   getGraphProfile()
  //     .then(response => {
  //       this.user.firstName = response.data.givenName
  //       this.setGraphProfile(response.data)
  //     })
  //     .catch(console.log.bind(console))

  //   getGraphPhoto()
  //     .then(image => {
  //       this.user.photo = image
  //       this.setGraphPhoto(image)
  //     })
  //     .catch(console.log.bind(console))
  // }
};
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