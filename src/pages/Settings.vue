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

        <q-item @click="reportProblemUrl" tag="label" v-ripple>
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
import { computed, defineComponent } from '@vue/composition-api'
import { openURL } from 'quasar'
import { useI18n } from 'vue-i18n-composable'
import { useApplicationPreferences } from 'src/composables/useApplicationPreferences'

export default defineComponent({
  setup() {
    const {
      darkMode: savedDarkMode,
      language: savedLanguage,
      setPreference,
    } = useApplicationPreferences()

    const darkMode = computed({
      get: () => savedDarkMode.value,
      set: async (value) => {
        await setPreference({ darkMode: value })
      },
    })

    const language = computed({
      get: () => savedLanguage.value,
      set: async (value) => {
        await setPreference({ language: value })
      },
    })

    const languageOptions = [
      { value: 'en-us', label: 'English' },
      { value: 'de-de', label: 'Deutsch' },
      { value: 'nl-be', label: 'Nederlands' },
      { value: 'fr-be', label: 'Français' },
    ]

    const reportProblemUrl = () => {
      openURL('https://github.com/DarkLite1/hip/issues')
    }
    const emailUs = () => {
      window.location.href =
        'mailto:BNL.ServicDesk@heidelbergcement.com?subject=HIP - HC IT Portal'
    }

    return {
      darkMode,
      language,
      languageOptions,
      reportProblemUrl,
      emailUs,
      ...useI18n(),
    }
  },
})
</script>

<style lang="scss" scoped>
.body--dark {
  .q-list {
    background: $grey-10;
  }
}
.body--light {
  .q-list {
    background: white;
    // color: white;
  }
}
</style>
