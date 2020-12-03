<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-list class="q-mb-md" bordered padding>
        <q-item-label header>{{ t('page.settings.name') }}</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ t('page.settings.darkMode') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="darkMode" color="blue" />
          </q-item-section>
        </q-item>

        <q-item tag="label">
          <q-item-section>
            <q-item-label>{{ t('page.settings.language') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-select
              rounded
              outlined
              dense
              v-model="language"
              :options="languageOptions"
              emit-value
              map-options
              options-dense
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-list bordered padding>
        <q-item-label header>More</q-item-label>

        <q-item to="/settings/help" tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ t('page.settings.help') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>

        <q-item @click="selfHelp" tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ t('page.settings.reportProblem') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>

        <q-item @click="emailUs" tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ t('page.settings.emailUs') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable'
import { defineComponent, ref, watch, watchEffect } from '@vue/composition-api'
import { openURL } from 'quasar'
import {
  useSetDarkModeMutation,
  useSetLanguageMutation,
  useViewerQuery,
} from 'src/graphql/generated/operations'
import { useI18n } from 'vue-i18n-composable'

export default defineComponent({
  setup() {
    const { locale } = useI18n()
    const { result } = useViewerQuery()
    const preference = useResult(result, null, (data) => data.viewer.preference)

    watchEffect(() => {
      console.log('Settings preference: ', preference.value)
    })

    const darkMode = ref(true)

    const languageOptions = [
      { value: 'en-us', label: 'English' },
      { value: 'de-de', label: 'Deutsch' },
      { value: 'nl-be', label: 'Nederlands' },
      { value: 'fr-be', label: 'Français' },
    ]
    const language = locale
    // const language = ref(context.root.$i18n.locale)

    const selfHelp = () => {
      openURL(
        'http://unite.grouphc.net/benelux/staffdepartments/it_bene/selfhelp/Pages/BNL_SelfHelp.aspx'
      )
    }
    const emailUs = () => {
      window.location.href =
        'mailto:BNL.ServicDesk@heidelbergcement.com?subject=HIP - HC IT Portal'
    }

    const { mutate: setLanguage } = useSetLanguageMutation(() => ({
      variables: {
        language: language.value,
      },
    }))

    const { mutate: setDarkMode } = useSetDarkModeMutation(() => ({
      variables: {
        darkMode: darkMode.value,
      },
    }))

    watch(language, (newLanguage) => {
      locale.value = newLanguage
      void setLanguage()
    })
    watch(darkMode, (newDarkMode) => {
      console.log('darkMode: ', newDarkMode)
      void setDarkMode()
    })

    return {
      darkMode,
      language,
      languageOptions,
      selfHelp,
      emailUs,
      ...useI18n(),
    }
  },
})
</script>
