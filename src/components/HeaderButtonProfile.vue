<template>
  <div>
    <q-chip clickable @click="goToProfilePage" class="absolute-right">
      {{ profile.givenName || t('general.welcome') }}
      <q-avatar class="q-avatar--right">
        <q-img
          :src="photo"
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
import { useI18n } from 'vue-i18n-composable'
import { computed, defineComponent } from '@vue/composition-api'
import {
  setGraphProfile,
  setGraphPhoto,
  profile,
  photo,
} from 'src/store/graphStore'
import { Dark } from 'quasar'

export default defineComponent({
  setup(_, context) {
    void setGraphPhoto()
    void setGraphProfile()

    const goToProfilePage = () => {
      context.root.$router.push('/profile').catch(() => {
        null
      })
    }

    const placeholder = computed(() => {
      return Dark.isActive
        ? 'img/face_white_48dp.png'
        : 'img/face_black_48dp.png'
    })
    return {
      ...useI18n(),
      goToProfilePage,
      photo,
      profile,
      placeholder,
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
