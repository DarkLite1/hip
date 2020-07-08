<template>
  <div>
    <q-chip clickable @click="goToProfilePage" class="absolute-right">
      {{ profile.givenName || $t('general.welcome') }}
      <q-avatar class="q-avatar--right">
        <q-img
          :src="photo"
          spinner-color="black"
          width="38px"
          transition="scale"
          ratio="1"
          placeholder-src="img/account.png"
        />
      </q-avatar>
    </q-chip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {
  setGraphProfile,
  setGraphPhoto,
  profile,
  photo,
} from 'src/store/graphStore'

export default defineComponent({
  setup(_, context) {
    // setGraphPhoto()
    // setGraphProfile()

    const goToProfilePage = () => {
      context.root.$router.push('/profile').catch(() => {
        null
      })
    }
    return {
      goToProfilePage,
      photo,
      profile,
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
